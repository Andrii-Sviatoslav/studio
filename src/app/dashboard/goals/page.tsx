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
import { PlusCircle, Target } from "lucide-react";
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

const initialGoals = [
  { id: 1, name: 'New Laptop', saved: 800, target: 1500 },
  { id: 2, name: 'Vacation to Hawaii', saved: 2500, target: 5000 },
  { id: 3, name: 'Emergency Fund', saved: 7500, target: 10000 },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [newGoalName, setNewGoalName] = useState('');
  const [newTargetAmount, setNewTargetAmount] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = () => {
    if (newGoalName && newTargetAmount) {
      const newGoal = {
        id: goals.length + 1,
        name: newGoalName,
        saved: 0,
        target: parseFloat(newTargetAmount),
      };
      setGoals([...goals, newGoal]);
      setNewGoalName('');
      setNewTargetAmount('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Financial Goals</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>
                Set up a new financial goal to start saving.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-name" className="text-right">
                  Goal Name
                </Label>
                <Input
                  id="goal-name"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. New Car"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target-amount" className="text-right">
                  Target Amount
                </Label>
                <Input
                  id="target-amount"
                  type="number"
                  value={newTargetAmount}
                  onChange={(e) => setNewTargetAmount(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. 20000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddGoal}>Save goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const percentage = (goal.saved / goal.target) * 100;
          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Target className="h-6 w-6" />
                    <CardTitle>{goal.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={percentage} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${goal.saved.toFixed(2)} saved</span>
                    <span>${(goal.target - goal.saved).toFixed(2)} to go</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                 <span className="text-sm font-medium w-full text-right">Target: ${goal.target.toFixed(2)}</span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
