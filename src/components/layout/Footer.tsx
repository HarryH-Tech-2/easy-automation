import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const footerLinks = [
  {
    title: 'Content',
    links: [
      { label: 'Marketing Automation', href: '/marketing-automation' },
      { label: 'Finance Automation', href: '/finance-automation' },
      { label: 'FAQs', href: '/automation-faqs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Do Not Sell My Info', href: '/do-not-sell-personal-information' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-bold font-heading text-primary">Easy</span>
                <span className="text-xl font-bold font-heading text-foreground"> Automation</span>
              </Link>
              <p className="text-sm text-muted max-w-xs">
                The future will be automated, make it easy. Practical guides to automate your marketing and finance workflows.
              </p>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="font-heading font-semibold text-sm mb-4">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Easy Automation. All rights reserved.
            </p>
            <p className="text-xs text-muted">
              Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
