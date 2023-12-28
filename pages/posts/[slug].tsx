import "react";
import { getBlogPostBySlug, getAllSlugs } from "../../blog/butils";
import { BlogPost } from "../../types/types";
import parse from "html-react-parser";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";

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
  const [prose, setProse] = useState<string | JSX.Element | JSX.Element[]>("");

  useEffect(() => {
    if (post) {
      setProse(parse(post.content));
    }
  }, [post]);

  return (
    <div>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.abstract} />
      </Head>
      <style>
        {`
        body {
          background-color: #F7FAFC;
        }
      `}
      </style>
      {post && (
        <div className="flex px-8 pb-8 items-center justify-center">
          <div className="w-[128px] h-[128px] overflow-hidden">
            <Image
              src={"/blog_cartoons/" + post?.cartoon}
              alt={post.slug}
              width={128}
              height={128}
            />
          </div>
        </div>
      )}
      <article className="prose">{prose}</article>
    </div>
  );
}
