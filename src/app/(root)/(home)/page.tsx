"use client";
import React from "react";
import { api } from "~/trpc/react";

const Home = () => {
  const post = api.post.maybe.useQuery();
  const postss = api.post.hello.useQuery({ text: "world" });
  return (
    <section className="flex size-full flex-col gap-10 ">
      <h1 className="text-3xl font-bold">Home</h1>
      {post.data && <div>{post.data}</div>}
      {postss.data && <div>{postss.data.greeting}</div>}
    </section>
  );
};

export default Home;
