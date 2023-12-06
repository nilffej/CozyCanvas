import Draggable, { DraggableEventHandler } from "react-draggable";
import { forwardRef, useState } from "react";

interface DraggableTemplateProps{
  children: React.ReactNode
  img?: any;
  spawnWidth: number; // Size on grid
  spawnHeight: number;
  displayWidth?: number; // Size of img in sidebar
  onStart?: DraggableEventHandler;
  onStop?: DraggableEventHandler;
}

const DraggableTemplate = forwardRef(function DraggableTemplate(
  { children, img, spawnWidth, spawnHeight, displayWidth, onStart, onStop }: DraggableTemplateProps,
  nodeRef: any
) {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleStart = (e: any, data: any) => {
    setDragging(true);
    if (onStart) onStart(e, data);
  };

  const handleStop = (e: any, data: any) => {
    setDragging(false);
    if (onStop) onStop(e, data);
  };

  return (
    <div
      className="relative hover:cursor-grab"
      style={{
        width: displayWidth,
        height: displayWidth,
      }}
      
    >
      <div
        className="border-solid bg-slate-800 border-slate-100 border-2 absolute top-0 transition-all ease-in duration-200"
        style={{
          width: displayWidth,
          height: displayWidth,
          opacity: dragging ? 0 : 1,
        }}
      >
        {children}
      </div>

      <Draggable
        position={{ x: 0, y: 0 }}
        onStart={handleStart}
        onStop={handleStop}
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className="absolute bg-stone-800 z-20"
          style={{
            opacity: dragging ? 1 : 0,
          }}
        >
          <div
            className="absolute top-0 border-solid bg-stone-800 border-stone-600 border-2 transition-all ease-in-out duration-500"
            style={{
              width: dragging ? spawnWidth : displayWidth,
              height: dragging ? spawnHeight : displayWidth,
            }}
          ></div>
        </div>
      </Draggable>
    </div>
  );
});

export default DraggableTemplate;
