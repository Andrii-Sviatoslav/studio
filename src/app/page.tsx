import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4">
        <Logo />
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-foreground animate-fade-in-up">
            Welcome to Apex Finance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            The best finance app to manage your money, track expenses, and achieve your financial goals with ease.
          </p>
          <div className="animate-fade-in-up delay-400">
            <Button asChild size="lg">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="p-4 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Apex Finance. All rights reserved.</p>
      </footer>
    </div>
  );
}
