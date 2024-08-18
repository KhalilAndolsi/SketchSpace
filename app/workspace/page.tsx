import Workspaces from "@/components/features/Workspaces";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const getData = async (id: any) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${id}`);
  const data = await response.json();
  return data;
};

export default async function WorkSpacesPage() {
  const session: any = await getServerSession(authOptions);
  const data = await getData(session.user.id);
  return (
    <section className="grow container mx-auto">
      <h1 className="p-2 font-semibold text-lg">WorkSapce</h1>
      <Workspaces data={data.info.workspaces} user={session.user} />
    </section>
  );
}
