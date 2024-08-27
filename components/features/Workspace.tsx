"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/inputAnimated";
import { Button } from "@/components/ui/button";
import { Grid, Loader, Save, Trash } from "lucide-react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Workspace({ data }: any) {
  const router = useRouter();
  const { resolvedTheme }: any = useTheme();
  const [title, setTitle] = useState(data.title);
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     console.log(event)
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const handleSave = async () => {
    try {
      setIsSaved(true);
      const response = await fetch(`/api/workspace/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Untitled",
          elements: whiteBoardData,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaved(false);
    }
  };
  const handleDelete = async () => {
    try {
      setIsDeleted(true);
      const response = await fetch(`/api/workspace/${data._id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        router.replace("/workspace");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleted(false);
      setIsOpen(false);
    }
  };
  return (
    <section className="container mx-auto grow p-0">
      <div className="flex items-center justify-between flex-nowrap gap-4 mb-4 p-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
          />
        </div>
        <div className="space-x-2">
          {/* ======================================================== Delete ======================================================== */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={isDeleted}
                title="delete"
                className="border-2 border-red-500 bg-red-500 text-white hover:bg-red-200 hover:text-red-500">
                {isDeleted ? (
                  <Loader
                    size={16}
                    strokeWidth={2.5}
                    className="animate-spin"
                  />
                ) : (
                  <Trash size={16} strokeWidth={2.5} />
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="shadow-md border border-foreground">
              <DialogHeader>
                <DialogTitle>Delelte the workspace</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this workspace?</p>
              <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="outline" className="px-3 py-1.5">
                    No
                  </Button>
                </DialogClose>
                <Button
                  variant="default"
                  className="px-3 py-1.5"
                  onClick={handleDelete}>
                  Yes!
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* ======================================================== Delete ======================================================== */}
          <Button
            onClick={handleSave}
            disabled={isSaved}
            title="save"
            className="border-2 border-green-500 bg-green-500 text-white hover:bg-green-200 hover:text-green-500">
            {isSaved ? (
              <Loader size={16} strokeWidth={2.5} className="animate-spin" />
            ) : (
              <Save size={16} strokeWidth={2.5} />
            )}
          </Button>
          <Button
            onClick={() => setIsGrid((prev) => !prev)}
            title="grid"
            className="border-2 border-blue-500 bg-blue-500 text-white hover:bg-blue-200 hover:text-blue-500">
            <Grid size={16} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
      <div className="border border-border h-[80vh]">
        <Excalidraw
          initialData={{ elements: data.elements }}
          theme={resolvedTheme}
          onChange={(excalidrawElements, appState) =>
            setWhiteBoardData(excalidrawElements)
          }
          gridModeEnabled={isGrid}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}>
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      </div>
    </section>
  );
}
