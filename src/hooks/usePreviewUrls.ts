import { useEffect, useMemo } from "react";

export function usePreviewUrls(files?: File[] | null) {
  const previewUrls = useMemo(() => {
    if (!files || files.length === 0) return [];
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  return previewUrls;
}
