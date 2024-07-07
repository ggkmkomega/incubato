import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { SearchUsers } from "./_search-users";
import { setRole } from "./_actions";
import { Button } from "~/components/ui/button";
import { checkRole } from "~/lib/roles";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import DisplayUsers from "./_display-users";
import Meetings from "./_display-meetings";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const users = query
    ? (await clerkClient.users.getUserList({ query })).data
    : [];

  return (
    <>
      <Tabs defaultValue="Users">
        <TabsList className="grid w-[600px] grid-cols-3  ">
          <TabsTrigger value="Users">Users</TabsTrigger>
          <TabsTrigger value="Private">Private Meetings</TabsTrigger>
          <TabsTrigger value=""> Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="Users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Make changes to your Users here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SearchUsers />
              <DisplayUsers users={users} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Private">
          <Card>
            <CardContent>
              <Meetings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
