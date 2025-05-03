import AuthForm from "../component/AuthForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gray-100">
      <AuthForm type="login" />
      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
