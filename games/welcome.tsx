import { useCallback, useEffect, useRef, useState } from "react";

interface Vec2 {
  x: number;
  y: number;
}

interface BaseShape {
  pos: Vec2;
  vel: Vec2;
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

interface Player {
  shape: Shape;
  canJump: boolean;
}

interface Input {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

function InputController() {
  const inputRef = useRef<Input>({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          inputRef.current.up = true;
          break;
        case "ArrowDown":
        case "s":
          inputRef.current.down = true;
          break;
        case "ArrowLeft":
        case "a":
          inputRef.current.left = true;
          break;
        case "ArrowRight":
        case "d":
          inputRef.current.right = true;
          break;
      }
    };
    const keyUpListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          inputRef.current.up = false;
          break;
        case "ArrowDown":
        case "s":
          inputRef.current.down = false;
          break;
        case "ArrowLeft":
        case "a":
          inputRef.current.left = false;
          break;
        case "ArrowRight":
        case "d":
          inputRef.current.right = false;
          break;
      }
    };
    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);
    return () => {
      window.removeEventListener("keydown", keyDownListener);
      window.removeEventListener("keyup", keyUpListener);
    };
  }, []);

  return inputRef;
}

export default function WelcomeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Player>({
    shape: {
      pos: {
        x: 0,
        y: 0,
      },
      vel: {
        x: 0,
        y: 0,
      },
      radius: 10,
      color: "blue",
      type: "circle",
    },
    canJump: false,
  });

  const inputRef = InputController();

  // Listen for resize events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.clientWidth / 10;
    canvas.height = canvas.clientHeight / 10;
    const resizeListener = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawFrame();
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  const handleInput = useCallback(() => {
    const player = playerRef.current;
    const input = inputRef.current;
    if (input.up && player.canJump) {
      player.shape.vel.y = -10;
      player.canJump = false;
    }
    if (input.left) {
      player.shape.vel.x = -5;
    }
    if (input.right) {
      player.shape.vel.x = 5;
    }
  }, []);

  const doUpdate = useCallback(() => {
    handleInput();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const player = playerRef.current;
    player.shape.pos.x += player.shape.vel.x;
    player.shape.pos.y += player.shape.vel.y;
    // Gravity
    player.shape.vel.y += 0.5;
    // Floor
    if (player.shape.pos.y > canvas.height) {
      player.shape.pos.y = canvas.height;
      player.shape.vel.y = 0;
      player.canJump = true;
    }
  }, [handleInput]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const shapes = [];
    shapes.push(playerRef.current.shape);

    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      switch (shape.type) {
        case "rect":
          ctx.fillRect(shape.pos.x, shape.pos.y, shape.width, shape.height);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(
            shape.pos.x + shape.radius / 2,
            shape.pos.y + shape.radius / 2,
            shape.radius / 2,
            0,
            2 * Math.PI
          );
          ctx.fill();
          break;
      }
    });
  }, []);

  const gameLoop = useCallback(() => {
    doUpdate();
    drawFrame();
  }, [doUpdate, drawFrame]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 1000 / 60);
    return () => clearInterval(interval);
  }, [gameLoop]);

  return (
    <div className="w-full h-full z-50 bg-white absolute">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute"
        width={canvasRef.current?.width}
        height={canvasRef.current?.height}
      />
    </div>
  );
}
