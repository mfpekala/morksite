import Head from "next/head";
import { getAllSlugs, getBlogPostBySlug } from "../blog/butils";
import useGoTo from "../hooks/useGoTo";
import { BlogPost } from "../types/types";
import Image from "next/image";

interface StaticProps {
  props: {
    posts: BlogPost[];
  };
}

export async function getStaticProps(): Promise<StaticProps> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(
    slugs.map((prop) => getBlogPostBySlug(prop.slug))
  );
  // Filter out nulls
  return {
    props: { posts: posts.filter((post) => post !== null) as BlogPost[] },
  };
}

export default function Posts({ posts }: { posts: BlogPost[] }) {
  const goTo = useGoTo();

  return (
    <div>
      <Head>
        <title>Mark&apos;s Thoughts</title>
        <meta name="description" content="Most of these takes suck" />
      </Head>
      {posts.map((post, ix) => {
        return (
          <div
            key={post.slug}
            className="clickable-outline flex w-full justify-between"
            onClick={goTo("posts/" + post.slug)}
          >
            <div>
              <p className="font-bold text-2xl">{post.title}</p>
              <p className="mt-1">{post.date}</p>
              <p>{post.abstract}</p>
            </div>
            <div className="overflow-hidden w-[128px] h-[128px]">
              <Image
                src={"/blog_cartoons/" + post.cartoon}
                alt={post.title}
                width={128}
                height={128}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
