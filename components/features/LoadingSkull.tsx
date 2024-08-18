import React from "react";

export default function LoadingSkull() {
  return (
    <div className="container mx-auto grow p-0">
      <div className="*:h-[40px] *:rounded-md flex items-center justify-between flex-nowrap gap-2 mb-4 p-2 *:bg-zinc-400/25 *:animate-pulse">
        <div className="flex-1 mr-2" />
        <div className="w-12" />
        <div className="w-12" />
        <div className="w-12" />
      </div>
      <div className="w-full h-[80vh] rounded-md bg-zinc-400/25 animate-pulse" />
    </div>
  );
}
