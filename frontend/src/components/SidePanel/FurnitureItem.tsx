import { useContext, useEffect, useRef } from "react";
import { FurnitureDetails } from "../../shared/types";
import { CanvasContext, CanvasContextType } from "../../routes/Planner";
import { createRef } from "react";
import { Furniture } from "../../routes/Planner";
import DraggableTemplate from "../DraggableTemplate";

const FurnitureItemStyles = {
  borderTop: 1,
  borderStyle: "solid",
  borderColor: "#e5e5e5",
};

interface FurnitureItemProps {
  details: FurnitureDetails;
}

export interface Coords {
  x: number;
  y: number;
}

const FurnitureItem = ({ details }: FurnitureItemProps) => {
  const { name, x, y, price, imgSrc } = details;

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const canvasState = useContext<CanvasContextType | undefined>(CanvasContext);

  // ** DEBUGGING USE** //
  useEffect(() => {
    // console.log(nodeRef);
    // console.log(x, y);
    // console.log(canvasState?.canvasDims.gridSize);
  });

  if (!canvasState) {
    return null;
  }
  const {
    furniture,
    setFurniture,
    canvasRefs,
    setCanvasRefs,
    anchorRef,
    canvasDims,
    setCanvasDims,
  } = canvasState;

  const width = canvasDims.width;
  const height = canvasDims.height;

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
      dragEndCoords.x + x > width ||
      dragEndCoords.y + y > height ||
      dragEndCoords.x < 0 ||
      dragEndCoords.y < 0
    ) {
      return;
    }

    // Might need to adjust spawn coords if we edit dimensions of the Canvas
    const newRect: Furniture = {
      x: dragEndCoords.x,
      y: dragEndCoords.y,
      width: x * canvasDims.gridSize,
      height: y * canvasDims.gridSize,
      draggable: true,
      fill: "#292524",
      stroke: "#52525b",
    };

    setFurniture([...furniture, newRect]);
    setCanvasRefs([...canvasRefs, createRef()]);
  };

  return (
    <div
      style={FurnitureItemStyles}
      className="flex w-full h-min bg-stone-100 p-4"
    >
      <DraggableTemplate
        ref={nodeRef}
        displayWidth={64}
        img={imgSrc}
        spawnWidth={x * canvasDims.gridSize}
        spawnHeight={y * canvasDims.gridSize}
        onStop={onDragEnd}
      >
        <img className="h-16 w-16" src={imgSrc} alt="" />
      </DraggableTemplate>
      <div className="flex-col ml-4">
        <div className="font-bold">{name}</div>
        <div className="text-sm">
          {x} x {y}
        </div>
        <div className="text-sm text-emerald-600">${price}</div>
      </div>
    </div>
  );
};

export default FurnitureItem;
