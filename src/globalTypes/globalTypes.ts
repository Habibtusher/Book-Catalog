export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  reviews?: Array<string>;
  addBy: string;
};
