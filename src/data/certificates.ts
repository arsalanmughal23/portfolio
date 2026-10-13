export type CertificateType = {
  id: number;
  year: string;
  title: string;
  issuer: string;
  credentialId: string;
  link: string;
  featured: boolean;
  previewImage?: string;
};

export const CERTIFICATES = [
  {
    id: 1,
    year: "2025",
    title: "Google AI & Cloud Essentials",
    issuer: "Google Cloud",
    credentialId: "GC-AI-8921-X",
    link: "https://cloud.google.com",
    featured: true,
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    year: "2024",
    title: "Microsoft Technical Fundamentals",
    issuer: "Microsoft",
    credentialId: "MS-TECH-5542",
    link: "https://microsoft.com",
    featured: true,
  },
  {
    id: 3,
    year: "2023",
    title: "Advanced Object-Oriented Programming & Systems",
    issuer: "Professional Certification",
    credentialId: "OOP-PHP-9021",
    link: "#",
    featured: true,
  },
  {
    id: 4,
    year: "2022",
    title: "GitHub Milestone & Ecosystem Achiever",
    issuer: "GitHub",
    credentialId: "GH-PR-QUICKDRAW",
    link: "https://github.com",
    featured: true,
  },
  {
    id: 5,
    year: "2024",
    title: "Microsoft Technical Fundamentals",
    issuer: "Microsoft",
    credentialId: "MS-TECH-5542",
    link: "https://microsoft.com",
    featured: false,
  },
  {
    id: 6,
    year: "2023",
    title: "Advanced Object-Oriented Programming & Systems",
    issuer: "Professional Certification",
    credentialId: "OOP-PHP-9021",
    link: "#",
    featured: false,
  },
  {
    id: 7,
    year: "2022",
    title: "GitHub Milestone & Ecosystem Achiever",
    issuer: "GitHub",
    credentialId: "GH-PR-QUICKDRAW",
    link: "https://github.com",
    featured: false,
  },
  {
    id: 8,
    year: "2022",
    title: "GitHub Milestone & Ecosystem Achiever",
    issuer: "GitHub",
    credentialId: "GH-PR-QUICKDRAW",
    link: "https://github.com",
    featured: false,
  },
] satisfies Array<CertificateType>;
