import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ArrowRight, BarChart3, Wallet } from 'lucide-react';
import { categoryLabels, categoryDescriptions, Category } from '@/lib/constants';

const categoryIcons: Record<Category, React.ElementType> = {
  'marketing-automation': BarChart3,
  'finance-automation': Wallet,
};

export function CategoryShowcase() {
  return (
    <Section className="bg-surface">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold">Explore by Category</h2>
          <p className="text-muted mt-2">Dive deep into the automation topics that matter to you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {(Object.keys(categoryLabels) as Category[]).map((category) => {
            const Icon = categoryIcons[category];
            return (
              <Link key={category} href={`/${category}`}>
                <Card hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary-light p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg mb-1">
                        {categoryLabels[category]}
                      </h3>
                      <p className="text-sm text-muted mb-3">{categoryDescriptions[category]}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Browse articles <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
