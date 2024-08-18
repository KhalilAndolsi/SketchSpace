import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <div className="grid grow place-content-center  px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-zinc-400 dark:text-zinc-200">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-500 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-zinc-500">{`We can't find that page.`}</p>

        <Button className="mt-4">
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
