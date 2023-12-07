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
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCanvasDims(data.canvasDims);
          const refs = data.furniture.map(() => createRef());
          console.log(refs);
          setCanvasRefs(refs);
          setFurniture(data.furniture);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleSave = () => {
    fetch("http://localhost:8000/canvas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          title: "",
          canvasDims: canvasDims,
          furniture: furniture,
        },
      ]),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const redirectURL = data[0];
        navigate(redirectURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <button
          className="absolute bottom-8 right-8 bg-green-500 text-slate-100 py-1 px-4 z-20 hover:bg-slate-200 hover:text-green-700 transition-all"
          onClick={handleSave}
        >
          Save
        </button>
        <div className="flex flex-col gap-5 justify-center relative items-center w-full">
          <CanvasSizer
            input={input}
            setShowConfirm={setShowConfirm}
            setInput={setInput}
          ></CanvasSizer>
          <input
            placeholder="Title"
            name="Title"
            className="bg-transparent focus:outline-none text-center
          text-3xl
          transition-all outline-none
          placeholder-neutral-500
          placeholder-opacity-50
          border-b-2
          border-transparent
          hover:border-slate-400
          focus:border-b-2
          focus:border-slate-800
          py-1
          font-semibold
          tracking-widest
        "
            onChange={() => {}}
          ></input>
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
            <div className="flex flex-col justify-center gap-20 text-lg text-center w-1/2 h-1/2 bg-slate-100 items-center shadow-md shadow-slate-400">
              Note: Furniture items currently on canvas will be deleted. Is that
              okay?
              <div className="flex gap-20 text-md">
                <button
                className="px-10 py-3 bg-green-500 text-slate-100 hover:bg-slate-200 hover:text-green-700 transition-all"
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
                className="px-10 py-3 bg-red-700 text-slate-100 transition-all hover:text-red-900 hover:bg-slate-300"
                  onClick={() => {
                    setShowConfirm(false);
                    setInput(canvasDims);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </CanvasContext.Provider>
    </div>
  );
}
