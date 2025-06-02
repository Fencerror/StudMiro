import { useState } from "react";
import styled from "styled-components";

type Tool = "select" | "rectangle" | "circle" | "text";

interface ToolbarProps {
  onSelectTool: (tool: Tool) => void;
}

export default function Toolbar({ onSelectTool }: ToolbarProps) {
  const [isShapesOpen, setIsShapesOpen] = useState(false);
  const [isTextOpen, setIsTextOpen] = useState(false);

  return (
    <ToolbarContainer>
      <ToolbarList>
        <ToolbarItem>
          <ToolbarButton onClick={() => setIsShapesOpen(!isShapesOpen)}>
            Фигуры ⬇
          </ToolbarButton>  
        </ToolbarItem>
        {isShapesOpen && (
          <>
            <ToolbarItem>
              <ToolbarButton onClick={() => onSelectTool("rectangle")}>
                ⬛
              </ToolbarButton>
            </ToolbarItem>
            <ToolbarItem>
              <ToolbarButton onClick={() => onSelectTool("circle")}>
                ⚫ 
              </ToolbarButton>
            </ToolbarItem>
            <ToolbarItem>
          <ToolbarButton onClick={() => onSelectTool("select")}>
            🔲
          </ToolbarButton>
        </ToolbarItem>

          </>
        )}
      </ToolbarList>

      <ToolbarList>
        <ToolbarItem>
          <ToolbarButton onClick={() => setIsTextOpen(!isTextOpen)}>
            Текст ⬇
          </ToolbarButton>
        </ToolbarItem>
        {isTextOpen && (
          <ToolbarItem>
            <ToolbarButton onClick={() => onSelectTool("text")}>
              📝
            </ToolbarButton>
          </ToolbarItem>
        )}
      </ToolbarList>
    </ToolbarContainer>
  );
}

const ToolbarContainer = styled.div`
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

const ToolbarList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  
`;

const ToolbarItem = styled.li`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 90%;
`;

const ToolbarButton = styled.button`
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
    border:none;
  }

  &:focus {
    background: linear-gradient(to right, #7e57c2, #ab47bc);
    color: white;
    border: none;
  }
`;