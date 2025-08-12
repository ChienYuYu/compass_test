<template>
  <div class="orientation-display">
    <h2>📱 裝置方向資訊</h2><br>
    <p><strong>Alpha（旋轉角度）:</strong> {{ alpha.toFixed(1) }}</p><br>
    <p><strong>是否絕對方位:</strong> {{ isAbsolute ? '✅ 是' : '❌ 否' }}</p>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'OrientationDisplay',
  setup() {
    const alpha = ref(null);
    const isAbsolute = ref(false);

    const handleOrientation = (event) => {
      alpha.value = event.alpha;
      isAbsolute.value = event.absolute;
    };

    onMounted(() => {
      window.addEventListener('deviceorientationabsolute', handleOrientation);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
    });

    return {
      alpha,
      isAbsolute
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
  max-width: 300px;
}
</style>