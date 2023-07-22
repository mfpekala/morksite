import "react";

interface StaticParams {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: StaticParams) {}
