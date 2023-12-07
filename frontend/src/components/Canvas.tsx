import { Layer, Rect, Shape, Stage } from "react-konva";
import { createRef, forwardRef, useEffect, useRef, useState } from "react";

import { Easings } from "konva/lib/Tween";
import { CanvasDimensions, CanvasProps, Furniture } from "../routes/Planner";
import { Coords } from "./SidePanel/FurnitureItem";
import { findFurnitureAttributes } from "../shared/testdata";

export interface ContextMenuSelect {
  coords: Coords;
  select: number;
  name: string;
}

const Canvas = forwardRef(function Canvas(
  {
    furniture,
    setFurniture,
    canvasRefs,
    setCanvasRefs,
    canvasDims,
    setCanvasDims,
  }: CanvasProps,
  anchorRef: any
) {
  // =======================
  // CANVAS PARAMS
  // =======================
  const { width, height, gridSize } = canvasDims;
  const cols = height / gridSize;
  const rows = width / gridSize;

  // Stage Coordinates
  const stageCoords = anchorRef?.current?.getBoundingClientRect();
  const offsetX = stageCoords?.left;
  const offsetY = stageCoords?.top;

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [contextData, setContextData] = useState<ContextMenuSelect | null>();
  const [furnDetails, setFurnDetails] = useState<any>();

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

    // Move x to bounds if out of bounds
    if (x < 0) {
      x = 0;
    } else if (x + spawnWidth > width) {
      x = width - spawnWidth;
    } else {
      // Else snap to grid
      let modX = x % (gridSize / 2);
      x = x - modX + Math.round(modX / gridSize) * gridSize;
    }

    if (y < 0) {
      y = 0;
    } else if (y + spawnHeight > height) {
      y = height - spawnHeight;
    } else {
      let modY = y % (gridSize / 2);
      y = y - modY + Math.round(modY / gridSize) * gridSize;
    }

    // Transition effects
    canvasRefs[id]?.current.to({
      x: x,
      y: y,
      easing: Easings.EaseInOut,
      duration: 0.5,
    });
  };

  const getId = (e: any): number => {
    return Number(e.target.attrs.id);
  };

  const openContextMenu = (e: any) => {
    e.evt.preventDefault();
    setShowMenu(true);
    setContextData({
      coords: {
        x: e.evt.clientX,
        y: e.evt.clientY,
      },
      select: getId(e),
      name: furniture[getId(e)].name,
    });
    setFurnDetails(findFurnitureAttributes(furniture[getId(e)].name));
  };

  // ** DEBUGGING USE** //
  useEffect(() => {
    // console.log(furniture);
    // console.log(canvasRefs);
    // console.log(mouseCoords);
    // console.log(spawnerCoords);
    // console.log(furniture);
    // console.log(anchorRef?.current?.getBoundingClientRect());
    console.log(contextData);
  }, [contextData]);

  // Handling spawning and snapping of a new furniture item
  useEffect(() => {
    if (canvasRefs.length !== 0) {
      if (
        furniture[furniture.length - 1].x % (gridSize / 2) == 0 &&
        furniture[furniture.length - 1].y % (gridSize / 2) == 0
      ) {
        return;
      }

      let x = furniture[furniture.length - 1].x;
      let y = furniture[furniture.length - 1].y;

      let modX = x % (gridSize / 2);
      let modY = y % (gridSize / 2);

      x = x - modX + (Math.round(modX / gridSize / 2) * gridSize) / 2;
      y = y - modY + (Math.round(modY / gridSize / 2) * gridSize) / 2;

      canvasRefs[canvasRefs.length - 1].current?.to({
        x: x,
        y: y,
        duration: 0.5,
        easing: Easings.EaseInOut,
      });

      // **** Not sure if I need to update refs as well ****

      // This updates furniture if it changes
      setTimeout(() => {
        let newFurn = [...furniture];
        newFurn[furniture.length - 1] = {
          ...furniture[furniture.length - 1],
          x: x,
          y: y,
        };
        setFurniture(newFurn);
      }, 600);

    }
  }, [canvasRefs, furniture]);


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
                onContextMenu={openContextMenu}
                ref={canvasRefs[i]}
                onDragEnd={onFurnDragEnd}
              />
            );
          })}
        </Layer>
      </Stage>
      <div
        className="transition-all"
        style={{
          opacity: showMenu ? 1 : 0,
        }}
      >
        {showMenu && contextData && (
          <div
            className="absolute bg-stone-200 w-fit h-fit shadow-lg border-stone-300 border-2"
            style={{
              left: contextData.coords.x - offsetX,
              top: contextData.coords.y - offsetY,
            }}
            onMouseLeave={() => {
              setShowMenu(false);
            }}
          >
            <div className="flex w-full h-min bg-stone-100 p-4">
              <img className="h-16 w-16" src={furnDetails.imgSrc} alt="" />
              <div className="flex-col ml-4">
                <div className="font-bold">{furnDetails.name}</div>
                <div className="text-sm">
                  {furnDetails.x} x {furnDetails.y}
                </div>
                <div className="text-sm text-emerald-600">${furnDetails.price}</div>
              </div>
            </div>
            <button onClick={() => {
              const id = contextData.select
              setShowMenu(false);
              let dupe = [...furniture]
              dupe.splice(id, 1);
              setFurniture(dupe);
              let refs = [...canvasRefs]
              refs.splice(id, 1);
              setCanvasRefs(refs);
            }}
              className="my-2 mx-3 py-1 px-3 bg-red-700 text-sm text-slate-100 transition-all hover:text-red-900 hover:bg-slate-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Canvas;
