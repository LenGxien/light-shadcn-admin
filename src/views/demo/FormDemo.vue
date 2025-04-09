<script setup lang="ts">
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// 定义表单验证模式
const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, {
      message: '用户名至少需要2个字符',
    }),
    email: z.string().email({
      message: '请输入有效的电子邮件地址',
    }),
    bio: z
      .string()
      .min(10, {
        message: '个人简介至少需要10个字符',
      })
      .max(160, {
        message: '个人简介不能超过160个字符',
      })
      .optional(),
    role: z.string({
      required_error: '请选择一个角色',
    }),
    notifications: z.boolean().default(false),
  })
);

// 初始值
const defaultValues = {
  username: '',
  email: '',
  bio: '',
  role: '',
  notifications: false,
};

// 使用vee-validate和zod创建表单
const form = useForm({
  validationSchema: formSchema,
  initialValues: defaultValues,
});

// 表单提交处理
const onSubmit = form.handleSubmit((values) => {
  // 在实际应用中，这里会发送数据到服务器
  alert(JSON.stringify(values, null, 2));
});

// 角色选项
const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '用户', value: 'user' },
  { label: '编辑', value: 'editor' },
  { label: '访客', value: 'visitor' },
];
</script>

<template>
  <div class="p-6">
    <Card>
      <CardHeader>
        <CardTitle>用户资料设置</CardTitle>
        <CardDescription>更新您的账户信息和偏好设置。</CardDescription>
      </CardHeader>
      <CardContent>
        <Form @submit="onSubmit" :validation-schema="formSchema" class="space-y-6">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="输入您的用户名" />
              </FormControl>
              <FormDescription>这是您的公开显示名称。</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>电子邮件</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="输入您的电子邮件" type="email" />
              </FormControl>
              <FormDescription>我们将使用此邮箱与您联系。</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="bio">
            <FormItem>
              <FormLabel>个人简介</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" placeholder="介绍一下您自己..." />
              </FormControl>
              <FormDescription>简短介绍一下您自己，这将显示在您的个人资料中。</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="role">
            <FormItem>
              <FormLabel>角色</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择一个角色" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    v-for="option in roleOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>您在系统中的角色和权限。</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="notifications">
            <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
              <div class="space-y-0.5">
                <FormLabel>电子邮件通知</FormLabel>
                <FormDescription>接收关于您账户活动的电子邮件通知。</FormDescription>
              </div>
              <FormControl>
                <Switch v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>

          <Button type="submit" class="mt-4">更新资料</Button>
        </Form>
      </CardContent>
    </Card>
  </div>
</template>
