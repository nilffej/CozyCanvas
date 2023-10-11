import { useEffect, useState, useRef, createRef } from "react";
import Draggable from "react-draggable";
import { Layer, Stage, Shape, Rect } from "react-konva";

interface Furniture {
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;
  fill: string;
  stroke: string;
}

interface Coords {
  x: number;
  y: number;
}

const width = 600;
const height = 800;
const cols = 5;
const rows = 5;

export default function Canvas({}) {
  const [furniture, setFurniture] = useState<Furniture[]>([]);

  const [refs, setRefs] = useState<any[]>([]);

  // MouseCoords relative to Canvas
  const [mouseCoords, setMouseCoords] = useState<Coords>({ x: 0, y: 0 });

  // Spawner Original Coords for mind check
  const [spawnerCoords, setSpawnerCoords] = useState<Coords>({x: 0, y: 0});
  const spawnerRef = useRef(null);

  const spawnWidth = 200;

  // const spawnFurniture = (e: any) => {
  //   setMouseCoords({
  //     x: e.evt.clientX - 100,
  //     y: e.evt.clientY - 100,
  //   });

  //   const newRect: Furniture = {
  //     x: e.evt.clientX - 100,
  //     y: e.evt.clientY - 100,
  //     width: 200,
  //     height: 200,
  //     draggable: true,
  //     fill: "#1e293b",
  //     stroke: "#64748b",
  //   };

  //   setFurniture([...furniture, newRect]);
  //   setRefs([...refs, createRef()]);
  // };


  const onFurnDragEnd = (e: any) => {
    console.log(e)

    let id = Number(e.target.attrs.id)
    console.log(refs[id])


    // Client Coords are based on mouse
    // Rect Coords are on top left corner

    let x = e.evt.clientX - 100;
    let y = e.evt.clientY - 100;

    x = x - (x % 20);
    y = y - (y % 20);
    
    refs[id]?.current.to({x: x, y: y})

    console.log(x, y);
}


  const onDragEnd = (e:any, data:any) => {
    // console.log(e, data);

    // If out of bounds of canvas, then don't make anything
    if (e.screenX > 800|| e.screenY > 800 ){
      return;
    }
    
    // Might need to adjust spawn coords if we edit dimensions of the Canvas
    const newRect: Furniture = {
      x: e.pageX - 100,
      y: e.pageY - 100,
      width: 200,
      height: 200,
      draggable: true,
      fill: "#1e293b",
      stroke: "#64748b",
    };

    setFurniture([...furniture, newRect]);
    setRefs([...refs, createRef()]);
  }

  useEffect(() => {
    // console.log(furniture);
    // console.log(refs);
    // console.log(mouseCoords);
    // console.log(spawnerCoords);
    // console.log(furniture);
  }, [furniture]);


  return (
    <div style={{display: "flex", flexDirection: "row"}}>
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
          {/* Spawn Layer */}
          {furniture.map((furn: Furniture, i: number) => {
            return <Rect id={`${i}`} {...furn} ref={refs[i]} onDragEnd={onFurnDragEnd}/>
          })}
        </Layer>
      </Stage>
      <Draggable
        position={{x: 0, y: 0}}
        onStop={onDragEnd}
      >
        <div
          style={{
            border: '2px solid #64748b',
            backgroundColor: "#1e293b",
            width: 200,
            height: 200,
          }}
        ></div>
      </Draggable>
    </div>
  );
}
