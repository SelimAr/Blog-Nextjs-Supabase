import { type User } from "@supabase/supabase-js";

export type CategoryType = {
  id: number;
  category: string;
};

export type CommentsType = {
  id?: number;
  comment: string;
  article_id: string;
  created_at: string;
};

export type LikesType = {
  id?: number;
  like: boolean;
  article_id: string;
  created_at: string;
};

export type SavedType = {
  id?: number;
  saved: boolean;
};

export type NewsType = {
  user?: User | null;
  article_id: string;
  title: string;
  description?: string;
  creator: string;
  link?: string;
  image_url: string;
  pubDate?: string;
  source_name: string;
  source_url?: string;
  source_icon?: string;
  category?: string;
};
