'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { EmailForm } from '@/components/email/EmailForm';
import { ArrowRight, Zap, TrendingUp, Clock } from 'lucide-react';
import { ParticleField } from '@/components/home/ParticleField';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/50 to-transparent" />
      {/* Particle animation */}
      <ParticleField />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-sm font-medium text-primary-dark mb-6">
            <Zap className="h-4 w-4 mr-1.5" />
            The future will be automated, make it easy
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Automate Your Business,{' '}
            <span className="text-primary">Amplify Your Results</span>
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto">
            Practical guides, expert tool comparisons, and proven strategies to help you
            automate your marketing and finance workflows.
          </p>
          <div className="max-w-md mx-auto mb-8">
            <EmailForm
              buttonText="Get Free Tips"
              placeholder="Enter your email for weekly automation tips"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/marketing-automation"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Marketing Automation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/finance-automation"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Finance Automation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: TrendingUp, label: 'Productivity gains', value: '10x' },
            { icon: Clock, label: 'Hours saved weekly', value: '20+' },
            { icon: Zap, label: 'Tools reviewed', value: '50+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold font-heading">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
