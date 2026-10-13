type RoleType = string;
type SkillType = string;

type ProjectType = {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: Array<string>;
  link: string;
  previewImage: string;
  featured: boolean;
};

type CertificateType = {
  id: number;
  year: string;
  title: string;
  issuer: string;
  credentialId: string;
  link: string;
  featured: boolean;
  previewImage?: string;
};

export type { RoleType, SkillType, ProjectType, CertificateType };
