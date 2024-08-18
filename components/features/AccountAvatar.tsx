"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function AccountAvatar({ user }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Image
          src={user.pfp}
          width={45}
          height={45}
          alt="pfp"
          className="size-[40px] bg-yellow-400 rounded-full border border-foreground select-none"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="shadow-lg dark:shadow-zinc-400/20">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0"><Link href="/" className="w-full p-1.5">Home</Link></DropdownMenuItem>
        <DropdownMenuItem className="p-0"><Link href="/workspace" className="w-full p-1.5">Workspace</Link></DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between items-center cursor-pointer"
          onClick={() => signOut()}>
          <span>Log Out</span>
          <LogOut size={14} strokeWidth={1.8} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
