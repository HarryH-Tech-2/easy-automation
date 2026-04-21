export interface Author {
  slug: string;
  name: string;
  title: string;
  location?: string;
  bio: string;
  longBio?: string;
  linkedin?: string;
  portfolio?: string;
  email?: string;
  image?: string;
  initials: string;
  education?: string;
  expertise?: string[];
}

export const authors: Record<string, Author> = {
  'harry-harrison': {
    slug: 'harry-harrison',
    name: 'Harry Harrison',
    title: 'Founder & Editor, Easy Automation',
    location: 'Bogotá, Colombia',
    bio: 'Tech-forward B2B writer and content strategist focused on marketing and finance automation.',
    longBio:
      'Harry Harrison is a B2B writer and content strategist with years of experience covering the automation, SaaS, and martech landscape. He founded Easy Automation to cut through the hype and give operators the honest, practical guidance that most "best-of" lists fail to deliver. Harry studied at the University of Essex and now works from Bogotá, Colombia. When he is not testing automation tools, he is writing about them at harryh.tech.',
    linkedin: 'https://www.linkedin.com/in/harry-harrison/',
    portfolio: 'https://harryh.tech',
    initials: 'HH',
    education: 'University of Essex',
    expertise: [
      'Marketing automation',
      'Finance automation',
      'B2B SaaS content',
      'Workflow design',
      'Tool evaluation',
    ],
  },
};

export const DEFAULT_AUTHOR_SLUG = 'harry-harrison';

export function getAuthor(slug?: string): Author {
  const key = slug && authors[slug] ? slug : DEFAULT_AUTHOR_SLUG;
  return authors[key];
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
