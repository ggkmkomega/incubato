import React from "react";
import { Mail } from "./components/mail";
import { accounts, mails } from "./data";
import { cookies } from "next/headers";
const Meetings = () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <Mail
      accounts={accounts}
      mails={mails}
      defaultLayout={defaultLayout}
      defaultCollapsed={true}
      navCollapsedSize={defaultCollapsed}
    />
  );
};

export default Meetings;
