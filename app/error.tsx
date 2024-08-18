"use client";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div className="grid grow place-content-center  px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-zinc-400 dark:text-zinc-200">
          500
        </h1>

        <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-500 sm:text-4xl">
          Ooops!
        </p>

        <p className="mt-4 text-zinc-500">
          Something went wrong! please add your feedback{" "}
          <a href={`${process.env.NEXT_PUBLIC_GIT_REPO}/issues`} target="_blank">here</a>
        </p>

        <Button className="mt-4" onClick={reset}>
          Try Again!
        </Button>
      </div>
    </div>
  );
}
