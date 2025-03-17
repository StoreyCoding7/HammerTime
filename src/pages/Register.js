import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Register.css";

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div class="create-acc">
        <h2>Create an Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <label id="name">Name</label>
            <input {...register("name")}/>
            <p>{errors.name?.message}</p>
          </div>

          {/* Email Field */}
          <div>
            <label id="email">Email</label>
            <input type="email" {...register("email")}/>
            <p>{errors.email?.message}</p>
          </div>

          {/* Password Field */}
          <div>
            <label id="password">Password</label>
            <input type="password" {...register("password")}/>
            <p>{errors.password?.message}</p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label id="confirm">Confirm Password</label>
            <input type="password" {...register("confirmPassword")}/>
            <p>{errors.confirmPassword?.message}</p>
          </div>

          {/* Submit Button */}
          <button type="submit" id="register-submit">
            Register
          </button>
        </form>

        <p>
          Already have an account? <a href="/login" id="login-button">Login</a>
        </p>

      </div>
    </div>
  );
};

export default Register;
