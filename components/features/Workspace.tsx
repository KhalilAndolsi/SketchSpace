"use client";
import React, { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/inputAnimated";
import { Button } from "@/components/ui/button";
import { Fullscreen, Grid, Loader, Minimize, Save, Trash } from "lucide-react";
import {
  Excalidraw,
  MainMenu,
  WelcomeScreen,
  Footer,
  Sidebar,
} from "@excalidraw/excalidraw";
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

interface FullScreenElement extends HTMLDivElement {
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface FullScreenDocument extends Document {
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

// function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   wait: number
// ): T {
//   let timeout: NodeJS.Timeout | null = null;
//   return function (this: any, ...args: Parameters<T>) {
//     const context = this;
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(context, args), wait);
//   } as T;
// }

export default function Workspace({ data }: any) {
  const router = useRouter();
  const { resolvedTheme }: any = useTheme();
  const [title, setTitle] = useState(data.title);
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const canvasRef = useRef<FullScreenElement>(null);

  const changeFullScreenState = () => {
    if (canvasRef.current) {
      if (!isFullScreen) {
        // Enter full screen
        if (canvasRef.current.requestFullscreen) {
          canvasRef.current.requestFullscreen();
        } else if (canvasRef.current.mozRequestFullScreen) {
          // Firefox
          (canvasRef.current as any).mozRequestFullScreen();
        } else if (canvasRef.current.webkitRequestFullscreen) {
          // Chrome, Safari, and Opera
          (canvasRef.current as any).webkitRequestFullscreen();
        } else if (canvasRef.current.msRequestFullscreen) {
          // IE/Edge
          (canvasRef.current as any).msRequestFullscreen();
        }
        setIsFullScreen(true);
      } else {
        // Exit full screen
        const fullScreenDoc = document as FullScreenDocument;
        if (fullScreenDoc.exitFullscreen) {
          fullScreenDoc.exitFullscreen();
        } else if (fullScreenDoc.mozCancelFullScreen) {
          fullScreenDoc.mozCancelFullScreen();
        } else if (fullScreenDoc.webkitExitFullscreen) {
          fullScreenDoc.webkitExitFullscreen();
        } else if (fullScreenDoc.msExitFullscreen) {
          fullScreenDoc.msExitFullscreen();
        }
        setIsFullScreen(false);
      }
    }
  };

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

  // Debounced save function
  // const debouncedSave = useCallback(debounce(handleSave, 2000), [handleSave])

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
      <div className="border border-border h-[80vh]" ref={canvasRef}>
        <Excalidraw
          initialData={{ elements: data.elements }}
          theme={resolvedTheme}
          onChange={(excalidrawElements, appState) => {
            setWhiteBoardData(excalidrawElements)
          }}
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
          <Footer>
            <Sidebar.Trigger
              onToggle={changeFullScreenState}
              name="fullscreen"
              tab="fullscreen"
              icon={
                isFullScreen ? <Minimize size={24} /> : <Fullscreen size={24} />
              }
              style={{
                marginLeft: "0.5rem",
                color: "white",
              }}
            />
          </Footer>
        </Excalidraw>
      </div>
    </section>
  );
}
