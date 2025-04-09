<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useThemeStore } from '@/stores/theme';
import { ChevronDown } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();

// 获取主题设置中的面包屑配置
const showBreadcrumb = computed(() => themeStore.pageFeatures.showBreadcrumb);
const showBreadcrumbIcon = computed(() => themeStore.pageFeatures.showBreadcrumbIcon);

// 生成面包屑数据
const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched;
  if (matchedRoutes.length === 0) {
    return [];
  }

  const breadcrumbItems = [];
  const currentRoute = matchedRoutes[matchedRoutes.length - 1];

  // 查找父路由
  const parentRoute = matchedRoutes.length > 1 ? matchedRoutes[matchedRoutes.length - 2] : null;

  if (parentRoute) {
    // 如果有父路由，查找所有子路由
    const childRoutes = router
      .getRoutes()
      .filter((r) => {
        const isChildRoute = r.path.startsWith(parentRoute.path) && r.path !== parentRoute.path;
        const isVisible = !r.meta?.hideInMenu;
        return isChildRoute && isVisible;
      })
      .map((r) => ({
        path: r.path,
        name: r.name,
        meta: r.meta,
        active: r.path === currentRoute.path,
      }));

    // 添加父路由（带下拉菜单）
    breadcrumbItems.push({
      path: parentRoute.path,
      name: parentRoute.name,
      meta: parentRoute.meta,
      siblings: childRoutes,
    });

    // 添加当前路由
    breadcrumbItems.push({
      path: currentRoute.path,
      name: currentRoute.name,
      meta: currentRoute.meta,
      siblings: [],
    });
  } else {
    // 如果没有父路由，只显示当前路由
    breadcrumbItems.push({
      path: currentRoute.path,
      name: currentRoute.name,
      meta: currentRoute.meta,
      siblings: [],
    });
  }

  return breadcrumbItems;
});

// 导航到选定的路由
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div v-if="showBreadcrumb" class="breadcrumb-container">
    <Breadcrumb>
      <BreadcrumbList>
        <template v-for="(item, index) in breadcrumbs" :key="item.path">
          <!-- 不是最后一项，显示为链接 -->
          <BreadcrumbItem v-if="index < breadcrumbs.length - 1">
            <!-- 如果有同级路由，显示下拉菜单 -->
            <template v-if="item.siblings && item.siblings.length > 0">
              <DropdownMenu>
                <DropdownMenuTrigger class="breadcrumb-dropdown-trigger">
                  <BreadcrumbLink>
                    <component
                      v-if="showBreadcrumbIcon && item.meta && item.meta.icon"
                      :is="item.meta.icon"
                      class="mr-1 h-4 w-4 inline-block"
                    />
                    {{ item.meta?.title || item.name }}
                    <ChevronDown class="ml-1 h-3 w-3 inline-block" />
                  </BreadcrumbLink>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    v-for="sibling in item.siblings"
                    :key="sibling.path"
                    @click="navigateTo(sibling.path)"
                    :class="{ 'bg-accent': sibling.active }"
                  >
                    <component
                      v-if="showBreadcrumbIcon && sibling.meta && sibling.meta.icon"
                      :is="sibling.meta.icon"
                      class="mr-2 h-4 w-4"
                    />
                    {{ sibling.meta?.title || sibling.name }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </template>

            <!-- 没有同级路由，显示普通链接 -->
            <template v-else>
              <BreadcrumbLink :href="item.path">
                <component
                  v-if="showBreadcrumbIcon && item.meta && item.meta.icon"
                  :is="item.meta.icon"
                  class="mr-1 h-4 w-4 inline-block"
                />
                {{ item.meta?.title || item.name }}
              </BreadcrumbLink>
            </template>
          </BreadcrumbItem>

          <!-- 最后一项，显示为当前页 -->
          <BreadcrumbItem v-else>
            <!-- 如果有同级路由，显示下拉菜单 -->
            <template v-if="item.siblings && item.siblings.length > 0">
              <DropdownMenu>
                <DropdownMenuTrigger class="breadcrumb-dropdown-trigger">
                  <BreadcrumbPage>
                    <component
                      v-if="showBreadcrumbIcon && item.meta && item.meta.icon"
                      :is="item.meta.icon"
                      class="mr-1 h-4 w-4 inline-block"
                    />
                    {{ item.meta?.title || item.name }}
                    <ChevronDown class="ml-1 h-3 w-3 inline-block" />
                  </BreadcrumbPage>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    v-for="sibling in item.siblings"
                    :key="sibling.path"
                    @click="navigateTo(sibling.path)"
                    :class="{ 'bg-accent': sibling.active }"
                  >
                    <component
                      v-if="showBreadcrumbIcon && sibling.meta && sibling.meta.icon"
                      :is="sibling.meta.icon"
                      class="mr-2 h-4 w-4"
                    />
                    {{ sibling.meta?.title || sibling.name }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </template>

            <!-- 没有同级路由，显示普通当前页 -->
            <template v-else>
              <BreadcrumbPage>
                <component
                  v-if="showBreadcrumbIcon && item.meta && item.meta.icon"
                  :is="item.meta.icon"
                  class="mr-1 h-4 w-4 inline-block"
                />
                {{ item.meta?.title || item.name }}
              </BreadcrumbPage>
            </template>
          </BreadcrumbItem>

          <!-- 分隔符 -->
          <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
        </template>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>

<style scoped>
.breadcrumb-container {
  display: var(--breadcrumb-display, block);
}

.breadcrumb-container :deep(.inline-block) {
  display: var(--breadcrumb-icon-display, inline-flex);
}

.breadcrumb-dropdown-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

:deep(.breadcrumb-dropdown-trigger:hover) {
  text-decoration: underline;
}
</style>
