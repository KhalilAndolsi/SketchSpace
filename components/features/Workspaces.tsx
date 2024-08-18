'use client'
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/inputAnimated";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import CreateWorkspace from "@/components/features/CreateWorkspace";

export default function Workspaces({ data, user }: any) {
  const [workspaces, setWorkspaces] = useState<any>(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  // Filter and sort workspaces based on search term and sort type
  const filteredWorkspaces = workspaces
    .filter((ws: any) =>
      ws.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: any, b: any) => {
      switch (sortType) {
        case "new":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "old":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "last updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="grow w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select onValueChange={(value) => setSortType(value)}>
          <SelectTrigger className="w-[180px] bg-gray-50 dark:bg-zinc-800 grow md:grow-0">
            <SelectValue placeholder="Select The Sort Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="old">Old</SelectItem>
              <SelectItem value="last updated">Last updated</SelectItem>
              <SelectItem value="a-z">A to Z</SelectItem>
              <SelectItem value="z-a">Z to A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <CreateWorkspace setWorkspaces={setWorkspaces} user={user} />
      </div>
      <hr className="my-5" />
      {!!filteredWorkspaces.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredWorkspaces.map((ws: any) => (
            <Link
              href={`/workspace/${ws._id}`}
              key={ws._id}
              className="p-4 border rounded-md text-center truncate hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {ws.title}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-zinc-500">Your list is empty</p>
      )}
    </>
  );
}
