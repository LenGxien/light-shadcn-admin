<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useThemeSettings } from './composables/use-theme-settings';
import { watch } from 'vue';

const { formData, updateCSSVariable, saveConfig } = useThemeSettings();

// 设置监听器
function setupWatchers() {
  // 灰度模式监听
  watch(
    () => formData.value.grayMode,
    (value) => {
      if (value) {
        document.documentElement.classList.add('gray-mode');
      } else {
        document.documentElement.classList.remove('gray-mode');
      }
      updateCSSVariable('--gray-mode', value ? '1' : '0');
      saveConfig(); // 保存状态
    }
  );

  // 色弱模式监听
  watch(
    () => formData.value.colorWeakMode,
    (value) => {
      if (value) {
        document.documentElement.classList.add('color-weak');
      } else {
        document.documentElement.classList.remove('color-weak');
      }
      updateCSSVariable('--color-weak', value ? '1' : '0');
      saveConfig(); // 保存状态
    }
  );

  // 暗色侧边栏监听
  watch(
    () => formData.value.darkSidebar,
    (value) => {
      if (value) {
        document.documentElement.classList.add('dark-sidebar');
      } else {
        document.documentElement.classList.remove('dark-sidebar');
      }
      updateCSSVariable('--dark-sidebar', value ? '1' : '0');
      saveConfig(); // 保存状态
    }
  );
}

// 初始化
setupWatchers();
</script>

<template>
  <div class="mb-6">
    <Separator class="my-6" label="系统功能" />
    <div class="grid gap-4">
      <div class="flex items-center justify-between space-y-0">
        <Label class="flex-1">暗色侧边栏</Label>
        <Switch v-model="formData.darkSidebar" />
      </div>

      <div class="flex items-center justify-between space-y-0">
        <Label class="flex-1">灰度模式</Label>
        <Switch v-model="formData.grayMode" />
      </div>

      <div class="flex items-center justify-between space-y-0">
        <Label class="flex-1">色弱模式</Label>
        <Switch v-model="formData.colorWeakMode" />
      </div>
    </div>
  </div>
</template>
