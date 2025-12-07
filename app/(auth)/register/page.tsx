import RegisterContainer from "./partials/register-container"
import RegisterForm from "./partials/register-form"
import RegisterHeader from "./partials/register-header"

const RegisterPage = () => {
  return (
    <RegisterContainer>
      <RegisterHeader />
      <RegisterForm />
    </RegisterContainer>
  );
};

export default RegisterPage;