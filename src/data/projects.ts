import type { ImageMetadata } from 'astro';
import mentalHealth from '../assets/projects/mental-health.png';
import wash from '../assets/projects/wash.png';
import climate from '../assets/projects/climate.png';
import education from '../assets/projects/education.png';

export type FocusArea = {
  id: string;
  area: string;
  project: string;
  /** One-line summary used on cards (Home, Support a Project). */
  summary: string;
  illustration: ImageMetadata;
  color: 'purple' | 'blue' | 'green' | 'amber';
};

// Order matches the WordPress "Our Projects" page.
export const focusAreas: FocusArea[] = [
  {
    id: 'mental-health',
    area: 'Mental Health Awareness',
    project: 'Kyogere Campaign',
    summary:
      'Our Kyogere ("Say It Out") campaign uses storytelling, safe spaces and counselling to break the stigma around mental health.',
    illustration: mentalHealth,
    color: 'purple',
  },
  {
    id: 'wash',
    area: 'Water, Sanitation & Health (W.A.S.H)',
    project: 'SITUKA! Bulamu Bwetulongoosa Drive',
    summary:
      'Protecting clean water sources, promoting good hygiene and proper waste management in urban communities like Bwaise.',
    illustration: wash,
    color: 'blue',
  },
  {
    id: 'climate',
    area: 'Climate Resilience',
    project: 'Green Eco-Lab',
    summary:
      'Climate clubs and a 5-month Green Eco-Lab that equip schools and communities with practical skills for sustainable living.',
    illustration: climate,
    color: 'green',
  },
  {
    id: 'education',
    area: 'Quality Education',
    project: 'Flow with Dignity Campaign',
    summary:
      'Menstrual health kits, scholastic materials, vocational training and digital literacy so every child can learn with dignity.',
    illustration: education,
    color: 'amber',
  },
];
