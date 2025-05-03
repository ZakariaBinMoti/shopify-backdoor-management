import AuthForm from "../component/AuthForm";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <AuthForm type="register" />
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
