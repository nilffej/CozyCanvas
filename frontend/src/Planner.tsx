import { useEffect, useRef, useState } from "react";
import SidePanel from "./components/SidePanel/SidePanel";
import Canvas from "./pages/Canvas";
import { createContext } from "react";
import CanvasSizer from "./components/CanvasSizer";

export interface CanvasContextType {
  furniture: Furniture[];
  setFurniture: any;
  canvasRefs: any[];
  setCanvasRefs: any;
  anchorRef: any;
  canvasDims: CanvasDimensions;
  setCanvasDims: any;
}

export interface CanvasDimensions {
  width: number;
  height: number;
  gridSize: number;
}

export const CanvasContext = createContext<CanvasContextType | undefined>(
  undefined
);

export interface Furniture {
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;
  fill?: string;
  stroke?: string;
}

export interface CanvasProps {
  furniture: Furniture[];
  setFurniture: any;
  canvasRefs: any[];
  setCanvasRefs: any;
  canvasDims: CanvasDimensions;
  setCanvasDims: any;
}

export default function Planner() {
  const [furniture, setFurniture] = useState<Furniture[]>([]);

  const [canvasRefs, setCanvasRefs] = useState<any[]>([]);

  const [canvasDims, setCanvasDims] = useState<CanvasDimensions>({
    width: 500,
    height: 500,
    gridSize: 20,
  });

  // To get coords of stage
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(furniture);
  }, [furniture]);

  return (
    <div className="flex">
      <CanvasContext.Provider
        value={{
          furniture,
          setFurniture,
          canvasRefs,
          setCanvasRefs,
          anchorRef,
          canvasDims,
          setCanvasDims,
        }}
      >
        <SidePanel></SidePanel>
        <div className="flex justify-center relative items-center w-full">
          <CanvasSizer></CanvasSizer>
          <Canvas
            furniture={furniture}
            setFurniture={setFurniture}
            canvasRefs={canvasRefs}
            setCanvasRefs={setCanvasRefs}
            canvasDims={canvasDims}
            setCanvasDims={setCanvasDims}
            ref={anchorRef}
          />
        </div>
      </CanvasContext.Provider>
    </div>
  );
}
