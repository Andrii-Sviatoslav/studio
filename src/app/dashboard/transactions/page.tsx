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

const allTransactions = [
    { name: 'Dribbble Pro', date: '2024-07-20', amount: -15.00, type: 'Expense', category: 'Software' },
    { name: 'Stripe Payout', date: '2024-07-19', amount: 850.00, type: 'Income', category: 'Salary' },
    { name: 'Amazon Purchase', date: '2024-07-19', amount: -42.50, type: 'Expense', category: 'Shopping' },
    { name: 'Coffee Shop', date: '2024-07-18', amount: -5.75, type: 'Expense', category: 'Food' },
    { name: 'Client Payment', date: '2024-07-18', amount: 1200.00, type: 'Income', category: 'Freelance' },
    { name: 'Spotify', date: '2024-07-17', amount: -9.99, type: 'Expense', category: 'Subscription' },
    { name: 'Bookstore', date: '2024-07-16', amount: -25.00, type: 'Expense', category: 'Entertainment' },
];

const incomeTransactions = allTransactions.filter(t => t.type === 'Income');
const expenseTransactions = allTransactions.filter(t => t.type === 'Expense');

const TransactionTable = ({ transactions }: { transactions: typeof allTransactions }) => (
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
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Transactions</h1>
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
