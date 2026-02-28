import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="font-heading text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try browsing our latest articles instead.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/">
          <Button>
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </Link>
        <Link href="/marketing-automation">
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Browse Articles
          </Button>
        </Link>
      </div>
    </Container>
  );
}
