<template>
  <div class="flex items-center justify-center bg-background p-4">
    <Card class="w-full max-w-md shadow-lg">
      <CardHeader class="text-center">
        <CardTitle class="text-3xl font-bold text-primary">403</CardTitle>
        <CardDescription class="text-xl mt-2">禁止访问</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col items-center">
        <div class="w-48 h-48 mb-6 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            class="w-full h-full"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="1.5" />
            <path d="M12 8v4" stroke-width="2" stroke-linecap="round" />
            <path d="M12 16h.01" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
        <p class="text-center text-muted-foreground mb-6">
          抱歉，您没有权限访问此页面。请确认您的账户权限或联系系统管理员获取帮助。
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
