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

  const [canvasTitle, setCanvasTitle] = useState<string>("");

  const [canvasDims, setCanvasDims] = useState<CanvasDimensions>({
    width: 600,
    height: 400,
    gridSize: 40,
  });

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showSave, setShowSave] = useState<boolean>(false);

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
          console.log(data);
          const refs = data.furniture.map(() => createRef());

          setCanvasRefs(refs);
          setFurniture(data.furniture);

          setCanvasDims(data.canvasDims);
          setInput(data.canvasDims);

          setCanvasTitle(data.title);
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
          title: canvasTitle,
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
    setShowSave(true);
    console.log(window.location.href);
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
          className="absolute bottom-8 right-8 bg-green-500 text-slate-100 py-1 px-4 z-10 hover:bg-slate-200 hover:text-green-700 transition-all"
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
            value={canvasTitle}
            placeholder="Title"
            name="Title"
            type="text"
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
            onChange={(e) => setCanvasTitle(e.target.value)}
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
          <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col justify-center items-center bg-slate-600 bg-opacity-30">
            <div className="flex flex-col justify-center gap-20 text-lg text-center w-1/2 h-1/2 bg-slate-100 items-center shadow-md shadow-slate-400">
              <span><span className="text-red-700 font-bold">Warning:</span> Furniture items currently on the canvas will be deleted.<br />
                Resize canvas?
              </span>
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
        {showSave && (
          <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col justify-center items-center bg-slate-600 bg-opacity-30">
            <div className="flex flex-col justify-center gap-20 text-lg text-center w-1/2 h-1/2 bg-slate-100 items-center shadow-md shadow-slate-400">
              <div className="text-3xl">Share Link</div>
              <input
                type="text"
                className="w-full text-center mx-2 px-2 py-3"
                value={window.location.href}
              ></input>
              <div className="flex flex-row gap-5">
                <button
                  className="border-2 px-4 py-2 transition-all shadow-md hover:text-slate-700 hover:bg-slate-200 active:bg-slate-300 bg-slate-100 active:shadow-inner"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                >
                  Copy
                </button>
                <button
                  className="border-2 px-4 py-2 transition-all shadow-md hover:text-slate-700 hover:bg-slate-200 active:bg-slate-300 bg-slate-100 active:shadow-inner"
                  onClick={() => {
                    setShowSave(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </CanvasContext.Provider>
    </div>
  );
}
