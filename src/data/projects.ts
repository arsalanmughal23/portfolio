export type ProjectType = {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: Array<string>;
  link: string;
  previewImage: string;
  featured: boolean;
};

export const PROJECTS = [
  {
    id: 1,
    title: "Enterprise Core Backend & Database Handler",
    category: "Backend Engineering",
    description: "Engineered high-throughput relational database schemas, customized middleware token validation, and ultra-low latency REST endpoints handling heavy concurrent transactions.",
    tech: ["PHP OOP", "MySQL", "Redis", "REST API"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Automated Data Sync & Telemetry Dashboard",
    category: "Full-Stack System",
    description: "Built asynchronous event-driven worker scripts with structured modular architecture, secure payload encryption, and clean responsive monitoring interfaces.",
    tech: ["Node.js", "Python", "Tailwind CSS", "WebSockets"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "Cloud Microservices Orchestrator",
    category: "Infrastructure",
    description: "Designed containerized deployment pipelines, automated error recovery frameworks, and resilient server-side state synchronization mechanisms.",
    tech: ["Docker", "Linux", "Git", "Bash Scripting"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 4,
    title: "High-Frequency Payment Gateway Service",
    category: "Fintech Backend",
    description: "Developed resilient transaction ledgering systems with strict ACID compliance and webhook retry queues.",
    tech: ["Node.js", "PostgreSQL", "Docker", "Redis"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "Real-time Telemetry Analytics Engine",
    category: "Data Pipeline",
    description: "Ingested and parsed gigabytes of telemetry logs per second using optimized stream processing scripts.",
    tech: ["Python", "ClickHouse", "WebSockets", "Kafka"],
    link: "https://github.com",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
] satisfies Array<ProjectType>;
