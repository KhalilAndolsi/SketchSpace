import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import LoadingSkull from "@/components/features/LoadingSkull";

const Workspace = dynamic(() => import("@/components/features/Workspace"), {
  ssr: false,
  loading: () => <LoadingSkull/>,
});

const getData = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/workspace/${id}`,
    { cache: "no-store" }
  );
  const { workspace } = await response.json();
  return workspace;
};

export default async function WorkspacePage({
  params,
}: {
  params: { id: string };
}) {
  const workspace = await getData(params.id);
  const session: any = await getServerSession(authOptions);
  if (!workspace || workspace.author !== session.user.id) {
    notFound();
  }
  return <Workspace data={workspace} />;
}

/* 
  {
    message: 'Workspace "test 1" exist',
    workspace: {
      _id: '66bef67083102b99c0f6850f',
      author: '66bdad93c6ba035958f39b8e',
      title: 'test 1',
      elements: [],
      createdAt: '2024-08-16T06:49:20.841Z',
      updatedAt: '2024-08-16T06:49:20.841Z',
      __v: 0
    },
    success: false
  }
*/
