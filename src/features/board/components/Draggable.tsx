import { useEffect, useRef } from "react";

export interface DraggableProps {
  children?: React.ReactNode;
  onDragStart: (e: DragEvent) => void;
}

export default function Draggable(props: DraggableProps) {
  const { children, onDragStart } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elRef = ref.current;
    elRef.addEventListener("dragstart", onDragStart);

    return () => {
      elRef.removeEventListener("dragstart", onDragStart);
    };
  }, [onDragStart, ref]);

  return (
    <div ref={ref} draggable>
      {children}
    </div>
  );
}
