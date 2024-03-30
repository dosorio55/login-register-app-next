"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const initialUser = {
  email: "",
  password: "",
  userName: "",
};

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState(initialUser);

  const onSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);

      if (response.status === 200) {
        router.push("/profile");
      } else {
        throw new Error(`Login failed with error: ${response.data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>

      <form className="space-y-4" onSubmit={onSignUp}>
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
        </div>
        <div className="flex flex-row items-center gap-4 justify-between">
          <Link href="/signup">Signup</Link>
          <button
            type="submit"
            className=" bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
