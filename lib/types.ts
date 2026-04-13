export type Category = {
  id: number;
  name: string;
  icon: string;
};

export type Scheme = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  eligibility: string;
  benefits: string;
  documents: string;
  applicationProcess: string;
  categoryId: number;
  category: Category;
  views: number;
  createdAt: string;
};

export type SchemePayload = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  eligibility: string;
  benefits: string;
  documents: string;
  applicationProcess: string;
  categoryId: number;
};
