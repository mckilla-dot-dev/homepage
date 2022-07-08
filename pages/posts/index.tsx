import fs from "fs";
import { join } from "path";
import { Fragment } from "react";
import { Flex, Container, Heading, HStack } from "@chakra-ui/react";
import { BasicLayout } from "layouts";
import { CardPost, LinkGitHub } from "components";

import type { NextPage } from "next";
import type { Post } from "types";

interface Props {
  posts: Post[];
}

const Posts: NextPage<Props> = ({ posts }) => (
  <BasicLayout
    meta={{
      title: "ENDEVRS | Posts",
      description:
        "A list of articles on various web development topics including SaaS, NextJS, and Typescript.",
      cardImage: "/images/logo-black.png",
    }}
  >
    <Flex mt={20} p={{ base: 0, sm: 8 }} flex={1} direction="column">
      <LinkGitHub path="posts/index.tsx" />
      <Container maxW="container.lg">
        <Heading
          fontSize={{ base: "3xl", sm: "5xl" }}
          mb={{ base: 0, sm: 5 }}
          textAlign={{
            base: "center",
            sm: "left",
          }}
        >
          {"Featured Posts"}
        </Heading>

        <HStack justify={{ base: "center", sm: "left" }}>
          {posts?.map((post: Post, idx) => (
            <Fragment key={`${idx}-${post.slug}`}>
              <CardPost {...post} />
            </Fragment>
          ))}
        </HStack>
      </Container>
    </Flex>
  </BasicLayout>
);

export async function getStaticProps() {
  const postsDirectory = join(process.cwd(), "pages/posts");
  const postsList = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    postsList
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const postModule = await import(`./${filename}`);
        return {
          slug: filename.replace(".mdx", ""),
          meta: postModule.meta,
        };
      })
  );

  return {
    props: { posts },
  };
}

export default Posts;
