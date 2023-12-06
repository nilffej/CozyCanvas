import { createRef, useEffect, useRef, useState } from "react";
import SidePanel from "../components/SidePanel/SidePanel";
import Canvas from "../components/Canvas";
import { createContext } from "react";
import CanvasSizer from "../components/CanvasSizer";
import { useNavigate, useParams } from "react-router-dom";

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
  name: string;
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

  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [input, setInput] = useState<CanvasDimensions>(canvasDims);

  // To get coords of stage
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    console.log(furniture);

    if (id) {
      fetch(`http://localhost:8000/canvas/${id}`, {
        method: "GET",
      }).then((response) => {
        return response.json()
      }).then((data) => {
        setFurniture(data.furniture);
        const refs = data.furniture.map(() => createRef());
        setCanvasRefs(refs);
      }).catch((error) => {
        console.log(error);
      })
    }
  }, []);

  const handleSave = () => {
    fetch("http://localhost:8000/canvas", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          title: "",
          canvasDims: canvasDims,
          furniture: furniture
        }
      ]),
    }).then((response) => {
      return response.json()
    }).then((data) => {
      const redirectURL = data[0];
      navigate(redirectURL);
    }).catch((error) => {
      console.log(error);
    })
  }

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
          <CanvasSizer
            input={input}
            setShowConfirm={setShowConfirm}
            setInput={setInput}
          ></CanvasSizer>
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
        {showConfirm && (
          <div className="absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-center items-center bg-slate-600 bg-opacity-30">
            <div className="text-lg">
              Note: Furniture items currently on canvas will be deleted. Is that
              okay?
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setCanvasDims(input);
                  setFurniture([]);
                  setCanvasRefs([]);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setInput(canvasDims);
                }}
              >
                No
              </button>
            </div>
          </div>
        )}
      </CanvasContext.Provider>
    </div>
  );
}
