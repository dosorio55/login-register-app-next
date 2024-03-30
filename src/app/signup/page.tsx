"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const initialUser = {
  email: "",
  password: "",
  userName: "",
};

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState(initialUser);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const checkButtonDisabled = () => {
    if (user.email && user.password) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

    setErrors({ email: "", password: "" });
    setButtonDisabled(checkButtonDisabled());
  };

  const handleCheckErrors = () => {
    debugger;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let emailError = "";
    let passwordError = "";

    if (user.email && !emailRegex.test(user.email)) {
      emailError =
        "Invalid email, the password must be at least 8 characters long and contain at least one letter and one number";
    }

    if (user.password && !passwordRegex.test(user.password)) {
      passwordError =
        "Invalid password format, the password must be at least 8 characters long and contain at least one letter and one number";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setButtonDisabled(true);
      return true;
    }

    return false;
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleCheckErrors()) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 201) {
        router.push("/login");
      } else {
        const errorData = response.data;
        throw new Error(
          `An error occurred: ${response.status}, ${errorData.message}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>

      <form className="space-y-4" onSubmit={handleSignUp}>
        <div className="flex flex-col">
          <label className="font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="border-2 border-gray-200 p-2 rounded-md text-black"
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />{" "}
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-2" htmlFor="userName">
            Username:
          </label>
          <input
            className="border-2 border-gray-200 p-2 rounded-md text-black"
            type="text"
            name="userName"
            id="userName"
            value={user.userName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="border-2 border-gray-200 p-2 rounded-md text-black"
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-row items-center gap-4 justify-between">
          <Link href="/Sign Up">Login</Link>
          <button
            className=" bg-blue-500 text-white p-2 rounded-md cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={buttonDisabled}
          >
            {!loading ? "Submit" : "Loading..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
