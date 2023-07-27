import "react";
import { getBlogPostBySlug, getAllSlugs } from "../../blog/butils";
import { BlogPost } from "../../types/types";

interface StaticParams {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: StaticParams) {
  const post = await getBlogPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
  return {
    paths: slugs.map((slug) => ({ params: slug })),
    fallback: false,
  };
}

export default function Post({ post }: { post: BlogPost | null }) {
  return <div>Post</div>;
}
