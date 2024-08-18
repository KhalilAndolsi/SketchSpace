"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/inputAnimated";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [info, setInfo] = useState<any>({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setInfo((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const result: any = await signIn("credentials", {
        redirect: false,
        email: info.email,
        password: info.password,
      });
      if (!result.error) {
        toast.success(`Welcome to the SketchSpace 👋`);
        router.replace("/workspace");
        router.refresh();
      } else {
        toast.error("Failed to sign in!");
      }
    } catch (error) {
      toast.error("Failed to sign in!");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90vw] md:w-[450px] p-2 rounded-md border">
      <h4 className="py-5 text-lg font-semibold text-center">
        Welcome to SketchSpace 👋
      </h4>
      <Label htmlFor="email" className="px-1.5">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        type="text"
        placeholder="example@gmail.com"
        onChange={handleChange}
        required
        disabled={isPending}
      />
      <br />
      <Label htmlFor="password" className="px-1.5">
        Password
      </Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        onChange={handleChange}
        required
        disabled={isPending}
      />
      <br />
      <Button variant="default" className="w-full" disabled={isPending}>
        {isPending ? <Loader size={14} className="animate-spin" /> : "Login"}
      </Button>
      <p className="text-xs p-1">
        {"if you don't have account,"}
        <Link href="sign-up" className="font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
