import Draggable, { DraggableEventHandler } from "react-draggable";
import { forwardRef, useState } from "react";

interface DraggableTemplateProps {
  img?: any;
  spawnWidth: number; // Size on grid
  displayWidth?: number; // Size of img in sidebar
  onStart?: DraggableEventHandler;
  onStop?: DraggableEventHandler;
}

const DraggableTemplate = forwardRef(function DraggableTemplate(
  { img, spawnWidth, displayWidth, onStart, onStop }: DraggableTemplateProps,
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
      className="relative"
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
      ></div>

      <Draggable
        position={{ x: 0, y: 0 }}
        onStart={handleStart}
        onStop={handleStop}
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className="absolute bg-slate-700 z-20"
          style={{
            opacity: dragging ? 1 : 0,
          }}
        >
          <div
            className="absolute top-0 border-solid bg-slate-800 border-slate-100 border-2 transition-all ease-in-out duration-500"
            style={{
              width: dragging ? spawnWidth : displayWidth,
              height: dragging ? spawnWidth : displayWidth,
            }}
          ></div>
        </div>
      </Draggable>
    </div>
  );
});

export default DraggableTemplate;
