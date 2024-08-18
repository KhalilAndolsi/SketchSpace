import React from "react";
import { Button } from "../ui/button";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AccountAvatar from "./AccountAvatar";

export default async function Header() {
  const session: any = await getServerSession<any>(authOptions);
  return (
    <header className="p-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        <Link href="/" className="group flex">
          S
          <p className="max-w-0 group-hover:max-w-80 opacity-5 group-hover:opacity-100 overflow-hidden transition-all duration-500">
            ketch
          </p>
          S
          <p className="max-w-0 group-hover:max-w-80 opacity-5 group-hover:opacity-100 overflow-hidden transition-all duration-500 delay-200">
            pace
          </p>
        </Link>
      </h1>
      <nav className="flex items-center gap-3">
        {session !== null ? (
          <AccountAvatar user={session.user} />
        ) : (
          <>
            <Button
              variant="outline"
              className="font-semibold hidden md:inline">
              <Link href="sign-up">Sign Up</Link>
            </Button>
            <Button variant="default" className="font-semibold">
              <Link href="sign-in">Log In</Link>
            </Button>
          </>
        )}
        <span className="w-0.5 h-6 bg-foreground/20" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
