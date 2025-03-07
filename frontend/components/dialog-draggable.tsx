"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDraggable from "@/hooks/useDraggable";

export default function DialogDraggable({
  triggerTitle,
  title,
  action,
  children,
}: {
  triggerTitle: string;
  title: string;
  action: () => void;
  children: React.ReactNode;
}) {
  const { ref, handleMouseDown } = useDraggable();

  return (
    <Dialog modal={true}>
      <DialogTrigger>{triggerTitle}</DialogTrigger>
      <DialogContent ref={ref} className="cursor-move">
        <DialogHeader onMouseDown={handleMouseDown}>
          <DialogTitle className="self-center">{title}</DialogTitle>
        </DialogHeader>
        <hr />
        <form action={action}>{children}</form>
      </DialogContent>
    </Dialog>
  );
}
