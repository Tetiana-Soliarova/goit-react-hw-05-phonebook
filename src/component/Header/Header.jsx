import React from 'react';
import style from './logo.module.css';
import fade from "./fade.module.css";
import foto from "./phonebook.jpg";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Header() {
  return (
    <header className={style.header}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames={fade}
        unmountOnExit
      >
        <h1 className={style.title}>
          <img src={foto} alt="" width="150px" />
          Phonebook
        </h1>
      </CSSTransition>
    </header>
  );
}
export default Header;