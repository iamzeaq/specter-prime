export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  description: string;
  cover_image: string | null;
  gallery: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  created_at: string;
};

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectUpdate = Partial<ProjectInsert>;

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at">;
export type PostUpdate = Partial<PostInsert>;

export type LeadInsert = Omit<Lead, "id" | "created_at">;

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  image: string;
  sort_order: number;
  created_at: string;
};

export type ServiceUpdate = Pick<Service, "title" | "summary" | "body" | "image">;
