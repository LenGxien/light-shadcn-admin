import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { hexToHSL } from '@/lib/utils';

const THEME_KEY = 'theme-settings';

// 检测系统深色模式偏好
function getSystemDarkPreference(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

interface PageFeatures {
  showBreadcrumb: boolean;
  showBreadcrumbIcon: boolean;
  showTabs: boolean;
  tabsStyle: string;
  reloadStrategy: string;
  pageTransitionEnabled: boolean;
  pageTransition: string;
}

// 主题颜色选项
export const themeColors = [
  { name: '默认', value: 'default' },
  { name: '蓝色', value: 'blue' },
  { name: '绿色', value: 'green' },
  { name: '紫色', value: 'purple' },
  { name: '红色', value: 'red' },
  { name: '橙色', value: 'orange' },
];

// 获取默认设置
const getDefaultSettings = () => ({
  isDark: getSystemDarkPreference(),
  sidebarCollapsed: false,
  primaryColor: '#8b5cf6',
  colorWeakMode: false,
  grayMode: false,
  darkSidebar: false,
  followSystemTheme: true,
  pageFeatures: {
    showBreadcrumb: true,
    showBreadcrumbIcon: true,
    showTabs: true,
    tabsStyle: '谷歌风格',
    reloadStrategy: '关闭页面',
    pageTransitionEnabled: true,
    pageTransition: '滑动',
  } as PageFeatures,
});

// 从 localStorage 获取保存的设置
function getSavedSettings() {
  try {
    const savedState = localStorage.getItem(THEME_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (e) {
    console.error('Error parsing theme settings:', e);
    return null;
  }
}

// 应用主题色
function applyPrimaryColor(color: string, isDark: boolean) {
  document.documentElement.style.setProperty('--primary-color', color);
  const hsl = hexToHSL(color);
  if (hsl) {
    document.documentElement.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    document.documentElement.style.setProperty(
      '--primary-foreground',
      isDark ? '210 40% 98%' : '222.2 47.4% 11.2%'
    );
  }
}

// 应用主题模式到 DOM
function applyThemeMode(isDark: boolean, darkSidebar: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (darkSidebar) {
    document.documentElement.classList.add('dark-sidebar');
  } else {
    document.documentElement.classList.remove('dark-sidebar');
  }
}

export const useThemeStore = defineStore('theme', () => {
  // 合并默认设置和保存的设置
  const defaultSettings = getDefaultSettings();
  const savedSettings = getSavedSettings();
  const initialSettings = savedSettings
    ? { ...defaultSettings, ...savedSettings }
    : defaultSettings;

  // 核心状态
  const isDark = ref(initialSettings.isDark);
  const primaryColor = ref(initialSettings.primaryColor);
  const sidebarCollapsed = ref(initialSettings.sidebarCollapsed);
  const colorWeakMode = ref(initialSettings.colorWeakMode);
  const grayMode = ref(initialSettings.grayMode);
  const darkSidebar = ref(initialSettings.darkSidebar);
  const followSystemTheme = ref(initialSettings.followSystemTheme);
  const pageFeatures = ref<PageFeatures>(initialSettings.pageFeatures);
  const layoutMode = ref('sidebar-content');

  // 监听系统深色模式偏好变化
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
      if (followSystemTheme.value) {
        isDark.value = e.matches;
      }
    });
  }

  // 保存状态到 localStorage
  function saveState() {
    const state = {
      isDark: isDark.value,
      sidebarCollapsed: sidebarCollapsed.value,
      primaryColor: primaryColor.value,
      colorWeakMode: colorWeakMode.value,
      grayMode: grayMode.value,
      darkSidebar: darkSidebar.value,
      followSystemTheme: followSystemTheme.value,
      pageFeatures: pageFeatures.value,
      layoutMode: layoutMode.value,
    };
    localStorage.setItem(THEME_KEY, JSON.stringify(state));
  }

  // 监听暗黑模式变化，应用到 DOM
  watch(
    isDark,
    (value) => {
      // 应用主题模式
      applyThemeMode(value, darkSidebar.value);

      // 更新主题色前景
      applyPrimaryColor(primaryColor.value, value);

      // 如果启用了自动同步，侧边栏跟随主题
      if (followSystemTheme.value) {
        darkSidebar.value = value;
      }

      saveState();
    },
    { immediate: true }
  );

  // 监听侧边栏主题变化
  watch(darkSidebar, (value) => {
    if (value) {
      document.documentElement.classList.add('dark-sidebar');
    } else {
      document.documentElement.classList.remove('dark-sidebar');
    }
    saveState();
  });

  // 监听主题色变化
  watch(primaryColor, (value) => {
    applyPrimaryColor(value, isDark.value);
    saveState();
  });

  // 切换深色模式
  function toggleDark() {
    isDark.value = !isDark.value;
    followSystemTheme.value = false; // 手动切换后不再跟随系统主题
  }

  // 切换侧边栏收起状态
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    saveState();
  }

  // 设置主题色
  function setPrimaryColor(color: string) {
    primaryColor.value = color;
  }

  // 切换色弱模式
  function toggleColorWeakMode() {
    colorWeakMode.value = !colorWeakMode.value;
    document.documentElement.classList.toggle('color-weak');
    saveState();
  }

  // 切换灰度模式
  function toggleGrayMode() {
    grayMode.value = !grayMode.value;
    document.documentElement.classList.toggle('gray-mode');
    saveState();
  }

  // 切换侧边栏主题
  function toggleDarkSidebar() {
    darkSidebar.value = !darkSidebar.value;

    // 直接应用CSS变量
    document.documentElement.style.setProperty('--dark-sidebar', darkSidebar.value ? '1' : '0');

    // 应用类名
    if (darkSidebar.value) {
      document.documentElement.classList.add('dark-sidebar');
    } else {
      document.documentElement.classList.remove('dark-sidebar');
    }
  }

  // 切换是否跟随系统主题
  function toggleFollowSystemTheme() {
    followSystemTheme.value = !followSystemTheme.value;
    if (followSystemTheme.value) {
      isDark.value = getSystemDarkPreference();
    }
    saveState();
  }

  // 更新页面功能配置
  function updatePageFeatures(features: Partial<PageFeatures>) {
    pageFeatures.value = {
      ...pageFeatures.value,
      ...features,
    };

    // 应用页面功能配置
    applyPageFeatures(features);
    saveState();
  }

  // 应用页面功能配置
  function applyPageFeatures(features: Partial<PageFeatures>) {
    // 设置CSS变量
    if (features.tabsStyle) {
      document.documentElement.style.setProperty('--tabs-style', features.tabsStyle);
    }
    if (features.pageTransition) {
      document.documentElement.style.setProperty('--transition-type', features.pageTransition);
    }
    if (features.pageTransitionEnabled !== undefined) {
      document.documentElement.style.setProperty(
        '--transition-enabled',
        features.pageTransitionEnabled ? '1' : '0'
      );
    }
  }

  // 初始化 - 应用页面功能配置
  applyPageFeatures(pageFeatures.value);

  // 应用色弱模式和灰度模式
  if (colorWeakMode.value) {
    document.documentElement.classList.add('color-weak');
  }
  if (grayMode.value) {
    document.documentElement.classList.add('gray-mode');
  }

  // 设置布局模式
  function setLayoutMode(mode: string) {
    layoutMode.value = mode;
    saveState();
  }

  return {
    isDark,
    primaryColor,
    sidebarCollapsed,
    colorWeakMode,
    grayMode,
    darkSidebar,
    followSystemTheme,
    pageFeatures,
    layoutMode,
    toggleDark,
    toggleSidebar,
    setPrimaryColor,
    toggleColorWeakMode,
    toggleGrayMode,
    toggleDarkSidebar,
    toggleFollowSystemTheme,
    updatePageFeatures,
    setLayoutMode,
    saveState,
  };
});
