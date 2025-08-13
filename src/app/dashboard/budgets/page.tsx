"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialBudgets = [
  { id: 1, category: 'Groceries', spent: 250, total: 500 },
  { id: 2, category: 'Entertainment', spent: 150, total: 200 },
  { id: 3, category: 'Transport', spent: 80, total: 100 },
  { id: 4, category: 'Shopping', spent: 400, total: 1000 },
];

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [newCategory, setNewCategory] = useState('');
  const [newTotal, setNewTotal] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddBudget = () => {
    if (newCategory && newTotal) {
      const newBudget = {
        id: budgets.length + 1,
        category: newCategory,
        spent: 0,
        total: parseFloat(newTotal),
      };
      setBudgets([...budgets, newBudget]);
      setNewCategory('');
      setNewTotal('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Budgets</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Budget</DialogTitle>
              <DialogDescription>
                Create a new budget for a category to track your spending.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. Shopping"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total" className="text-right">
                  Total Amount
                </Label>
                <Input
                  id="total"
                  type="number"
                  value={newTotal}
                  onChange={(e) => setNewTotal(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. 500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddBudget}>Save budget</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.total) * 100;
          return (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle>{budget.category}</CardTitle>
                <CardDescription>
                  Track your spending for {budget.category.toLowerCase()}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={percentage} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${budget.spent.toFixed(2)} spent</span>
                    <span>${(budget.total - budget.spent).toFixed(2)} remaining</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                 <span className="text-sm font-medium w-full text-right">Total: ${budget.total.toFixed(2)}</span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
