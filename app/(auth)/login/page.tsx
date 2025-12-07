import AuthContainer from "@/features/auth/components/auth-container";
import AuthHeader from "@/features/auth/components/auth-header";
import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {
  return (
    <AuthContainer>
      <AuthHeader title="Welcome Back!" />
      <LoginForm />
    </AuthContainer>
  );
};

export default LoginPage;