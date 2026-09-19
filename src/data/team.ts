import type { ImageMetadata } from 'astro';
import moses from '../assets/team/mbalire-moses.jpg';
import nachipa from '../assets/team/nachipa-flavia-diana.jpg';
import catherine from '../assets/team/catherine-kariuki.jpg';
import levi from '../assets/team/buyinza-levi.jpg';
import barbra from '../assets/team/mirembe-barbra.jpg';
import maimuna from '../assets/team/maimuna-nakanwagi.jpg';
import athalia from '../assets/team/kataike-athalia-lenny.jpg';
import kaone from '../assets/team/kaone-selebogo.jpg';
import ricardo from '../assets/team/ricardo-torres-haces.jpg';
import ignatius from '../assets/team/ignatius-neshena.png';
import sophie from '../assets/team/sophie-cumberpatch.jpg';
import bayabonga from '../assets/team/bayabonga-nhlabatsi.jpg';
import mahesh from '../assets/team/mahesh-nanavare.jpg';

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: ImageMetadata;
  /** CSS object-position, to keep faces in frame when the photo is cropped square. */
  focus?: string;
  /** Zoom into the photo (e.g. 1.6) when the person is small in the frame, such as full-length shots. */
  zoom?: number;
};

export const team: TeamMember[] = [
  {
    name: 'Mbalire Moses',
    role: 'Founder / Team Leader',
    bio: "With a passion for community transformation, leads Obuyisi bw'Omu Initiative, focusing on bridging access gaps for sustainable, impactful change across Uganda.",
    photo: moses,
    focus: '50% 22%',
    zoom: 1.9,
  },
  {
    name: 'Nachipa Flavia Diana',
    role: 'Co-Founder',
    bio: '"This challenge that I went through at a young age compels me to work hard and tell my story." Community work brings positive change and great impact in daily lives; it is a catalyst.',
    photo: nachipa,
    focus: '50% 25%',
  },
  {
    name: 'Catherine Kariuki',
    role: 'Board Member',
    bio: 'A social impact advisor and changemaker with over 20 years of experience and skills in leadership, coaching, marketing and strategy development.',
    photo: catherine,
    focus: '50% 10%',
    zoom: 2.2,
  },
  {
    name: 'Buyinza Levi',
    role: 'Administration Officer',
    bio: 'Buyinza Levi brings on board a vast wealth of experience in Administration, Logistics and Human Resource Management.',
    photo: levi,
    focus: '50% 15%',
    zoom: 1.6,
  },
  {
    name: 'Mirembe Barbra',
    role: 'Legal Officer',
    bio: "Deeply passionate about children's rights and advancing equality, Barbra brings a compassionate approach to her work.",
    photo: barbra,
    focus: '50% 15%',
  },
  {
    name: 'Maimuna Nakanwagi',
    role: 'Human Resources Manager',
    bio: "Responsible for aligning HR practices with the organisation's overall goals to achieve long-term success, proactively linking HR activities to our mission, vision and objectives.",
    photo: maimuna,
    focus: '50% 20%',
  },
  {
    name: 'Kataike Athalia Lenny',
    role: 'Social Media Manager',
    bio: 'I focus on developing visual standards that amplify our advocacy and impact. I am dedicated to building authentic digital relationships and conducting the research necessary to ensure our community remains connected and empowered.',
    photo: athalia,
    focus: '50% 25%',
  },
  {
    name: 'Kaone Selebogo',
    role: 'Assistant Social Media Manager',
    bio: 'I have practical experience in creating email campaigns, managing audience data, and supporting content strategies for nonprofit work. I am particularly interested in helping organisations expand their online presence and connect more effectively with their communities.',
    photo: kaone,
    focus: '50% 20%',
  },
  {
    name: 'Ricardo Tonatiuh Torres Haces',
    role: 'Programmes Manager',
    bio: 'His work integrates data-driven analysis, policy implementation, and capacity-building strategies to strengthen institutional accountability and advance gender equality, education, and human rights protection in diverse cultural settings.',
    photo: ricardo,
    focus: '50% 20%',
    zoom: 1.5,
  },
  {
    name: 'Ignatius Neshena',
    role: 'Grant Writer and Fundraising Donor Relations Officer',
    bio: 'A seasoned finance and business strategy professional with over 15 years of experience across corporate and development sectors, dedicated to driving sustainable growth and financial strategy for our community programmes.',
    photo: ignatius,
  },
  {
    name: 'Sophie Cumberpatch',
    role: 'Public Relations, Communications Officer and Media Manager',
    bio: "I am an Experimental Psychology graduate from the University of Oxford with a passion for mental health. I look forward to furthering the organisation's mission through establishing meaningful relationships and communication strategies throughout both Uganda and Europe.",
    photo: sophie,
    focus: '55% 38%',
    zoom: 1.5,
  },
  {
    name: 'Bayabonga Nhlabatsi',
    role: 'IT Specialist / Web Developer',
    bio: 'An IT professional with a passion for leveraging technology to drive social impact. His commitment to combining tech expertise with meaningful causes fuels his dedication to making a difference through innovation.',
    photo: bayabonga,
    focus: '50% 20%',
  },
  {
    name: 'Mahesh Nanavare',
    role: 'Assistant Web Developer',
    bio: 'I am incredibly glad to use my technology skills to support the community and contribute to a meaningful cause. With a strong background in building easy-to-use digital tools, my focus is on keeping our website welcoming and reliable.',
    photo: mahesh,
    focus: '50% 20%',
  },
];
