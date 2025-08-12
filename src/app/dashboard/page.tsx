import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Landmark,
  PlusCircle,
  Eye,
} from "lucide-react";
import Image from "next/image";

const quickActions = [
  { icon: ArrowUpRight, label: "Send" },
  { icon: ArrowDownLeft, label: "Receive" },
  { icon: Landmark, label: "Loan" },
  { icon: PlusCircle, label: "Topup" },
];

const transactions = [
  {
    name: "Spotify Subscription",
    date: "28 Jan, 12:30 AM",
    amount: "-$15.99",
    type: "expense",
    icon: "/icons/spotify.svg",
    iconBg: "bg-green-100",
  },
  {
    name: "Freelance Gig",
    date: "27 Jan, 10:00 AM",
    amount: "+$2,500.00",
    type: "income",
    icon: "/icons/upwork.svg",
    iconBg: "bg-blue-100",
  },
  {
    name: "Netflix",
    date: "26 Jan, 08:45 PM",
    amount: "-$19.99",
    type: "expense",
    icon: "/icons/netflix.svg",
    iconBg: "bg-red-100",
  },
];

export default function DashboardPage() {
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
                        <AvatarImage src={`https://placehold.co/40x40.png/${transaction.iconBg.slice(3, -4)}/FFFFFF`} alt={transaction.name} data-ai-hint="logo company" />
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
