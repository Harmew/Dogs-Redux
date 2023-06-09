import React from "react";
import { Link } from "react-router-dom";

// CSS
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";

// Components
import Head from "../Helper/Head";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

// Hooks
import useForm from "../../Hooks/useForm";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Store/user";

const LoginForm = () => {
  const username = useForm("username");
  const password = useForm();

  const { token, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const loading = token.loading || user.loading;
  const error = token.error || user.error;

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      dispatch(
        userLogin({ username: username.value, password: password.value })
      );
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
