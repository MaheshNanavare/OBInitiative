// Site-wide settings. Most day-to-day edits (links, deadlines, campaign numbers) happen here.

export const site = {
  name: "Obuyisi bw'Omu Initiative",
  shortName: 'OBI',
  motto: 'Bridging Gaps, Developing Communities',
  description:
    "Empowering Uganda's youth and communities to thrive through mental health awareness, clean water, quality health, climate resilience and education.",
  location: 'Bwaise, Kampala, Uganda',
  founded: 2023,
};

// Donations are processed by Meaningful (meaningful.ca), the same page the WordPress site used.
export const donateUrl = 'https://app.meaningful.ca/en/donate/682bbbbf77b0f20bee1a6122/null';

export const socials = [
  { name: 'Facebook', url: 'https://www.facebook.com/people/Obuyisi-bwomu-initiative/100089738645135/' },
  { name: 'Instagram', url: 'https://www.instagram.com/obinitiative' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/obuyisi-bw-omu-initiative' },
  { name: 'X', url: 'https://x.com/obuyisibwomu' },
  { name: 'YouTube', url: 'https://www.youtube.com/@obuyisibwomuinitiative' },
] as const;

export const fundraiser = {
  goal: 20000,
  children: 600,
  terms: 'the second and third school terms of 2026',
  // "Where your gift goes" on the Fund Us page (USD, from the Funding Concept Note). Should add up to `goal`.
  budget: [
    { item: 'Scholastic materials', amount: 8000 },
    { item: 'Hygiene kits', amount: 4500 },
    { item: 'Procurement and logistics', amount: 2000 },
    { item: 'Community mobilisation', amount: 1000 },
    { item: 'Volunteer coordination', amount: 1000 },
    { item: 'Monitoring and evaluation', amount: 1000 },
    { item: 'Communications and reporting', amount: 1000 },
    { item: 'Administration and contingency', amount: 1500 },
  ],
};

// Downloadable one-page profile for donors and grant-makers (the file lives in public/downloads/).
export const organisationProfileUrl = '/downloads/obi-organisation-profile.pdf';

// Story Competition submission deadline. Leave as null to show "to be announced".
// Example: '2026-12-15'
export const storyCompetitionDeadline: string | null = null;

// Where forms are posted. Handled by the Worker in worker/index.ts.
export const formEndpoint = '/api/submit/';

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story/' },
  { label: 'Our Projects', href: '/our-projects/' },
  {
    label: 'Get Involved',
    href: '/fund-us/',
    children: [
      { label: 'Fund Us', href: '/fund-us/' },
      { label: 'Support a Project', href: '/support-a-project/' },
      { label: 'Fundraise For Us', href: '/fundraise-for-us/' },
      { label: 'Volunteer or Intern', href: '/apply-as-a-volunteer-or-intern/' },
    ],
  },
  {
    label: 'Stories',
    href: '/our-stories/',
    children: [
      { label: 'Our Stories', href: '/our-stories/' },
      { label: 'Story Competition', href: '/storycompetition/' },
    ],
  },
];
