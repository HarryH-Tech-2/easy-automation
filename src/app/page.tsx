import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedPosts } from '@/components/home/FeaturedPosts';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { NewsletterHero } from '@/components/email/NewsletterHero';
import { getAllPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Easy Automation — Marketing & Finance Automation Guides, Tools & Tips',
  description: 'Master marketing and finance automation with expert guides, honest tool comparisons, and step-by-step workflows. Save 20+ hours a week and scale your business on autopilot.',
  alternates: { canonical: 'https://easyautomation.io' },
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <HeroSection />
      <FeaturedPosts posts={posts} />
      <CategoryShowcase />
      <NewsletterHero />
    </>
  );
}
