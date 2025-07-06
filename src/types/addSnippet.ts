interface Tag {
  id: number;
  name: string;
}

export type Snippet = {
  id: number | string;
  title: string;
  language: string;
  code: string;
  AIInsights: string;
  optimiseCode: string;
  tags: Tag[];
  optimisationRequired: boolean;
};
