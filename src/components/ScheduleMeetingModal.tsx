"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Icons } from "./icons";
import { Switch } from "./ui/switch";
interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const PrivateMeetingSchema = z.object({
  name: z.string().min(5).max(20),
  lastname: z.string().min(5).max(20),
  Idea: z.string().min(3).max(30),
  category: z.enum(["Discussing", "Consulting", "Inquiry"]),
  Subject: z.string().min(50).max(250),
  urgency: z.boolean(),
});

const ScheduleMeetingModal = ({
  isOpen,
  onClose,
}: ScheduleMeetingModalProps) => {
  const auth = useUser();
  const form = useForm<z.infer<typeof PrivateMeetingSchema>>({
    resolver: zodResolver(PrivateMeetingSchema),
    defaultValues: {
      name: auth.user?.firstName ?? "",
      lastname: auth.user?.lastName ?? "",
    },
  });
  function onSubmit(values: z.infer<typeof PrivateMeetingSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values", values);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule A Private Meeting</DialogTitle>
          <DialogDescription className="pt-2">
            Fill Out the form to help us better understand the purpose of the
            meet
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-row gap-2 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="Idea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>The Name of Your Idea</FormLabel>
                  <FormControl>
                    <Input placeholder="Dz Incubato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="items-start [&_[data-description]]:hidden">
                        <SelectValue placeholder="Select a Category for Your meet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Discussing">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Icons.GeneralMeet className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Startup{" "}
                              <span className="font-medium text-foreground">
                                12:75
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              General Purpose Meet about the 12:75 binder
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Consulting">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Icons.One className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Startup{" "}
                              <span className="font-medium text-foreground">
                                Consulting
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Consulting The Plans for your own startup
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="Inquiry">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Icons.thesis className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Startup{" "}
                              <span className="font-medium text-foreground">
                                Thesis
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              An Inquiry for your Master or Liscence Thesis.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between gap-1 rounded-lg border p-4">
                  <div className="space-y-1">
                    <FormLabel className="text-base">Urgent Meeting</FormLabel>
                    <FormDescription>
                      Flag the Meeting as urgent, get faster Response at a cost.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject of the meet:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about what u want to discuss"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetingModal;
