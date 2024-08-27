"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/inputAnimated";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function CreateWorkspace({ setWorkspaces, user }: any) {
  const [title, setTitle] = useState("");
  const inputRef = useRef<any>(null)
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const response = await fetch("/api/workspace", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({author: user.id, title: title || "Untitled"})
      })
      const data = await response.json();
      if (response.ok && data.success === true) {
        toast.success(data.message)
        setWorkspaces((prev: any) => [data.workspace, ...prev]);
        inputRef.current.value = ""
        setTitle("")
        setIsOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className="shadow-md border border-foreground">
        <DialogHeader>
          <DialogTitle>Create new workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label className="p-1">Workspace Title</Label>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter your title here"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-2 flex items-center justify-end">
            <Button type="submit" disabled={isPending} className="w-[80px]">
              {isPending ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
