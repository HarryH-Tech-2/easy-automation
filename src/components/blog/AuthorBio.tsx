import { Card } from '@/components/ui/Card';

export function AuthorBio() {
  return (
    <Card className="mt-8">
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-primary font-heading">EA</span>
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg">Easy Automation</h3>
          <p className="text-sm text-muted mt-1">
            We help businesses and professionals discover the best automation tools and strategies
            to streamline their workflows, save time, and scale efficiently.
          </p>
        </div>
      </div>
    </Card>
  );
}
