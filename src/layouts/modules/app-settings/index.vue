<script setup lang="ts">
import { Settings } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// 导入各个模块组件
import ThemeMode from './theme-mode.vue';
import SystemFeatures from './system-features.vue';
import PageFeatures from './page-features.vue';
import ThemeColors from './theme-colors.vue';
import ResetConfig from './reset-config.vue';
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon">
        <Settings class="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="w-80 sm:w-[400px]">
      <SheetHeader>
        <SheetTitle>主题配置</SheetTitle>
      </SheetHeader>
      <ScrollArea class="h-[calc(100vh-4rem)] pr-3">
        <!-- 主题模式 -->
        <ThemeMode />

        <!-- 系统功能 -->
        <SystemFeatures />

        <!-- 页面功能配置 -->
        <PageFeatures />

        <!-- 主题颜色 -->
        <ThemeColors />

        <!-- 操作按钮 -->
        <ResetConfig />
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>
