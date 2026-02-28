import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedPosts } from '@/components/home/FeaturedPosts';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { NewsletterHero } from '@/components/email/NewsletterHero';
import { getAllPosts } from '@/lib/content';

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
