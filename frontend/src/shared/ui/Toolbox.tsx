import { useState } from "react";
import styled from "styled-components";

type Tool = "select" | "rectangle" | "circle" | "text";

interface ToolboxProps {
  onSelectTool: (tool: Tool) => void;
  onSelectColor: (color: string) => void;
}

export default function Toolbox({ onSelectTool, onSelectColor }: ToolboxProps) {
  const [isShapesOpen, setIsShapesOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);

  return (
    <ToolboxContainer>
      <ToolboxList>
        <ToolboxItem>
          <ToolboxButton onClick={() => setIsShapesOpen(!isShapesOpen)}>
            Фигуры ⬇
          </ToolboxButton>
        </ToolboxItem>
        {isShapesOpen && (
          <>
            <ToolboxItem>
              <ToolboxButton onClick={() => onSelectTool("rectangle")}>
                ⬛
              </ToolboxButton>
            </ToolboxItem>
            <ToolboxItem>
              <ToolboxButton onClick={() => onSelectTool("circle")}>
                ⚫ 
              </ToolboxButton>
            </ToolboxItem>
            <ToolboxItem>
              <ToolboxButton onClick={() => onSelectTool("select")}>
                🔲
              </ToolboxButton>
            </ToolboxItem>
          </>
        )}
      </ToolboxList>
      <ToolboxList>
        <ToolboxItem>
          <ToolboxButton onClick={() => setIsTextOpen(!isTextOpen)}>
            Текст ⬇
          </ToolboxButton>
        </ToolboxItem>
        {isTextOpen && (
          <ToolboxItem>
            <ToolboxButton onClick={() => onSelectTool("text")}>
              📝
            </ToolboxButton>
          </ToolboxItem>
        )}
      </ToolboxList>
      <div style={{ marginTop: "1em", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", backgroundColor: "white", padding: "0.5em", borderRadius: "9999px" }}>
        <label htmlFor="colorPicker" style={{ marginRight: "0.5em", color: "black" }}>Цвет:</label>
        <input 
          id="colorPicker" 
          type="color" 
          defaultValue="#add8e6" 
          onChange={(e) => onSelectColor(e.target.value)} 
        />
      </div>
    </ToolboxContainer>
  );
}

const ToolboxContainer = styled.div`
  z-index: 2;
  left: 3em;
  top: 10em;
  width: 10em;
  background: #ddd;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: fixed;
  box-shadow: 0 4px 6px rgba(128, 0, 128, 0.5);
  border-radius: 0.5em;
`;

const ToolboxList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const ToolboxItem = styled.li`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 90%;
`;

const ToolboxButton = styled.button`
  padding: 0.5em 1em;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: bold;
  border-radius: 9999px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  text-align: left;
  width: 100%;
  background-size: cover;
  
  &:hover {
    background: #e0e0e0;
    box-shadow: inset 0 0 10px #d1c4e9;
  }

  &:focus {
    background: linear-gradient(to right, #7e57c2, #ab47bc);
    color: white;
  }
`;
