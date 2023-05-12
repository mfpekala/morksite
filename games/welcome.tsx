import { useCallback, useEffect, useRef, useState } from "react";

interface BaseShape {
  x: number;
  y: number;
  color: string;
  type: "rect" | "circle";
}

interface Circle extends BaseShape {
  type: "circle";
  radius: number;
}

interface Rect extends BaseShape {
  type: "rect";
  width: number;
  height: number;
}

type Shape = Circle | Rect;

function GameCanvas({ shapes }: { shapes: Shape[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      switch (shape.type) {
        case "rect":
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(
            shape.x + shape.radius / 2,
            shape.y + shape.radius / 2,
            shape.radius / 2,
            0,
            2 * Math.PI
          );
          ctx.fill();
          break;
      }
    });
  }, [shapes]);

  // Listen for resize events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resizeListener = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawFrame();
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Clear the screen
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      switch (shape.type) {
        case "rect":
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(
            shape.x + shape.radius / 2,
            shape.y + shape.radius / 2,
            shape.radius / 2,
            0,
            2 * Math.PI
          );
          ctx.fill();
          break;
      }
    });
  }, [shapes]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute"
      width={canvasRef.current?.width}
      height={canvasRef.current?.height}
    />
  );
}

export default function WelcomeGame() {
  const [shapes, setShapes] = useState<Shape[]>([
    {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      color: "red",
      type: "rect",
    },
    {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      color: "blue",
      type: "rect",
    },
  ]);

  return (
    <div className="w-full h-full z-50 bg-white absolute">
      <GameCanvas shapes={shapes} />
    </div>
  );
}
