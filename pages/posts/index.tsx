import { Fragment } from "react";
import { Flex, Container, Heading, HStack } from "@chakra-ui/react";
import { Layout, CardPost } from "components";
import { getAllPosts } from "lib";

import type { NextPage } from "next";
import type { Post } from "types";

interface Props {
  posts: Post[];
}

const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <Layout
      title="ENDEVRS | Posts"
      description="A list of articles on various web development topics including SaaS, NextJS, and Typescript."
    >
      <Flex mt={20} flex={1} direction="column">
        <Container maxW="container.lg">
          <Heading fontSize={{ base: "3xl", lg: "5xl" }} mb={5}>
            Posts
          </Heading>

          <HStack>
            {posts?.map((post: Post, idx) => (
              <Fragment key={`${idx}-${post.slug}`}>
                <CardPost {...post} />
              </Fragment>
            ))}
          </HStack>
        </Container>
      </Flex>
    </Layout>
  );
};

export default Posts;

export async function getStaticProps() {
  const posts = getAllPosts([
    "title",
    "series",
    "tags",
    "excerpt",
    "image",
    "date",
    "readTime",
    "slug",
  ]);

  return {
    props: { posts },
  };
}
