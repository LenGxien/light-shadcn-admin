<template>
  <div class="flex items-center justify-center bg-background p-4">
    <Card class="w-full max-w-md shadow-lg">
      <CardHeader class="text-center">
        <CardTitle class="text-3xl font-bold text-primary">404</CardTitle>
        <CardDescription class="text-xl mt-2">页面未找到</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col items-center">
        <div class="w-48 h-48 mb-6 text-muted-foreground"></div>
        <p class="text-center text-muted-foreground mb-6">
          抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或尝试访问其他页面。
        </p>
        <div class="flex gap-4">
          <Button @click="goBack" variant="outline">返回上页</Button>
          <Button @click="goHome">返回首页</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';

  const router = useRouter();

  function goBack() {
    router.back();
  }

  function goHome() {
    router.push('/');
  }
</script>

<style scoped>
  .bg-background {
    background-color: var(--background);
  }
</style>
