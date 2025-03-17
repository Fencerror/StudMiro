import { Stage, Layer, Rect,  Text}  from "react-konva"
import {useState} from "react"


export default function BoardCanvas() {
  const [rectangles, setRectangles] = useState([
    {id:1, x: 50, y: 50, width:100, height: 50, color: "blue"},
  ]);

  return (
    <Stage width={window.innerWidth} height = {window.innerHeight}>
      <Layer>
      <Text text="Доска StudMiro" fontSize={20} x={10} y={10} />
        {rectangles.map((rect) => (
          <Rect
            key={rect.id}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill={rect.color}
            draggable
          />
        ))}
      </Layer>
    </Stage>
  )
}
