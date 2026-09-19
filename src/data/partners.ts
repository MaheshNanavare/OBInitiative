import type { ImageMetadata } from 'astro';
import weMakeChange from '../assets/partners/we-make-change.png';
import meaningful from '../assets/partners/meaningful.webp';
import goodera from '../assets/partners/goodera.svg';
import chezuba from '../assets/partners/chezuba.png';
import aperio from '../assets/partners/aperio.png';

export type Partner = { name: string; url: string; logo: ImageMetadata; /** Rendered logo height in px. */ height: number };

export const partners: Partner[] = [
  { name: 'We Make Change', url: 'https://wemakechange.org', logo: weMakeChange, height: 22 },
  { name: 'Meaningful', url: 'https://meaningful.ca', logo: meaningful, height: 30 },
  { name: 'Goodera', url: 'https://goodera.com', logo: goodera, height: 34 },
  { name: 'Chezuba', url: 'https://chezuba.com', logo: chezuba, height: 64 },
  { name: 'Aperio Philanthropy', url: 'https://aperiophilanthropy.com', logo: aperio, height: 34 },
];
