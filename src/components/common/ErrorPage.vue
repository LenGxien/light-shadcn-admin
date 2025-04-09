<template>
  <div class="flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md flex flex-col items-center p-6">
      <div class="text-center mb-4">
        <h1 class="text-3xl font-bold text-primary">{{ code }}</h1>
        <p class="text-xl mt-2 text-muted-foreground">{{ title }}</p>
      </div>
      <div class="flex flex-col items-center">
        <div class="w-48 h-48 mb-6 text-muted-foreground">
          <img :src="`/images/${svgName}.svg`" :alt="title" class="w-full h-full" />
        </div>
        <p class="text-center text-muted-foreground mb-6">
          {{ message }}
        </p>
        <div class="flex gap-4">
          <Button @click="goBack" variant="outline">返回上页</Button>
          <Button @click="goHome">返回首页</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';

defineProps<{
  code: string | number;
  title: string;
  message: string;
  svgName: string;
}>();

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
