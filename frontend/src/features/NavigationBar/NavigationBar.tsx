import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface NavigationBarProps {
  mode: 'sticky' | 'fixed';
}

const Nav = styled.nav<{ mode: 'sticky' | 'fixed' }>`
  position: ${(props) => props.mode};
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
  display: flex;
  gap: 1rem;
`;

export default function NavigationBar({ mode }: NavigationBarProps) {
  return (
    <Nav mode={mode}>
      <Link to="/">Home</Link>
      <Link to="/board">Board</Link>
    </Nav>
  );
}
