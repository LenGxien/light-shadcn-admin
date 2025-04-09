<template>
  <ErrorPage
    code="404"
    title="页面未找到"
    message="抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或尝试访问其他页面。"
    svgName="404"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'not-found',
});
</script>
