<template>
  <ErrorPage
    code="500"
    title="服务器错误"
    message="抱歉，服务器遇到了一个错误。请稍后再试或联系系统管理员获取帮助。"
    svgName="500"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'service-error',
});
</script>
