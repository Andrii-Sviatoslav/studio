"use client";

import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon, Eye, ArrowUpRight, ArrowDownLeft, Landmark, PlusCircle } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';

const quickActions = [
  { icon: ArrowUpRight, label: 'Send' },
  { icon: ArrowDownLeft, label: 'Receive' },
  { icon: Landmark, label: 'Loan' },
  { icon: PlusCircle, label: 'Topup' },
];

const transactions = [
  {
    name: "Spotify Subscription",
    date: "28 Jan, 12:30 AM",
    amount: "-$15.99",
    type: "expense",
  },
  {
    name: "Freelance Gig",
    date: "27 Jan, 10:00 AM",
    amount: "+$2,500.00",
    type: "income",
  },
  {
    name: "Netflix",
    date: "26 Jan, 08:45 PM",
    amount: "-$19.99",
    type: "expense",
  },
];

const chartData = [
  { date: 'Jan 22', income: 2000, expenses: 1500 },
  { date: 'Jan 23', income: 2500, expenses: 1800 },
  { date: 'Jan 24', income: 3000, expenses: 2000 },
  { date: 'Jan 25', income: 2780, expenses: 1908 },
  { date: 'Jan 26', income: 1890, expenses: 2200 },
  { date: 'Jan 27', income: 2390, expenses: 1700 },
  { date: 'Jan 28', income: 3490, expenses: 2100 },
];

const chartConfig: ChartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
};

export default function DashboardPage() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: new Date(),
    });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardDescription>Total Balance</CardDescription>
              <CardTitle className="text-4xl">$24,567.89</CardTitle>
            </div>
            <Button variant="ghost" size="icon">
              <Eye className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button key={action.label} variant="outline" className="flex flex-col h-24 gap-2">
                <action.icon className="h-6 w-6 text-primary" />
                <span>{action.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Send Again</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-around">
              <Avatar className="h-16 w-16">
                  <Image src="https://placehold.co/100x100.png" alt="User 1" width={64} height={64} data-ai-hint="person" />
                  <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                  <Image src="https://placehold.co/100x100.png" alt="User 2" width={64} height={64} data-ai-hint="person" />
                  <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                  <Image src="https://placehold.co/100x100.png" alt="User 3" width={64} height={64} data-ai-hint="person" />
                  <AvatarFallback>U3</AvatarFallback>
              </Avatar>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Income vs. Expense</CardTitle>
            <CardDescription>
              A visual representation of your income and expenses.
            </CardDescription>
          </div>
           <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <RechartsTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Here are your most recent transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.name}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={`https://placehold.co/40x40.png`} alt={transaction.name} data-ai-hint="logo company" />
                        <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{transaction.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-foreground'}`}>
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
