interface Tag {
  id: number;
  name: string;
}

export type Snippet = {
  id: number | string;
  title: string;
  language: string;
  code: string;
  dateCreated: string;
  AIInsights: string;
  optimiseCode: string;
  isFav: boolean;
  tags: Tag[];
  optimisationRequired: boolean;
};
