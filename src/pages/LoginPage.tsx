import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { FaUtensils } from "react-icons/fa6";
import { User } from "../models/User.ts";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export function Login() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: LoginErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login successful", formData);
      // @TODO: implement nio login logic dito; siguro store nio yung username, name, email sa browser local storage or sa cookies

      // @TODO: replace this
      // set user_id, name, username, email to local storage
      localStorage.setItem("user_id", "1234567890");
      localStorage.setItem("email", formData.email);
      localStorage.setItem("name", "Juan Dela Cruz");
      localStorage.setItem("username", "juandelacruz");
      localStorage.setItem("is_admin", "true");

      // navigate to feed page
      navigate("/feed");
    }
  };

  return (
    <div className="flex flex-col items-center bg-neutral h-[100vh]">
      <div className="flex min-h-[86vh] max-w-[1080px] flex-1 flex-col justify-center items-stretch p-8">
        <a className="btnstyle1 flex flex-row text-4xl justify-center flex-nowrap items-center rounded-full mb-4 px-4 py-2  font-bold text-white hover:cursor-pointer ">
          <FaUtensils className="mr-2 text-2xl text-white" />
          FoodReview
        </a>
        <div className="card p-8 bg-white shadow-xl min-w-96">
          <h2 className="text-3xl font-bold text-center w-full">Login</h2>
          <form onSubmit={handleSubmit} className="w-prose">
            <div className="form-control">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
            <div className="flex flex-row gap-2 text-gray-600 mt-2 justify-end">
              <p>Don't have an account?</p>
              <a
                onClick={() => navigate("/signup")}
                className="text-primary underline"
              >
                {" "}
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
