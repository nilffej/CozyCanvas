import { useEffect, useState, useRef } from "react";
import { Layer, Stage, Shape, Rect } from "react-konva";


interface Furniture {
    x: number,
    y: number, 
    width: number,
    height: number,
    draggable: boolean, 
    fill: string,
    stroke: string,
}

export default function Canvas({}) {
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const width = 600;
  const height = 800;
  const cols = 5;
  const rows = 5;

  const spawnWidth = 200;
  const dragRef = useRef(null);

  const dragFurniture = (e: any) => {
    console.log(e);

    const newRect: Furniture = {
        x: e.evt.clientX-100,
        y: e.evt.clientY-100, 
        width: 200,
        height: 200, 
        draggable: true,
        fill: '#475569',
        stroke: '#64748b',
    }

    setFurniture([...furniture, newRect]);
  };

  useEffect(() => {
    console.log(dragRef);
  },[dragRef, furniture])


  return (
    <div>
      <Stage
        width={width + spawnWidth}
        height={height}
        style={{
          display: "flex",
          width: "fit-content",
        }}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#0f172a"
            shadowBlur={10}
          ></Rect>
          <Shape
            stroke="#1e293b"
            strokeWidth={10}
            sceneFunc={(context) => {
              context.lineWidth = 4;
              context.strokeStyle = "#1e293b";
              context.beginPath();
              for (var i = 0; i <= rows; i++) {
                context.moveTo((width / cols) * i, 0);
                context.lineTo((width / cols) * i, height);
                context.stroke();
              }
              for (var i = 0; i <= cols; i++) {
                context.moveTo(0, (height / rows) * i);
                context.lineTo(width, (height / rows) * i);
                context.stroke();
              }

              context.closePath();
            }}
          />
        </Layer>
        <Layer>
          <Rect
            x={width}
            fill="#475569"
            width={200}
            height={200}
            shadowBlur={10}
            stroke="#64748b"
            onMouseDown={dragFurniture}
          ></Rect>
          {furniture.map((furn, i) => (<Rect key={i} {...furn} ref={dragRef}/>))}
        </Layer>
      </Stage>
      <div
        style={{
          borderRadius: "50%",
          backgroundColor: "green",
          width: "20px",
          height: "20px",
        }}
      ></div>
    </div>
  );
}
