import { prisma } from "./index";

export async function getAllPostIds() {
  const res = await prisma.post.findMany();
  const result = res.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    };
  });
  return result;
}

export async function getPostById(id: string) {
  const res = await prisma.post.findFirst({ where: { id: parseInt(id) } });
  return res;
}
