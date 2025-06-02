import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import { useState, useRef, SetStateAction } from "react";

interface BoardCanvasProps {
  selectedTool: "select" | "rectangle" | "circle" | "text";
}

export default function BoardCanvas({ selectedTool }: BoardCanvasProps) {
  const [rectangles, setRectangles] = useState<{ id: number; x: number; y: number; width: number; height: number }[]>([]);
  const [circles, setCircles] = useState<{ id: number; x: number; y: number; radius: number }[]>([]);
  const [texts, setTexts] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [newRect, setNewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [newCircle, setNewCircle] = useState<{ x: number; y: number; radius: number } | null>(null);
  const [selectionRect, setSelectionRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const stageRef = useRef<any>(null);

  // Начинаем рисование или выделение
  const handleMouseDown = () => {
    if (drawing) return;
    setDrawing(true);

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (selectedTool === "rectangle") {
      setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
    } else if (selectedTool === "circle") {
      setNewCircle({ x: pos.x, y: pos.y, radius: 0 });
    } else if (selectedTool === "select") {
      setSelectionRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
    }
  };

  // Изменяем размер фигуры или рамки выделения
  const handleMouseMove = () => {
    if (!drawing) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (selectedTool === "rectangle" && newRect) {
      setNewRect({
        x: newRect.x,
        y: newRect.y,
        width: pos.x - newRect.x,
        height: pos.y - newRect.y,
      });
    } else if (selectedTool === "circle" && newCircle) {
      const radius = Math.sqrt(Math.pow(pos.x - newCircle.x, 2) + Math.pow(pos.y - newCircle.y, 2));
      setNewCircle({
        x: newCircle.x,
        y: newCircle.y,
        radius,
      });
    } else if (selectedTool === "select" && selectionRect) {
      setSelectionRect({
        x: selectionRect.x,
        y: selectionRect.y,
        width: pos.x - selectionRect.x,
        height: pos.y - selectionRect.y,
      });
    }
  };

  // Завершаем рисование или выделение
  const handleMouseUp = () => {
    if (!drawing) return;
    setDrawing(false);

    if (selectedTool === "rectangle" && newRect) {
      setRectangles([...rectangles, { id: rectangles.length + 1, ...newRect }]);
      setNewRect(null);
    } else if (selectedTool === "circle" && newCircle) {
      setCircles([...circles, { id: circles.length + 1, ...newCircle }]);
      setNewCircle(null);
    } else if (selectedTool === "select" && selectionRect) {
      const selected: SetStateAction<number[]> = [];
      const selectionBox = {
        x1: selectionRect.x,
        y1: selectionRect.y,
        x2: selectionRect.x + selectionRect.width,
        y2: selectionRect.y + selectionRect.height,
      };

      rectangles.forEach((rect) => {
        if (
          rect.x >= selectionBox.x1 &&
          rect.y >= selectionBox.y1 &&
          rect.x + rect.width <= selectionBox.x2 &&
          rect.y + rect.height <= selectionBox.y2
        ) {
          selected.push(rect.id);
        }
      });

      circles.forEach((circle) => {
        if (
          circle.x - circle.radius >= selectionBox.x1 &&
          circle.y - circle.radius >= selectionBox.y1 &&
          circle.x + circle.radius <= selectionBox.x2 &&
          circle.y + circle.radius <= selectionBox.y2
        ) {
          selected.push(circle.id);
        }
      });

      texts.forEach((text) => {
        if (
          text.x >= selectionBox.x1 &&
          text.y >= selectionBox.y1 &&
          text.x + 100 <= selectionBox.x2 && 
          text.y + 20 <= selectionBox.y2
        ) {
          selected.push(text.id);
        }
      });

      setSelectedIds(selected);
      setSelectionRect(null);
    }
  };

  // Добавляем текст по двойному клику
  const handleDoubleClick = () => {
    if (selectedTool !== "text") return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const text = prompt("Введите текст:", "");

    if (text) {
      setTexts([...texts, { id: texts.length + 1, x: pos.x, y: pos.y, text }]);
    }
  };

  // Обработка выделения элементов
  const handleSelect = (id: number) => {
    if (selectedTool !== "select") return;

    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  // Удаление выделенных элементов
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Delete") {
      setRectangles((prevRectangles) => prevRectangles.filter((rect) => !selectedIds.includes(rect.id)));
      setCircles((prevCircles) => prevCircles.filter((circle) => !selectedIds.includes(circle.id)));
      setTexts((prevTexts) => prevTexts.filter((text) => !selectedIds.includes(text.id)));
      setSelectedIds([]);
    }
  };

  // Перемещение выделенных элементов
  const handleDragMove = (e: any, id: number, type: "rectangle" | "circle" | "text") => {
    if (selectedTool !== "select") return;

    const pos = e.target.position();

    if (type === "rectangle") {
      setRectangles((prevRectangles) =>
        prevRectangles.map((rect) => (rect.id === id ? { ...rect, x: pos.x, y: pos.y } : rect))
      );
    } else if (type === "circle") {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => (circle.id === id ? { ...circle, x: pos.x, y: pos.y } : circle))
      );
    } else if (type === "text") {
      setTexts((prevTexts) =>
        prevTexts.map((text) => (text.id === id ? { ...text, x: pos.x, y: pos.y } : text))
      );
    }
  };

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDblClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ background: "#f5f5f5", zIndex: 1 }}
    >
      <Layer>
        {rectangles.map((rect) => (
          <Rect
            key={rect.id}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill="lightblue"
            stroke="black"
            draggable={selectedTool === "select"}
            onClick={() => handleSelect(rect.id)}
            onDragMove={(e) => handleDragMove(e, rect.id, "rectangle")}
          />
        ))}
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            x={circle.x}
            y={circle.y}
            radius={circle.radius}
            fill="lightblue"
            stroke="black"
            draggable={selectedTool === "select"}
            onClick={() => handleSelect(circle.id)}
            onDragMove={(e) => handleDragMove(e, circle.id, "circle")}
          />
        ))}
        {texts.map((text) => (
          <Text
            key={text.id}
            x={text.x}
            y={text.y}
            text={text.text}
            fontSize={20}
            fill="black"
            draggable={selectedTool === "select"}
            onClick={() => handleSelect(text.id)}
            onDragMove={(e) => handleDragMove(e, text.id, "text")}
          />
        ))}
        {newRect && <Rect x={newRect.x} y={newRect.y} width={newRect.width} height={newRect.height} fill="rgba(0, 0, 255, 0.3)" />}
        {newCircle && <Circle x={newCircle.x} y={newCircle.y} radius={newCircle.radius} fill="rgba(0, 0, 255, 0.3)" />}
        {selectionRect && (
          <Rect
            x={selectionRect.x}
            y={selectionRect.y}
            width={selectionRect.width}
            height={selectionRect.height}
            fill="rgba(0, 0, 255, 0.3)"
          />
        )}
      </Layer>
    </Stage>
  );
}