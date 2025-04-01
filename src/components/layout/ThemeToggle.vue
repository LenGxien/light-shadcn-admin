<template>
  <div class="flex items-center space-x-2">
    <Button
      class="relative p-2 hover:bg-accent hover:text-accent-foreground rounded-lg overflow-hidden transition-colors duration-200"
      @click="toggleTheme"
    >
      <div class="relative z-10">
        <Icon
          :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
          class="w-5 h-5 transition-transform duration-200"
          :class="{ 'rotate-90': isDark }"
        />
      </div>
      <div
        class="absolute inset-0 bg-primary/10 transform transition-transform duration-200"
        :class="{ 'scale-100': isDark, 'scale-0': !isDark }"
      ></div>
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue';
  import { useDark, useToggle } from '@vueuse/core';
  import { Button } from '@/components/ui/button';

  const isDark = useDark();
  const toggleTheme = useToggle(isDark);
</script>
