import LoginContainer from "./partials/login-container"
import LoginForm from "./partials/login-form"
import LoginHeader from "./partials/login-header"

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginHeader />
      <LoginForm />
    </LoginContainer>
  );
};

export default LoginPage;