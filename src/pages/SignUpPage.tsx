import React, { useState, ChangeEvent, FormEvent } from "react";
import { NavigationBar } from "../components/common/NavigationBar";
import { Footer } from "../components/common/Footer";
import { FaUtensils } from "react-icons/fa6";

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export function Signup() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signup successful", formData);
      // @TODO: implement nio signup logic dito; siguro store nio yung username, name, email sa browser local storage or sa cookies
    }
  };

  return (
    <div className="flex flex-col items-center bg-neutral h-[100vh]">
      <div className="flex min-h-[86vh] max-w-[1080px] flex-1 flex-col justify-center items-stretch p-8">
        <a className="btnstyle1 flex flex-row text-4xl justify-center flex-nowrap items-center rounded-full mb-4 px-4 py-2 font-bold text-white hover:cursor-pointer ">
          <FaUtensils className="mr-2 text-2xl text-white" />
          FoodReview
        </a>
        <div className="card p-8 bg-white shadow-xl min-w-96">
          <h2 className="text-3xl font-bold w-full text-center">Signup</h2>
          <form onSubmit={handleSubmit} className="w-prose">
            <div className="form-control">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
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
              Signup
            </button>
            <div className="flex flex-row gap-2 text-gray-600 mt-2 justify-end">
              <p>Already have an account?</p>
              <a href="/signup" className="text-primary underline">
                {" "}
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
