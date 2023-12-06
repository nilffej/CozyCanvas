import { useContext } from "react";
import { CanvasContext, CanvasContextType, CanvasDimensions } from "../Planner";

export interface CanvasSizerProps{
  setShowConfirm: any,
  setInput: any,
  input: CanvasDimensions
};

export default function CanvasSizer({setShowConfirm, setInput, input}: CanvasSizerProps) {
  const canvasState = useContext<CanvasContextType | undefined>(CanvasContext);
  const canvasDims = canvasState?.canvasDims;
  const inputStyle = "tex";

  return (
    <div className="flex flex-row gap-5 pt-3 justify-center absolute top-0 left-0 w-full h-fit">
      <input
        placeholder="Width"
        type="text"
        id="width"
        className="text-lg"
        defaultValue={canvasDims?.width}
        onChange={(e) => {setInput({
          ...input,
          width: Number(e.target.value),
        })}}
      ></input>
      <input
        placeholder="Height"
        type="text"
        id="height"
        className="text-lg"
        defaultValue={canvasDims?.height}
        onChange={(e) => {setInput({
          ...input,
          height: Number(e.target.value),
        })}}
      ></input>
      <input
        placeholder="Grid Size"
        type="text"
        id="gridSize"
        className="text-lg"
        defaultValue={canvasDims?.gridSize}
        onChange={(e) => {setInput({
          ...input,
          gridSize: Number(e.target.value),
        })}}
      ></input>
      <button onClick={() => {setShowConfirm(true)}}>Save</button>
    </div>
  );
}
