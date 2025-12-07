import AuthContainer from "@/features/auth/components/auth-container";
import AuthHeader from "@/features/auth/components/auth-header";
import RegisterForm from "@/features/auth/components/register-form";

const RegisterPage = () => {
  return (
    <AuthContainer className="w-130.75">
      <AuthHeader title="Register" />
      <RegisterForm />
    </AuthContainer>
  );
};

export default RegisterPage;