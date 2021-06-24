import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms';
import Header from '../../components/Header';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './styles.scss';

export default function Home() {
  const [user, setUser] = useRecoilState(userState);

  const clearUser = () => {
    setUser(null);
  };

  return (
    <>
      <Header />
      <section className="home">
        <div className="home__row home__row--message">
          <span>Olá, <strong>{ user.name }</strong>! Bem-vindo à&nbsp;</span>
          <Logo />
        </div>
        <div className="home__row home__row--action">
          <button onClick={clearUser}>Sair</button>
        </div>
      </section>
    </>
  );
}