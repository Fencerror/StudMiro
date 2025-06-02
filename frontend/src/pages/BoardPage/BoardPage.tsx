import { useState } from "react";
import Toolbar from "../../features/Toolbar/Toolbar";
import BoardCanvas from "../../entities/BoardCanvas/BoardCanvas";

export default function BoardPage() {
  const [selectedTool, setSelectedTool] = useState<"select" | "rectangle" | "circle" | "text">("select");

  return (
    <div>
      <Toolbar onSelectTool={setSelectedTool} />
      <BoardCanvas selectedTool={selectedTool} />
    </div>
  );
}
