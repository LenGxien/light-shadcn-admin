<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Users, Activity, BarChart, Calendar, Settings } from 'lucide-vue-next';

// 模拟数据 - 统计卡片
const stats = [
  { title: '总收入', value: '¥45,231.89', icon: CreditCard, change: '+20.1%', trend: 'up' },
  { title: '订阅数', value: '2,350', icon: Users, change: '+10.5%', trend: 'up' },
  { title: '活跃用户', value: '1,893', icon: Activity, change: '-3.2%', trend: 'down' },
  { title: '转化率', value: '12.5%', icon: BarChart, change: '+4.3%', trend: 'up' },
];

// 模拟数据 - 最近活动
const activities = [
  { user: '张三', action: '创建了新项目', time: '2小时前', avatar: '/avatars/01.png' },
  { user: '李四', action: '评论了任务', time: '5小时前', avatar: '/avatars/02.png' },
  { user: '王五', action: '完成了任务', time: '昨天', avatar: '/avatars/03.png' },
  { user: '赵六', action: '上传了文件', time: '2天前', avatar: '/avatars/04.png' },
];

// 模拟数据 - 即将到来的事件
const events = [
  { title: '团队会议', date: '今天 14:00', description: '讨论本周进度' },
  { title: '产品发布', date: '明天 10:00', description: '新功能上线' },
  { title: '客户演示', date: '周五 15:30', description: '向客户展示新功能' },
];
</script>

<template>
  <div class="p-6 space-y-6">
    <h2 class="text-3xl font-bold tracking-tight">卡片组件示例</h2>
    <p class="text-muted-foreground">展示各种卡片布局和用例的示例页面。</p>

    <!-- 统计卡片 -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="(stat, index) in stats" :key="index">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground flex items-center mt-1">
            <span
              :class="{
                'text-green-600': stat.trend === 'up',
                'text-red-600': stat.trend === 'down',
              }"
            >
              {{ stat.change }}
            </span>
            <span class="ml-1">相比上月</span>
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- 内容卡片 -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <!-- 活动卡片 -->
      <Card>
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
          <CardDescription>您团队的最新活动。</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="(activity, index) in activities" :key="index" class="flex items-center">
              <Avatar class="h-9 w-9">
                <AvatarImage :src="activity.avatar" alt="Avatar" />
                <AvatarFallback>{{ activity.user.charAt(0) }}</AvatarFallback>
              </Avatar>
              <div class="ml-4 space-y-1">
                <p class="text-sm font-medium leading-none">{{ activity.user }}</p>
                <p class="text-sm text-muted-foreground">{{ activity.action }}</p>
              </div>
              <div class="ml-auto font-medium text-xs text-muted-foreground">
                {{ activity.time }}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">查看所有活动</Button>
        </CardFooter>
      </Card>

      <!-- 事件卡片 -->
      <Card>
        <CardHeader>
          <CardTitle>即将到来的事件</CardTitle>
          <CardDescription>您的日程安排。</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="(event, index) in events" :key="index" class="flex items-start">
              <Calendar class="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div class="space-y-1">
                <p class="text-sm font-medium leading-none">{{ event.title }}</p>
                <p class="text-sm text-muted-foreground">{{ event.date }}</p>
                <p class="text-sm text-muted-foreground">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">查看所有事件</Button>
        </CardFooter>
      </Card>

      <!-- 设置卡片 -->
      <Card>
        <CardHeader>
          <CardTitle>设置</CardTitle>
          <CardDescription>管理您的账户设置。</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <Settings class="h-5 w-5" />
              <div>
                <p class="text-sm font-medium leading-none">个人资料</p>
                <p class="text-sm text-muted-foreground">更新您的个人信息</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">编辑</Button>
          </div>
          <Separator />
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <CreditCard class="h-5 w-5" />
              <div>
                <p class="text-sm font-medium leading-none">账单信息</p>
                <p class="text-sm text-muted-foreground">管理您的付款方式</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">编辑</Button>
          </div>
          <Separator />
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <Users class="h-5 w-5" />
              <div>
                <p class="text-sm font-medium leading-none">团队成员</p>
                <p class="text-sm text-muted-foreground">邀请和管理团队成员</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">编辑</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full">保存更改</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
