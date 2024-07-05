import React from "react";
import { Button } from "~/components/ui/button";
import { setRole } from "./_actions";
import { User } from "@clerk/nextjs/server";
interface DisplayUserProps {
  users: User[];
}

const DisplayUsers = ({ users }: DisplayUserProps) => {
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default DisplayUsers;
