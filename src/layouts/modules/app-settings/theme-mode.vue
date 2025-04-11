<script setup lang="ts">
import { Sun, Moon, Monitor } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useThemeSettings } from './composables/use-theme-settings';

const { themeMode, setThemeMode } = useThemeSettings();
</script>

<template>
  <div class="mb-6">
    <Separator class="my-6" label="主题模式" />
    <div class="mt-3 flex justify-center gap-2">
      <Button
        size="sm"
        variant="outline"
        class="h-10 w-16"
        :class="{ 'bg-primary text-primary-foreground': themeMode === 'light' }"
        @click="setThemeMode('light')"
        type="button"
      >
        <Sun class="h-5 w-5" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        class="h-10 w-16"
        :class="{ 'bg-primary text-primary-foreground': themeMode === 'dark' }"
        @click="setThemeMode('dark')"
        type="button"
      >
        <Moon class="h-5 w-5" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        class="h-10 w-16"
        :class="{ 'bg-primary text-primary-foreground': themeMode === 'system' }"
        @click="setThemeMode('system')"
        type="button"
      >
        <Monitor class="h-5 w-5" />
      </Button>
    </div>
  </div>
</template>
