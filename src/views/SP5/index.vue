<template>
  <div class="orientation-display">
    <h2>📱 裝置方向資訊</h2>
    <p><strong>事件來源:</strong> {{ source }}</p>
    <p><strong>Alpha（旋轉角度）:</strong> {{ alpha !== null ? alpha.toFixed(1) + '°' : '尚未取得' }}</p>
    <p><strong>是否絕對方位:</strong> {{ isAbsolute ? '✅ 是' : '❌ 否' }}</p>
    <p><strong>目前方位:</strong> {{ direction }}</p>
    <p v-if="!triggered">⏳ 等待方向事件觸發中...</p>
    <p><strong>方向感測器授權狀態:</strong> {{ permissionStatus }}</p>
    <button v-if="needsPermission" @click="requestPermission">🔓 啟用方向感測器（iOS）</button>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'OrientationDisplay',
  setup() {
    const alpha = ref(null);
    const isAbsolute = ref(false);
    const triggered = ref(false);
    const source = ref('尚未觸發');
    const needsPermission = ref(false);
    const permissionStatus = ref('尚未授權');

    const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const handleAbsolute = (event) => {
      triggered.value = true;
      source.value = 'deviceorientationabsolute';
      alpha.value = event.alpha;
      isAbsolute.value = event.absolute;
    };

    const handleFallback = (event) => {
      triggered.value = true;
      source.value = 'deviceorientation';
      alpha.value = event.alpha;
      isAbsolute.value = event.absolute;
    };

    const requestPermission = async () => {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          permissionStatus.value = '✅ 已授權';
          window.addEventListener('deviceorientationabsolute', handleAbsolute);
          needsPermission.value = false;
        } else {
          permissionStatus.value = '❌ 已拒絕';
        }
      } catch (err) {
        console.error('方向感測器權限請求失敗:', err);
        permissionStatus.value = '⚠️ 請求失敗';
      }
    };

    const correctedAlpha = computed(() => {
      if (alpha.value === null) return null;
      return (360 - alpha.value) % 360;
    });

    const direction = computed(() => {
      const angle = correctedAlpha.value;
      if (angle === null) return '未知';

      if (angle >= 337.5 || angle < 22.5) return '北';
      if (angle >= 22.5 && angle < 67.5) return '東北';
      if (angle >= 67.5 && angle < 112.5) return '東';
      if (angle >= 112.5 && angle < 157.5) return '東南';
      if (angle >= 157.5 && angle < 202.5) return '南';
      if (angle >= 202.5 && angle < 247.5) return '西南';
      if (angle >= 247.5 && angle < 292.5) return '西';
      if (angle >= 292.5 && angle < 337.5) return '西北';
      return '未知';
    });

    onMounted(() => {
      if (typeof DeviceOrientationEvent?.requestPermission === 'function' && isIOS()) {
        needsPermission.value = true;
        permissionStatus.value = '📱 等待使用者授權';
      } else {
        window.addEventListener('deviceorientationabsolute', handleAbsolute);

        setTimeout(() => {
          if (!triggered.value) {
            console.warn('⚠️ deviceorientationabsolute 未觸發，啟用 fallback');
            window.removeEventListener('deviceorientationabsolute', handleAbsolute);
            window.addEventListener('deviceorientation', handleFallback);
          }
        }, 2000);
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener('deviceorientationabsolute', handleAbsolute);
      window.removeEventListener('deviceorientation', handleFallback);
    });

    return {
      alpha,
      isAbsolute,
      triggered,
      source,
      direction,
      needsPermission,
      requestPermission,
      permissionStatus
    };
  }
};
</script>

<style scoped>
.orientation-display {
  font-family: sans-serif;
  padding: 1rem;
  background: #f0f4ff;
  border-radius: 8px;
  max-width: 320px;
  line-height: 1.6;
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
