<template>
  <div class="flex h-screen w-full items-center justify-center px-4">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Enter your email below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          :schema="formSchema"
          @submit="loginSubmit"
          :field-config="{
            email: {
              description: '请输入您的邮箱地址',
              label: '邮箱',
              inputProps: {
                placeholder: 'm@example.com',
              },
            },
            password: {
              description: '请输入您的密码',
              label: '密码',
              inputProps: {
                placeholder: 'password',
                type: 'password',
              },
            },
          }"
        >
          <div class="grid gap-4 mt-4">
            <Button type="submit" class="w-full"> Login </Button>
            <div class="mt-4 text-center text-sm">
              Don't have an account?
              <a href="#" class="underline"> Sign up </a>
            </div>
          </div>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import { AutoForm } from '@/components/ui/auto-form';
  import * as z from 'zod';

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码至少需要6个字符'),
  });

  const loginSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form values:', values);
    router.push('/');
  };
</script>
