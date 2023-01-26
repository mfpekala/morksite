import { getAllPostIds, getPostById } from "../../lib/posts";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { newPost } from "../../workshop/newPost";

export default function Post() {
  const post = newPost;
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.meta} />
      </Head>
      <ReactMarkdown>{post.markdown}</ReactMarkdown>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostById(params.id);
  return {
    props: postData,
  };
}
