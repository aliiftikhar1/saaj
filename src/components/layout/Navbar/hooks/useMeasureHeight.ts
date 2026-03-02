import { RefObject, useLayoutEffect, useState } from "react";

/*

    This hook has been created to solve the issue of having smooth transitions from different navbar heights.
        - We know that css is not able to apply transitions to height: auto, so we need to measure the height 
            of the element and apply it as a fixed height value.
        - This hook uses ResizeObserver to measure the height of the element and update it whenever it changes.
        - By using useLayoutEffect, we ensure that the height is measured before the browser paints the screen, 
            preventing any visual glitches.

*/

export function useMeasureHeight({
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const updateHeight = () => setHeight(el.scrollHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return height;
}
