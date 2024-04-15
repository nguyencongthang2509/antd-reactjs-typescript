import { IBase } from "./Base.interface";

export interface IBlog extends IBase {
  id?: number;
  title?: string;
  metaDescription?: string;
  content?: string;
  photoURL?: string;
  categoryBlogId?: number;
}
