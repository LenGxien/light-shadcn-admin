<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// 模拟数据
const invoices = ref([
  {
    id: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
    customer: '张三',
    date: '2023-11-14',
  },
  {
    id: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
    customer: '李四',
    date: '2023-11-15',
  },
  {
    id: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
    customer: '王五',
    date: '2023-11-16',
  },
  {
    id: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
    customer: '赵六',
    date: '2023-11-17',
  },
  {
    id: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
    customer: '钱七',
    date: '2023-11-18',
  },
  {
    id: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
    customer: '孙八',
    date: '2023-11-19',
  },
  {
    id: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
    customer: '周九',
    date: '2023-11-20',
  },
]);

// 搜索和筛选功能
const searchQuery = ref('');
const statusFilter = ref('');

const filteredInvoices = computed(() => {
  return invoices.value.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value === '' || invoice.paymentStatus === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <Input v-model="searchQuery" placeholder="搜索发票或客户..." class="w-[250px]" />
      </div>
      <Button>添加发票</Button>
    </div>

    <Table>
      <TableCaption>最近的发票列表</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>发票号</TableHead>
          <TableHead>客户</TableHead>
          <TableHead>日期</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>支付方式</TableHead>
          <TableHead class="text-right">金额</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="invoice in filteredInvoices" :key="invoice.id">
          <TableCell class="font-medium">{{ invoice.id }}</TableCell>
          <TableCell>{{ invoice.customer }}</TableCell>
          <TableCell>{{ invoice.date }}</TableCell>
          <TableCell>
            <span
              :class="{
                'px-2 py-1 rounded text-xs font-medium': true,
                'bg-green-100 text-green-800': invoice.paymentStatus === 'Paid',
                'bg-yellow-100 text-yellow-800': invoice.paymentStatus === 'Pending',
                'bg-red-100 text-red-800': invoice.paymentStatus === 'Unpaid',
              }"
            >
              {{
                invoice.paymentStatus === 'Paid'
                  ? '已支付'
                  : invoice.paymentStatus === 'Pending'
                    ? '处理中'
                    : '未支付'
              }}
            </span>
          </TableCell>
          <TableCell>{{ invoice.paymentMethod }}</TableCell>
          <TableCell class="text-right">{{ invoice.totalAmount }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
