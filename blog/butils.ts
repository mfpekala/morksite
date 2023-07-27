import { Database } from "sqlite3";
import { BlogPost } from "../types/types";

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const db = new Database("blog/meta.db");
  const row = await new Promise<any>((resolve, reject) => {
    db.get("SELECT * FROM posts WHERE slug = ?", [slug], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
  const clean = (row: any): BlogPost | null => {
    if (!row) {
      return null;
    }
    return {
      slug: row.slug,
      title: row.title,
      abstract: row.abstract,
      cartoon: row.cartoon,
      date: row.date,
      content: JSON.parse(row.content),
    };
  };
  return row;
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  const db = new Database("blog/meta.db");
  const rows = await new Promise<{ slug: string }[]>((resolve, reject) => {
    db.all("SELECT slug FROM posts", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as { slug: string }[]);
      }
    });
  });
  return rows;
}
