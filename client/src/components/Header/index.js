import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './styles.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Logo />
      </div>
    </header>
  );
}