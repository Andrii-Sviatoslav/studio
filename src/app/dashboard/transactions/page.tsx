
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialTransactions = [
    { name: 'Dribbble Pro', date: '2024-07-20', amount: -15.00, type: 'Expense', category: 'Software' },
    { name: 'Stripe Payout', date: '2024-07-19', amount: 850.00, type: 'Income', category: 'Salary' },
    { name: 'Amazon Purchase', date: '2024-07-19', amount: -42.50, type: 'Expense', category: 'Shopping' },
    { name: 'Coffee Shop', date: '2024-07-18', amount: -5.75, type: 'Expense', category: 'Food' },
    { name: 'Client Payment', date: '2024-07-18', amount: 1200.00, type: 'Income', category: 'Freelance' },
    { name: 'Spotify', date: '2024-07-17', amount: -9.99, type: 'Expense', category: 'Subscription' },
    { name: 'Bookstore', date: '2024-07-16', amount: -25.00, type: 'Expense', category: 'Entertainment' },
];

type Transaction = typeof initialTransactions[0];

const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Transaction</TableHead>
        <TableHead className="hidden md:table-cell">Category</TableHead>
        <TableHead className="hidden sm:table-cell">Date</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.map((transaction, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://placehold.co/40x40.png`} alt={transaction.name} data-ai-hint="logo icon" />
                <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{transaction.name}</span>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Badge variant="outline">{transaction.category}</Badge>
          </TableCell>
          <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
          <TableCell className={`text-right font-semibold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `+$${transaction.amount.toFixed(2)}`}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function TransactionsPage() {
  const [allTransactions, setAllTransactions] = useState(initialTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    category: '',
    amount: '',
    type: 'Expense',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewTransaction(prev => ({ ...prev, type: value }));
  };

  const handleAddTransaction = () => {
    const amount = parseFloat(newTransaction.amount) * (newTransaction.type === 'Expense' ? -1 : 1);
    const newTx: Transaction = {
      name: newTransaction.name,
      category: newTransaction.category,
      amount: amount,
      type: newTransaction.type as 'Income' | 'Expense',
      date: new Date().toISOString().split('T')[0], // Simplified date
    };

    setAllTransactions(prev => [newTx, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setIsDialogOpen(false);
    setNewTransaction({ name: '', category: '', amount: '', type: 'Expense' });
  };

  const incomeTransactions = allTransactions.filter(t => t.type === 'Income');
  const expenseTransactions = allTransactions.filter(t => t.type === 'Expense');

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Transactions</h1>
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
           <DialogTrigger asChild>
             <Button>
               <PlusCircle className="mr-2 h-4 w-4" />
               Add Transaction
             </Button>
           </DialogTrigger>
           <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
               <DialogTitle>Add New Transaction</DialogTitle>
               <DialogDescription>
                 Fill in the details for your new transaction.
               </DialogDescription>
             </DialogHeader>
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="name" className="text-right">Name</Label>
                 <Input id="name" value={newTransaction.name} onChange={handleInputChange} className="col-span-3" placeholder="e.g. Coffee" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="amount" className="text-right">Amount</Label>
                 <Input id="amount" type="number" value={newTransaction.amount} onChange={handleInputChange} className="col-span-3" placeholder="e.g. 5.75" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select onValueChange={handleSelectChange} defaultValue={newTransaction.type}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Expense">Expense</SelectItem>
                        <SelectItem value="Income">Income</SelectItem>
                    </SelectContent>
                </Select>
               </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input id="category" value={newTransaction.category} onChange={handleInputChange} className="col-span-3" placeholder="e.g. Food" />
                </div>
             </div>
             <DialogFooter>
               <Button type="submit" onClick={handleAddTransaction}>Save Transaction</Button>
             </DialogFooter>
           </DialogContent>
         </Dialog>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and manage all your past transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expense</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <TransactionTable transactions={allTransactions} />
            </TabsContent>
            <TabsContent value="income" className="mt-4">
              <TransactionTable transactions={incomeTransactions} />
            </TabsContent>
            <TabsContent value="expense" className="mt-4">
              <TransactionTable transactions={expenseTransactions} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

    