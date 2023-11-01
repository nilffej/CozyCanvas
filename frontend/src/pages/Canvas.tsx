import { Layer, Rect, Shape, Stage } from "react-konva";
import { createRef, forwardRef, useEffect, useRef, useState } from "react";

import { Easings } from "konva/lib/Tween";
import { CanvasDimensions, Furniture } from "../Planner";

interface CanvasProps {
  furniture: Furniture[];
  canvasRefs: any[];
  canvasDims: CanvasDimensions;
}

const Canvas = forwardRef(function Canvas(
  { furniture, canvasRefs, canvasDims }: CanvasProps,
  anchorRef: any
) {
  // =======================
  // CANVAS PARAMS
  // =======================
  const { width, height, gridSize } = canvasDims;
  const cols = height / gridSize;
  const rows = width / gridSize;

  // ****NOTE****
  // Mouse event coords are based on mouse -> need to calculate rect coords
  // Rect Coords are on top left corner

  const onFurnDragEnd = (e: any) => {
    let id = Number(e.target.attrs.id);

    // Size of a furniture square when spawned
    const spawnWidth = furniture[id].width;
    const spawnHeight = furniture[id].height;

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
    } else if (y + spawnHeight > height) {
      y = height - spawnHeight;
    } else {
      let modY = y % gridSize;
      y = y - modY + Math.round(modY / gridSize) * gridSize;
    }

    canvasRefs[id]?.current.to({
      x: x,
      y: y,
      easing: Easings.EaseInOut,
      duration: 0.5,
    });
  };

  // ** DEBUGGING USE** //
  useEffect(() => {
    console.log(furniture);
    console.log(canvasRefs);
    // console.log(mouseCoords);
    // console.log(spawnerCoords);
    // console.log(furniture);
    // console.log(anchorRef?.current?.getBoundingClientRect());
  }, [furniture]);

  // Handling spawning and snapping of a new furniture item
  useEffect(() => {
    if (canvasRefs.length !== 0) {
      let x = furniture[furniture.length - 1].x;
      let y = furniture[furniture.length - 1].y;

      let modX = x % gridSize;
      let modY = y % gridSize;

      x = x - modX + Math.round(modX / gridSize) * gridSize;
      y = y - modY + Math.round(modY / gridSize) * gridSize;

      canvasRefs[canvasRefs.length - 1].current?.to({
        x: x,
        y: y,
        duration: 0.5,
        easing: Easings.EaseInOut,
      });
    }
  }, [canvasRefs, furniture]);

  /* <DraggableTemplate
        onStop={onDragEnd}
        displayWidth={displayWidth}
        spawnWidth={spawnWidth}
        ref={nodeRef}
      /> */

  return (
    <div className="flex flex-row justify-center items-center relative z-0">
      {/* Used to get coords of stage */}
      <div className="absolute top-0 left-0" ref={anchorRef}></div>
      <Stage width={width} height={height}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#e7e5e4"
            shadowBlur={10}
          ></Rect>
          <Shape
            stroke="#d6d3d1"
            strokeWidth={10}
            sceneFunc={(context) => {
              context.lineWidth = 2;
              context.strokeStyle = "#d6d3d1";
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
                ref={canvasRefs[i]}
                onDragEnd={onFurnDragEnd}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
});

export default Canvas;
