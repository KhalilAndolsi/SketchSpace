"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/inputAnimated";
import { Button } from "../ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [info, setInfo] = useState<any>({
    username: "",
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: info.username,
          email: info.email,
          password: info.password,
        }),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) {
        return toast.warning(data.message || "Failed to register!");
      }
      toast.success(data.message);
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
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to register!");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90vw] md:w-[450px] p-2 rounded-md border">
      <h4 className="py-5 text-lg font-semibold text-center">
        Create New Account
      </h4>
      <Label htmlFor="username" className="px-1.5">
        Username
      </Label>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder="example@gmail.com"
        required
        onChange={handleChange}
        disabled={isPending}
      />
      <br />
      <Label htmlFor="email" className="px-1.5">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        type="text"
        placeholder="example@gmail.com"
        required
        onChange={handleChange}
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
        required
        onChange={handleChange}
        disabled={isPending}
      />
      <br />
      <Button variant="default" className="w-full" disabled={isPending}>
        {isPending ? <Loader size={14} className="animate-spin" /> : "Register"}
      </Button>
      <p className="text-xs p-1">
        already you have account,{" "}
        <Link href="sign-in" className="font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
}
