export interface Blog {
  title: string;
  date: string;
  claps: number;
  tags: string[];
  link: string;
  isExternal?: boolean;
}

export const blogsData: Blog[] = [];
