import React from "react";
import { api } from "~/trpc/server";

const Home = async () => {
  const post = await api.post.maybe();
  const postss = await api.post.hello({ text: "world" });
  return (
    <section className="flex size-full flex-col gap-10 ">
      <h1 className="text-3xl font-bold">Home</h1>
      {post && <div>{post}</div>}
      {postss && <div>{postss.greeting}</div>}
    </section>
  );
};

export default Home;
