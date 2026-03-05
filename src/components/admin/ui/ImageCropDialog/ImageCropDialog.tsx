"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

type ImageCropDialogProps = {
  open: boolean;
  imageSrc: string | null;
  /**
   * width/height ratio — omit (or pass undefined) for free-form crop with
   * draggable corners. Pass e.g. 3/4 to lock to portrait.
   */
  aspect?: number;
  fileName?: string;
  onClose: () => void;
  onCrop: (file: File) => void;
};

export function ImageCropDialog({
  open,
  imageSrc,
  aspect,
  fileName,
  onClose,
  onCrop,
}: ImageCropDialogProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialise Cropper.js whenever the dialog opens with a new image
  useEffect(() => {
    if (!open || !imageSrc) return;

    // Wait one tick for the img element to render before attaching Cropper.js
    const id = setTimeout(() => {
      if (!imageRef.current) return;

      cropperRef.current?.destroy();

      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: aspect ?? NaN, // NaN = free / no fixed ratio
        viewMode: 1,                // keep crop box inside the canvas
        guides: true,               // 3×3 grid lines in crop box
        center: true,               // centre indicator
        highlight: false,
        background: true,
        autoCropArea: 0.85,
        cropBoxMovable: true,
        cropBoxResizable: true,     // ← drag any corner to resize
        toggleDragModeOnDblclick: false,
        dragMode: "move",           // drag image to pan; use handles to resize
        modal: true,
        responsive: true,
        restore: false,
        checkOrientation: true,
        minCropBoxWidth: 10,
        minCropBoxHeight: 10,
      });
    }, 50);

    return () => {
      clearTimeout(id);
      cropperRef.current?.destroy();
      cropperRef.current = null;
    };
  }, [open, imageSrc, aspect]);

  const handleConfirm = useCallback(async () => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    setIsProcessing(true);
    try {
      const canvas = cropper.getCroppedCanvas({
        maxWidth: 1920,
        maxHeight: 1920,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      });

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob: Blob | null) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            const file = new File([blob], fileName ?? "cropped.jpg", {
              type: "image/jpeg",
            });
            onCrop(file);
            onClose();
            resolve();
          },
          "image/jpeg",
          0.92,
        );
      });
    } catch {
      // silent — crop failures degrade gracefully
    } finally {
      setIsProcessing(false);
    }
  }, [fileName, onCrop, onClose]);

  if (!open || !imageSrc) return null;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/80" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[100] flex flex-col bg-neutral-950 outline-none"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            Crop Image
          </DialogPrimitive.Title>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 shrink-0">
            <span className="text-white font-medium text-sm">
              Crop Image — drag corners to resize · drag image to pan · scroll to zoom
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors cursor-pointer p-1"
              aria-label="Close"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Cropper area */}
          <div className="relative flex-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop preview"
              style={{ display: "block", maxWidth: "100%" }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Footer */}
          <div className="bg-neutral-900 px-4 py-4 flex gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isProcessing}
              className="flex-1 py-2 rounded text-sm bg-white text-black font-medium hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? "Applying…" : "Apply Crop"}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
