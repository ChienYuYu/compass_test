<template>
  <div style="text-align: center; font-size: 1.2em;">
    <p><strong>目前方位：</strong>{{ direction }}</p><br>
    <p><strong>原始 Alpha：</strong>{{ alpha !== null ? alpha.toFixed(1) + '°' : '尚未取得' }}</p><br></br>
    <p><strong>修正後角度：</strong>{{ correctedAlpha !== null ? correctedAlpha.toFixed(1) + '°' : '尚未取得' }}</p><br></br>
    <p><strong>使用絕對方向：</strong>{{ isAbsolute ? '是 ✅' : '否 ❌（可能不準）' }}</p><br></br>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const alpha = ref(null);
const isAbsolute = ref(false);

// 修正 alpha 為逆時針方向（符合地理方位）
const correctedAlpha = computed(() => {
  if (alpha.value === null) return null;
  return (360 - alpha.value) % 360;
});

// 根據修正後角度判斷方位
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

// 優先使用 deviceorientationabsolute，否則 fallback
function handleOrientation(event) {
  if (event.alpha !== null) {
    alpha.value = event.alpha;
    isAbsolute.value = !!event.absolute;
  }
}

onMounted(() => {
  window.addEventListener('deviceorientationabsolute', handleOrientation, true);
  window.addEventListener('deviceorientation', handleOrientation, true);
});

onUnmounted(() => {
  window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
  window.removeEventListener('deviceorientation', handleOrientation, true);
});
</script>
