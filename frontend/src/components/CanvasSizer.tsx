import { CanvasDimensions } from "../routes/Planner";

export interface CanvasSizerProps {
  setShowConfirm: any,
  setInput: any,
  input: CanvasDimensions
};

export default function CanvasSizer({ setShowConfirm, setInput, input }: CanvasSizerProps) {
  return (
    <div className="flex flex-row gap-5 pt-3 justify-center absolute top-0 left-0 w-full h-fit">
      <div className="flex flex-col">
        <input
          placeholder="Width"
          type="number"
          id="width"
          className="text-md text-center bg-transparent border-b-2 border-slate-200 focus:border-slate-800 outline-none hover:border-b-3 hover:border-slate-400 transition-all"
          value={input.width}
          onChange={(e) => {
            setInput({
              ...input,
              width: Number(e.target.value),
            })
          }}
        ></input>
        <label
          className="text-center text-md"
          htmlFor="width"
        >
          Width
        </label>

      </div>

      <div className="flex flex-col">
        <input
          placeholder="Height"
          type="number"
          id="height"
          className="text-md text-center bg-transparent border-b-2 border-slate-200 focus:border-slate-800 outline-none hover:border-b-3 hover:border-slate-400 transition-all"
          value={input.height}
          onChange={(e) => {
            setInput({
              ...input,
              height: Number(e.target.value),
            })
          }}
        ></input>
        <label
          className="text-center text-md"
          htmlFor="height"
        >
          Height
        </label>

      </div>

      <div className="flex flex-col">
        <input
          placeholder="Grid Size"
          type="number"
          id="gridSize"
          className="text-md text-center bg-transparent border-b-2 border-slate-200 focus:border-slate-800 outline-none hover:border-b-3 hover:border-slate-400 transition-all"
          value={input.gridSize}
          onChange={(e) => {
            setInput({
              ...input,
              gridSize: Number(e.target.value),
            })
          }}
        ></input>
        <label
          className="text-center text-md"
          htmlFor="gridSize"
        >
          Grid Size
        </label>

      </div>

      <button className="bg-green-500 text-slate-100 py-1 px-4 z-10 hover:bg-slate-200 hover:text-green-700 transition-all" onClick={() => { setShowConfirm(true) }}>Resize</button>
    </div>
  );
}
