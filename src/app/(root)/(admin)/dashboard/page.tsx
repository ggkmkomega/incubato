import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "~/lib/roles";
import { SearchUsers } from "./_search-users";
import { setRole } from "./_actions";
import { Button } from "~/components/ui/button";

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
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the &apos;admin&apos; role.</p>

      <SearchUsers />

      {users.map((user) => {
        return (
          <div key={user.id} className="p-4">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId,
                )?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as string}</div>
            <div className="flex flex-row gap-2 pt-2  ">
              <div>
                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <Button type="submit">Make Admin</Button>
                </form>
              </div>
              <div>
                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="moderator" name="role" />
                  <Button variant={"outline"} type="submit">
                    Make Moderator
                  </Button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
