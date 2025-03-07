import { useRef, useCallback } from "react";

interface UseDraggableOptions {
  boundary?: DOMRect | (() => DOMRect); // Optional boundary constraint
}

export default function useDraggable({ boundary }: UseDraggableOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const element = ref.current;
    if (!element) return;

    // Initial position and mouse coordinates
    const { offsetLeft: initialLeft, offsetTop: initialTop } = element;
    const startX = e.pageX;
    const startY = e.pageY;

    // Get computed styles once
    const styles = window.getComputedStyle(element);
    const marginLeft = parseFloat(styles.marginLeft) || 0;
    const marginTop = parseFloat(styles.marginTop) || 0;

    const drag = (e: MouseEvent) => {
      // Calculate new position
      let newLeft = initialLeft + (e.pageX - startX - marginLeft);
      let newTop = initialTop + (e.pageY - startY - marginTop);

      // Apply boundary constraints if provided
      if (boundary) {
        const bounds = typeof boundary === "function" ? boundary() : boundary;
        const { width, height } = element.getBoundingClientRect();
        newLeft = Math.max(bounds.left, Math.min(newLeft, bounds.right - width));
        newTop = Math.max(bounds.top, Math.min(newTop, bounds.bottom - height));
      }

      // Update position
      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    };

    const mouseUp = () => {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", mouseUp);
  }, [boundary]);

  return { ref, handleMouseDown };
}