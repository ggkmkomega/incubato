"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Mail } from "../data";
import { MailList } from "./mail-list";
import { MailDisplay } from "./mail-display";
import { useMail } from "../use-mail";
import { allMeetingsOutput } from "~/types";

interface MailProps {
  mails: allMeetingsOutput;
}

export function Mail({ mails }: MailProps) {
  const [mail] = useMail();

  return (
    <div className="flex gap-5">
      <div>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Private Meetings</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                All Meetings
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" className="m-0">
            <MailList items={mails} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={mails.filter((item) => !item.urgency)} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full">
        <MailDisplay
          mail={
            mails.find((item) => item.id.toString() === mail.selected) || null
          }
        />
      </div>
    </div>
  );
}
