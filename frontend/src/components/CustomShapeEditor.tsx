import { Circle, Layer, Rect, Shape, Stage } from "react-konva";
import { Coords } from "./SidePanel/FurnitureItem";
import { createRef, useState } from "react";
import { Easings } from "konva/lib/Tween";
import { create } from "domain";

const gridSize = 20;
const width = 600;
const height = 800;
const rows = width / gridSize;
const cols = height / gridSize;

const defaultPoints: Coords[] = [
  { x: 100, y: 100 },
  { x: 100, y: 700 },
  { x: 500, y: 700 },
  { x: 500, y: 100 },
];

export default function CustomShapeEditor({}) {
  const [points, setPoints] = useState<Coords[]>(defaultPoints);
  const [pointRefs, setPointRefs] = useState<any[]>([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);
  const [boundingPoints, setBoundingPoints] = useState<Coords[]>(defaultPoints);

  const onDrag = (e: any) => {
    let id = Number(e.target.attrs.id);

    // Relevant to stage
    let x = e.target.attrs.x;
    let y = e.target.attrs.y;

    let pointsDupe = [...points];
    pointsDupe[id] = { x: x, y: y };
    setPoints(pointsDupe);

    const minCoords: Coords = pointsDupe.reduce((min, obj) => {
      let minX = obj.x < min.x ? obj.x : min.x;
      let minY = obj.y < min.y ? obj.y : min.y;
      return { x: minX, y: minY };
    });
    const maxCoords: Coords = pointsDupe.reduce((min, obj) => {
      let maxX = obj.x > min.x ? obj.x : min.x;
      let maxY = obj.y > min.y ? obj.y : min.y;
      return { x: maxX, y: maxY };
    });

    setBoundingPoints([
      { x: minCoords.x, y: minCoords.y },
      { x: maxCoords.x, y: minCoords.y },
      { x: maxCoords.x, y: maxCoords.y },
      { x: minCoords.x, y: maxCoords.y },
    ]);
  };

  const onDragEnd = (e: any) => {
    let id = Number(e.target.attrs.id);

    // These coords are relevant to stage
    let x = e.target.attrs.x;
    let y = e.target.attrs.y;

    // Move x to bounds if out of bounds
    if (x < 0) {
      x = 0;
    } else if (x > width) {
      x = width;
    } else {
      // Else snap to grid
      let modX = x % (gridSize / 2);
      x = x - modX + Math.round(modX / gridSize) * gridSize;
    }

    if (y < 0) {
      y = 0;
    } else if (y > height) {
      y = height;
    } else {
      let modY = y % (gridSize / 2);
      y = y - modY + Math.round(modY / gridSize) * gridSize;
    }

    // Transition effects
    pointRefs[id]?.current.to({
      x: x,
      y: y,
      easing: Easings.EaseInOut,
      duration: 0.5,
    });

    let pointsDupe = [...points];
    pointsDupe[id] = { x: x, y: y };
    setPoints(pointsDupe);

    const minCoords: Coords = pointsDupe.reduce((min, obj) => {
        let minX = obj.x < min.x ? obj.x : min.x;
        let minY = obj.y < min.y ? obj.y : min.y;
        return { x: minX, y: minY };
      });
      const maxCoords: Coords = pointsDupe.reduce((min, obj) => {
        let maxX = obj.x > min.x ? obj.x : min.x;
        let maxY = obj.y > min.y ? obj.y : min.y;
        return { x: maxX, y: maxY };
      });
  
      setBoundingPoints([
        { x: minCoords.x, y: minCoords.y },
        { x: maxCoords.x, y: minCoords.y },
        { x: maxCoords.x, y: maxCoords.y },
        { x: minCoords.x, y: maxCoords.y },
      ]);
  };



  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Stage width={width} height={height}>
        {/* Grid Layer */}
        <Layer>
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#1e293b"
            shadowBlur={10}
          ></Rect>
          <Shape
            stroke="#334155"
            strokeWidth={10}
            sceneFunc={(context) => {
              context.lineWidth = 2;
              context.strokeStyle = "#334155";
              context.beginPath();
              let i = 0;
              for (i = 0; i <= rows; i++) {
                context.moveTo(gridSize * i, 0);
                context.lineTo(gridSize * i, height);
                context.stroke();
              }
              for (i = 0; i <= cols; i++) {
                context.moveTo(0, gridSize * i);
                context.lineTo(width, gridSize * i);
                context.stroke();
              }
              context.closePath();
            }}
          />
        </Layer>
        {/* Bounding Box Layer */}
        <Layer>
          <Shape
            fill="#0f172a"
            opacity={0.75}
            sceneFunc={(context, shape) => {
              context.lineWidth = 2;
              context.beginPath();
              context.moveTo(boundingPoints[0].x, boundingPoints[0].y);
              for (let i = 1; i < boundingPoints.length; i++) {
                context.lineTo(boundingPoints[i].x, boundingPoints[i].y);
              }
              context.closePath();
              context.fillStrokeShape(shape);
            }}
          />
        </Layer>
        {/* Shape Layer */}
        <Layer>
          <Shape
            fill="#334155"
            strokeWidth={2}
            stroke={"#0f172a"}
            sceneFunc={(context, shape) => {
              context.lineWidth = 2;
              context.beginPath();
              context.moveTo(points[0].x, points[0].y);
              for (let i = 1; i < points.length; i++) {
                context.lineTo(points[i].x, points[i].y);
              }
              context.closePath();
              context.fillStrokeShape(shape);
            }}
          />
        </Layer>
        {/* Points Layer */}
        <Layer>
          {points.map((coords: Coords, i: number) => {
            return (
              <Circle
                key={i}
                id={`${i}`}
                ref={pointRefs[i]}
                {...coords}
                fill="#64748b"
                draggable
                width={20}
                height={20}
                onDragMove={onDrag}
                onDragEnd={onDragEnd}
              ></Circle>
            );
          })}
        </Layer>
      </Stage>
      <button onClick={() => {
        fetch("/canvas/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
          body: JSON.stringify(points),
        }).then((response) => {
          console.log(response);
        })

      }}>
        Save
      </button>
    </div>
  );
}
