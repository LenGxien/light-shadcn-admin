<template>
  <div class="flex items-center space-x-2">
    <Button
      class="relative p-2 hover:bg-accent hover:text-accent-foreground rounded-lg overflow-hidden transition-colors duration-200"
      @click="toggleTheme"
      variant="ghost"
    >
      <div class="relative z-10">
        <Icon
          :icon="!isDarkTheme ? 'lucide:sun' : 'lucide:moon'"
          class="w-5 h-5 transition-transform duration-200"
        />
      </div>
      <div
        class="absolute inset-0 bg-primary/10 transform transition-transform duration-200"
        :class="{ 'scale-100': isDarkTheme, 'scale-0': !isDarkTheme }"
      ></div>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const themeStore = useThemeStore();
const isDarkTheme = computed(() => themeStore.isDark);

function toggleTheme() {
  themeStore.toggleDark();
}
</script>
