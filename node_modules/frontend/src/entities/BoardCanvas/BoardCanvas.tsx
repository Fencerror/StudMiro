import { Stage, Layer, Rect, Circle, Text, Arrow } from "react-konva";
import { useState, useRef, SetStateAction, useEffect } from "react";

interface BoardCanvasProps {
  selectedTool: "select" | "rectangle" | "circle" | "text" | "arrow";
  selectedColor: string; // new prop for shape color
}

export default function BoardCanvas({ selectedTool, selectedColor }: BoardCanvasProps) {
  const [rectangles, setRectangles] = useState<{ id: number; x: number; y: number; width: number; height: number; fill: string }[]>([]);
  const [circles, setCircles] = useState<{ id: number; x: number; y: number; radius: number; fill: string }[]>([]);
  const [texts, setTexts] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [newRect, setNewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [newCircle, setNewCircle] = useState<{ x: number; y: number; radius: number } | null>(null);
  const [selectionRect, setSelectionRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [editingText, setEditingText] = useState<{ x: number; y: number; value: string } | null>(null);
  const [arrows, setArrows] = useState<{ id: number; points: number[]; stroke: string }[]>([]);
  const [newArrow, setNewArrow] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
  const stageRef = useRef<any>(null);

  // Начинаем рисование или выделение
  const handleMouseDown = () => {
    if (selectedTool === "arrow") {
      const stage = stageRef.current;
      const pos = stage.getPointerPosition();
      if (!newArrow) {
        // первый клик – сохраняем стартовые координаты
        setNewArrow({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
      } else {
        // второй клик – завершаем стрелку, делаем её чёрной
        setArrows([...arrows, { id: arrows.length + 1, points: [newArrow.startX, newArrow.startY, pos.x, pos.y], stroke: "black" }]);
        setNewArrow(null);
      }
      return;
    }
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
    } else if (selectedTool === "text") {
      setEditingText({ x: pos.x, y: pos.y, value: "" });
    }
  };

  // Изменяем размер фигуры или рамки выделения
  const handleMouseMove = () => {
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    if (selectedTool === "arrow" && newArrow) {
      setNewArrow({ ...newArrow, endX: pos.x, endY: pos.y });
    }
    if (!drawing) return;

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
    if (selectedTool === "arrow") return;
    if (!drawing) return;
    setDrawing(false);

    if (selectedTool === "rectangle" && newRect) {
      setRectangles([...rectangles, { id: rectangles.length + 1, fill: selectedColor, ...newRect }]);
      setNewRect(null);
    } else if (selectedTool === "circle" && newCircle) {
      setCircles([...circles, { id: circles.length + 1, fill: selectedColor, ...newCircle }]);
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

  // Обновлённый обработчик двойного клика для inline-редактирования текста
  const handleDoubleClick = () => {
    if (selectedTool !== "text") return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    setEditingText({ x: pos.x, y: pos.y, value: "" });
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        setRectangles((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
        setCircles((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
        setTexts((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
        setSelectedIds([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIds]);

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
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDblClick={handleDoubleClick}
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
              fill={rect.fill} // use chosen color
              stroke="black"
              draggable={true}
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
              fill={circle.fill} // use chosen color
              stroke="black"
              draggable={true}
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
              draggable={true}
              onClick={() => handleSelect(text.id)}
              onDragMove={(e) => handleDragMove(e, text.id, "text")}
            />
          ))}
          {arrows.map((arrow) => (
            <Arrow key={arrow.id} points={arrow.points} stroke={arrow.stroke} pointerWidth={10} pointerLength={15} />
          ))}
          {newRect && (
            <Rect 
              x={newRect.x} 
              y={newRect.y} 
              width={newRect.width} 
              height={newRect.height} 
              fill="rgba(0, 0, 255, 0.3)" 
            />
          )}
          {newCircle && (
            <Circle 
              x={newCircle.x} 
              y={newCircle.y} 
              radius={newCircle.radius} 
              fill="rgba(0, 0, 255, 0.3)" 
            />
          )}
          {selectionRect && (
            <Rect
              x={selectionRect.x}
              y={selectionRect.y}
              width={selectionRect.width}
              height={selectionRect.height}
              fill="rgba(0, 0, 255, 0.3)"
            />
          )}
          {newArrow && (
            <Arrow points={[newArrow.startX, newArrow.startY, newArrow.endX, newArrow.endY]} stroke={selectedColor} pointerWidth={10} pointerLength={15} dash={[4, 4]} />
          )}
        </Layer>
      </Stage>
      {editingText && (
        <textarea
          autoFocus
          style={{
            position: "absolute",
            top: editingText.y,
            left: editingText.x,
            fontSize: "20px",
            padding: "4px",
            borderRadius: "4px",
            border: "1px solid black",
            color: "black",
            zIndex: 3,
            transform: "translate(-50%, -50%)",
          }}
          value={editingText.value}
          onChange={(e) => setEditingText({ ...editingText, value: e.target.value })}
          onBlur={() => {
            if (editingText.value.trim()) {
              setTexts([
                ...texts,
                { id: texts.length + 1, x: editingText.x, y: editingText.y, text: editingText.value },
              ]);
            }
            setEditingText(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (editingText.value.trim()) {
                setTexts([
                  ...texts,
                  { id: texts.length + 1, x: editingText.x, y: editingText.y, text: editingText.value },
                ]);
              }
              setEditingText(null);
            } else if (e.key === "Escape") {
              setEditingText(null);
            }
          }}
        />
      )}
    </>
  );
}