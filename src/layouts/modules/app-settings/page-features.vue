<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { watch } from 'vue';
import { useThemeSettings } from './composables/use-theme-settings';

const { formData, updateCSSVariable, saveConfig } = useThemeSettings();

// 设置监听器
function setupWatchers() {
  // 监听页面切换动画启用状态
  watch(
    () => formData.value.pageTransitionEnabled,
    (value) => {
      updateCSSVariable('--transition-enabled', value ? '1' : '0');
      saveConfig();
    }
  );

  // 监听页面功能配置变更
  watch(
    () => formData.value.showBreadcrumb,
    () => saveConfig()
  );

  watch(
    () => formData.value.showBreadcrumbIcon,
    () => saveConfig()
  );

  watch(
    () => formData.value.showTabs,
    () => saveConfig()
  );

  watch(
    () => formData.value.tabsStyle,
    () => saveConfig()
  );
}

// 初始化
setupWatchers();
</script>

<template>
  <div class="mb-6">
    <Separator class="my-6" label="页面功能" />

    <div class="grid gap-4">
      <!-- 重置缓存策略 -->
      <div class="flex items-center justify-between space-y-0">
        <Label class="flex-1">重置缓存策略</Label>
        <Select v-model="formData.reloadStrategy">
          <SelectTrigger class="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="关闭页面">关闭页面</SelectItem>
            <SelectItem value="刷新页面">刷新页面</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- 滚动模式 -->
      <div class="flex items-center justify-between space-y-0">
        <Label class="flex-1">滚动模式</Label>
        <Select v-model="formData.scrollMode">
          <SelectTrigger class="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mainScroll">主体滚动</SelectItem>
            <SelectItem value="outScroll">外层滚动</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- 页面切换动画 -->
      <div class="flex items-center justify-between space-y-0">
        <Label class="flex-1">页面切换动画</Label>
        <Switch v-model="formData.pageTransitionEnabled" />
      </div>
      <div
        class="flex items-center justify-between space-y-0"
        v-if="formData.pageTransitionEnabled"
      >
        <Label class="flex-1">切换动画类型</Label>
        <Select v-model="formData.pageTransition">
          <SelectTrigger class="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="slide">滑动</SelectItem>
            <SelectItem value="fade">淡入淡出</SelectItem>
            <SelectItem value="scale">缩放消退</SelectItem>
            <SelectItem value="fade-bottom">底部消退</SelectItem>
            <SelectItem value="zoom-fade">渐变</SelectItem>
            <SelectItem value="zoom-out">闪现</SelectItem>
            <SelectItem value="none">无</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- 面包屑设置 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between space-y-0">
          <Label class="flex-1">显示面包屑</Label>
          <Switch v-model="formData.showBreadcrumb" />
        </div>
        <div v-if="formData.showBreadcrumb" class="flex items-center justify-between pt-1">
          <Label class="flex-1">面包屑图标</Label>
          <Switch v-model="formData.showBreadcrumbIcon" :disabled="!formData.showBreadcrumb" />
        </div>
      </div>

      <!-- 标签栏设置 -->
      <div class="space-y-2">
        <div class="flex items-center justify-between space-y-0">
          <Label class="flex-1">显示标签栏</Label>
          <Switch v-model="formData.showTabs" />
        </div>
        <div v-if="formData.showTabs">
          <div class="flex items-center justify-between space-y-0">
            <Label class="flex-1">标签栏风格</Label>
            <Select v-model="formData.tabsStyle" :disabled="!formData.showTabs">
              <SelectTrigger class="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chrome">谷歌风格</SelectItem>
                <SelectItem value="card">卡片风格</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
