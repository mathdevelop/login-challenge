import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER, CREATE_USER } from './Login';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import Alert from '../../components/Alert';
import './styles.scss';

export default function Login() {
  const [form, setForm] = useState(1);
  const [error, setError] = useState(null);
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();

  useEffect(() => {
    if(user)
      history.push('/');
  }, [user, history]);

  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted: data => {
      setUser(data.user);
      setError(null);
    },
    onError: error => {
      setError(error.message);
    }
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: data => {
      setUser(data.createUser);
      setError(null);
    },
    onError: error => {
      setError(error.message);
    }
  });

  const handleSignIn = event => {
    const data = new FormData(event.target);

    getUser({ variables: { email: data.get('email'), password: data.get('password') } });

    event.preventDefault();
  };

  const handleSignUp = event => {
    const data = new FormData(event.target);

    createUser({ variables: { name: data.get('name'), email: data.get('email'), password: data.get('password') } });

    event.preventDefault();
  };

  const SignIn = () => {
    return (
      <div className="login__form login__form--signin">
        <h2>Entrar</h2>
        <form onSubmit={handleSignIn}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" aria-label="E-mail" autoComplete="off" required />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" aria-label="Senha" minLength="8" maxLength="16" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required />
          <span>8 à 16 caracteres com número, maiúsculas e minúsculas</span>
          <button type="submit">Entrar</button>
        </form>
        <button onClick={() => { setError(null); setForm(2); }}>ou cadastre-se</button>
        {error &&
          <Alert type="danger">{ error }</Alert>
        }
      </div>
    );
  };

  const SignUp = () => {
    return (
      <div className="login__form login__form--signup">
        <h2>Cadastrar</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" aria-label="Nome" required />
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" aria-label="E-mail" autoComplete="off" required />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" aria-label="Senha" minLength="8" maxLength="16" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required />
          <span>8 à 16 caracteres com número, maiúsculas e minúsculas</span>
          <button type="submit">Cadastrar</button>
        </form>
        <button onClick={() => { setError(null); setForm(1); }}>é cadastrado?</button>
        {error &&
          <Alert type="danger">{ error }</Alert>
        }
      </div>
    );
  };

  const Form = () => {
    if(form === 1)
      return <SignIn />;

    return <SignUp />;
  };

  return (
    <section className="login">
      <div className="login__row">
        <div className="login__column login__column--left">
          <Logo />
        </div>
        <div className="login__column login__column--right">
          <Form />
        </div>
      </div>
    </section>
  );
}