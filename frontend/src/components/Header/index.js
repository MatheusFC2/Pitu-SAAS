import React from 'react';
import { Logo, HeaderContainer } from './styles';
import Icone from '../../assets/icone.png';

function Header({ children }) {
  return (
    <>
      <HeaderContainer>
        <Logo src={Icone} alt="Pitu - Encurtador de URL" />
        <h1>Pitu</h1>
        <p>{children}</p>
      </HeaderContainer>
    </>
  );
}

export default Header;
