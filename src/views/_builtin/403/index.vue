<template>
  <ErrorPage
    code="403"
    title="禁止访问"
    message="抱歉，您没有权限访问此页面。请确认您的账户权限或联系系统管理员获取帮助。"
    svgName="403"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'no-permission',
});
</script>
