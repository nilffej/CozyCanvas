import { useEffect, useState, useRef, createRef } from "react";
import DraggableTemplate from "./DraggableTemplate";
import { Layer, Stage, Shape, Rect } from "react-konva";
import { Easings } from "konva/lib/Tween";

import "./index.css";

interface Furniture {
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;
  fill?: string;
  stroke?: string;
}

interface Coords {
  x: number;
  y: number;
}

// =======================
// CANVAS PARAMS
// =======================

const gridSize = 20;
const width = 600;
const height = 800;
const cols = height / gridSize;
const rows = width / gridSize;

export default function Canvas() {
  const [furniture, setFurniture] = useState<Furniture[]>([]);

  const [refs, setRefs] = useState<any[]>([]);

  // To avoid DOM Errors, attach to Draggable component
  const nodeRef = useRef<HTMLDivElement | null>(null);

  // To get coords of stage
  const anchorRef = useRef<HTMLDivElement | null>(null);

  // Size of a furniture square in sidebar
  const displayWidth = 40;

  // Size of a furniture square when spawned
  const spawnWidth = 300;

  // ****NOTE****
  // Mouse event coords are based on mouse -> need to calculate rect coords
  // Rect Coords are on top left corner

  const onFurnDragEnd = (e: any) => {
    let id = Number(e.target.attrs.id);

    // These coords are relevant to stage
    let x = e.target.attrs.x;
    let y = e.target.attrs.y;

    if (x < 0) {
      x = 0;
    } else if (x + spawnWidth > width) {
      x = width - spawnWidth;
    } else {
      let modX = x % gridSize;
      x = x - modX + Math.round(modX / gridSize) * gridSize;
    }

    if (y < 0) {
      y = 0;
    } else if (y + spawnWidth > height) {
      y = height - spawnWidth;
    } else {
      let modY = y % gridSize;
      y = y - modY + Math.round(modY / gridSize) * gridSize;
    }

    refs[id]?.current.to({
      x: x,
      y: y,
      easing: Easings.EaseInOut,
      duration: 0.5,
    });
  };


  const onDragEnd = (e: any, data: any) => {

    // Get spawnerCoords relevant to page after dropping
    const spawnerCoords = nodeRef?.current?.getBoundingClientRect();
    const spawnX = spawnerCoords?.left;
    const spawnY = spawnerCoords?.top;

    // Get stageCoords relevant to page
    const stageCoords = anchorRef?.current?.getBoundingClientRect();
    const offsetX = stageCoords?.left;
    const offsetY = stageCoords?.top;

    // Before subtracting offset, coords are relative to the page
    // Need to subtract offset to get coords relevant to the stage
    let dragEndCoords: Coords = {
      x: (spawnX || 0) - (offsetX || 0),
      y: (spawnY || 0) - (offsetY || 0),
    };

    // If box limits are out of bounds of canvas, then don't make anything
    if (
      dragEndCoords.x + spawnWidth > width ||
      dragEndCoords.y + spawnWidth > height
    ) {
      return;
    }

    // Might need to adjust spawn coords if we edit dimensions of the Canvas
    const newRect: Furniture = {
      x: dragEndCoords.x,
      y: dragEndCoords.y,
      width: spawnWidth,
      height: spawnWidth,
      draggable: true,
      fill: "#1e293b",
      stroke: "#64748b",
    };

    setFurniture([...furniture, newRect]);
    setRefs([...refs, createRef()]);
  };

  // ** DEBUGGING USE** //
  useEffect(() => {
    // console.log(furniture);
    // console.log(refs);
    // console.log(mouseCoords);
    // console.log(spawnerCoords);
    // console.log(furniture);
  }, [furniture]);

  useEffect(() => {
    console.log(anchorRef?.current?.getBoundingClientRect());
  }, []);

  // Handling spawning and snapping of a new furniture item
  useEffect(() => {
    if (refs.length !== 0) {
      let x = furniture[furniture.length - 1].x;
      let y = furniture[furniture.length - 1].y;

      let modX = x % gridSize;
      let modY = y % gridSize;

      x = x - modX + Math.round(modX / gridSize) * gridSize;
      y = y - modY + Math.round(modY / gridSize) * gridSize;

      refs[refs.length - 1].current?.to({
        x: x,
        y: y,
        duration: 0.5,
        easing: Easings.EaseInOut,
      });
    }
  }, [refs, furniture]);

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <DraggableTemplate onStop={onDragEnd} displayWidth={displayWidth} spawnWidth={spawnWidth} ref={nodeRef}/>
      <div className="flex flex-row justify-center items-center relative">
        {/* Used to get coords of stage */}
        <div className="absolute top-0 left-0" ref={anchorRef}></div>
        <Stage width={width} height={height} className="z-10">
          <Layer>
            <Rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill="#0f172a"
              shadowBlur={10}
            ></Rect>
            <Shape
              stroke="#1e293b"
              strokeWidth={10}
              sceneFunc={(context) => {
                context.lineWidth = 4;
                context.strokeStyle = "#1e293b";
                context.beginPath();
                let i = 0;
                for (i = 0; i <= rows; i++) {
                  context.moveTo(gridSize * i, 0);
                  context.lineTo(gridSize * i, height);
                  context.stroke();
                }
                for (i = 0; i <= cols; i++) {
                  context.moveTo(0, gridSize * i);
                  context.lineTo(width, gridSize * i);
                  context.stroke();
                }

                context.closePath();
              }}
            />
          </Layer>
          <Layer>
            {/* Spawn Layer */}
            {furniture.map((furn: Furniture, i: number) => {
              return (
                <Rect
                  key={i}
                  id={`${i}`}
                  {...furn}
                  ref={refs[i]}
                  onDragEnd={onFurnDragEnd}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
