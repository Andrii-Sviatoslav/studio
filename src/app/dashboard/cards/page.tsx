import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { Badge } from "@/components/ui/badge";

const cards = [
  {
    id: 1,
    bank: "Apex Bank",
    number: "4123 4567 8901 2345",
    expiry: "12/26",
    holder: "Alex Doe",
    balance: 5750.2,
    type: "visa",
    primary: true,
  },
  {
    id: 2,
    bank: "Prestige Bank",
    number: "5555 6666 7777 8888",
    expiry: "08/25",
    holder: "Alex Doe",
    balance: 12340.0,
    type: "mastercard",
    primary: false,
  },
];

const transactions = [
    { name: 'Apple Store', date: '2024-07-20', amount: -1199.00 },
    { name: 'Amazon Fresh', date: '2024-07-19', amount: -75.40 },
    { name: 'Gas Station', date: '2024-07-18', amount: -55.20 },
    { name: 'Restaurant', date: '2024-07-17', amount: -120.00 },
];


export default function CardsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">My Cards</h1>
      
      <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <CarouselContent>
          {cards.map((card) => (
            <CarouselItem key={card.id}>
              <div className="p-1">
                <Card className="bg-primary text-primary-foreground overflow-hidden aspect-[85.6/53.98] relative flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm opacity-80">{card.bank}</p>
                      {card.primary && <Badge variant="secondary">Primary</Badge>}
                    </div>
                    <Image
                      src={card.type === 'visa' ? 'https://placehold.co/48x32/ffffff/000000.png' : 'https://placehold.co/48x32/ffffff/000000.png'}
                      alt={card.type}
                      width={48}
                      height={32}
                      data-ai-hint="logo card"
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-mono tracking-widest">{card.number}</p>
                    <div className="flex justify-between text-sm mt-4">
                      <div>
                        <p className="opacity-80 text-xs">Card Holder</p>
                        <p>{card.holder}</p>
                      </div>
                      <div>
                        <p className="opacity-80 text-xs">Expires</p>
                        <p>{card.expiry}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Transactions from your primary card.
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
                  <TableCell className="font-medium">{transaction.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
                  <TableCell className="text-right">{`$${transaction.amount.toFixed(2)}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
