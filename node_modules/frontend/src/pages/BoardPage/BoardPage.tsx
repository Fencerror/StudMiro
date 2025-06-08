import { useState } from "react";
import Toolbar from "../../features/Toolbar/Toolbar";
import BoardCanvas from "../../entities/BoardCanvas/BoardCanvas";

export default function BoardPage() {
	const [selectedTool, setSelectedTool] = useState<"select" | "rectangle" | "circle" | "text" | "arrow">("select");
	const [selectedColor, setSelectedColor] = useState("lightblue");

	return (
		<div>
			<Toolbar onSelectTool={setSelectedTool} onSelectColor={setSelectedColor} />
			<BoardCanvas selectedTool={selectedTool} selectedColor={selectedColor} />
		</div>
	);
}
