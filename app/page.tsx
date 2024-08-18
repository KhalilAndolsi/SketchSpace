import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center grow *:text-center">
      <h2 className="text-5xl lg:text-7xl font-extrabold mb-2">WhiteBoard</h2>
      <p className="text-lg lg:text-4xl text-zinc-400 mb-1">
        No Limits Files, Organizer, Simple and Easy
      </p>
      <Image
        src="/images/Create-rafiki.svg"
        width={600}
        height={500}
        alt="Landing-page-image"
        className="w-full sm:w-[350px] h-auto"
      />
      <Button variant="secondary" className=" px-6">
        <Link href="/workspace" className="flex items-center gap-1.5">
          Start Now
          <Image
            src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfa/1/32/2728.png"
            width={25}
            height={25}
            alt="beri9"
            className="size-4"
          />
        </Link>
      </Button>
    </section>
  );
}
