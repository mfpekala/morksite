import "react";
import { getBlogPostBySlug, getAllSlugs } from "../../blog/butils";
import { BlogPost } from "../../types/types";
import parse from "html-react-parser";
import Image from "next/image";

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
  return (
    <div>
      <style>
        {`
        body {
          background-color: #F7FAFC;
        }
      `}
      </style>
      {post && (
        <div className="flex px-8 pb-8 items-center justify-center">
          <Image
            src={"/blog_cartoons/" + post?.cartoon}
            alt={post.slug}
            width={500}
            height={500}
          />
        </div>
      )}
      <article className="prose">{parse(post?.content || "")}</article>
    </div>
  );
}
