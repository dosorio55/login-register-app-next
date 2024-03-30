'use client';

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProfilePage = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");

      if (response.status === 200) {
        router.push("/login");
      } else {
        throw new Error(`Logout failed with error: ${response.data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
        <h2 className="mb-2 font-bold text-2xl">John Doe</h2>
        <p className="text-gray-600">john.doe@example.com</p>
        <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg">
          Edit Profile
        </button>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
