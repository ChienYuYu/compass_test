<template>
  <div class="orientation-display">
    <h2>📱 裝置方向資訊</h2><br>
    <p><strong>事件來源:</strong> {{ source }}</p><br></br>
    <p><strong>Alpha（旋轉角度）:</strong> {{ alpha.toFixed(1) ?? '尚未取得' }}</p><br></br>
    <p><strong>是否絕對方位:</strong> {{ isAbsolute ? '✅ 是' : '❌ 否' }}</p><br></br>
    <p v-if="!triggered">⏳ 等待方向事件觸發中...</p>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'OrientationDisplay',
  setup() {
    const alpha = ref(null);
    const isAbsolute = ref(false);
    const triggered = ref(false);
    const source = ref('尚未觸發');

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

    const requestPermissionIfNeeded = async () => {
      if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleFallback);
          } else {
            console.warn('使用者未授權方向感測器');
          }
        } catch (err) {
          console.error('方向感測器權限請求失敗:', err);
        }
      } else {
        // 非 iOS Safari，直接監聽
        window.addEventListener('deviceorientation', handleFallback);
      }
    };

    onMounted(() => {
      window.addEventListener('deviceorientationabsolute', handleAbsolute);

      // 若 2 秒內未觸發，啟用 fallback
      setTimeout(() => {
        if (!triggered.value) {
          console.warn('⚠️ deviceorientationabsolute 未觸發，啟用 fallback');
          window.removeEventListener('deviceorientationabsolute', handleAbsolute);
          requestPermissionIfNeeded();
        }
      }, 2000);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('deviceorientationabsolute', handleAbsolute);
      window.removeEventListener('deviceorientation', handleFallback);
    });

    return {
      alpha,
      isAbsolute,
      triggered,
      source
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
}
</style>
