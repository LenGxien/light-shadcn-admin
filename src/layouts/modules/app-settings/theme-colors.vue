<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import { useThemeSettings } from './composables/use-theme-settings';

const { primaryColor, themeStore, updateCSSVariable } = useThemeSettings();

// 预设颜色选项
const colorPresets = [
  { name: 'Zinc', value: '#71717a' },
  { name: 'Slate', value: '#64748b' },
  { name: 'Stone', value: '#78716c' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'Neutral', value: '#737373' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Violet', value: '#8b5cf6' },
];

// 选择预设颜色
function selectColor(color) {
  primaryColor.value = color;
  // 调用store中的setPrimaryColor方法更新全局状态
  themeStore.setPrimaryColor(color);
  // 保存状态到localStorage
  themeStore.saveState();
  // 更新CSS变量
  updateCSSVariable('--primary-color', color);
}
</script>

<template>
  <div class="mb-6">
    <Separator class="my-6" label="主题颜色" />

    <!-- 预设颜色选项 -->
    <div class="mt-4 grid grid-cols-3 gap-2">
      <div
        v-for="color in colorPresets"
        :key="color.value"
        class="flex items-center gap-2 p-2 rounded-md border cursor-pointer hover:bg-muted transition-colors"
        :class="{ 'border-primary': primaryColor === color.value }"
        @click="selectColor(color.value)"
      >
        <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: color.value }"></div>
        <span class="text-xs">{{ color.name }}</span>
        <div v-if="primaryColor === color.value" class="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-primary"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
