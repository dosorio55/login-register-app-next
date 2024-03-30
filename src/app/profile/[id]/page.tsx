import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
        <h2 className="mb-2 font-bold text-2xl">John Doe</h2>
        <p className="text-gray-600">{params.id}</p>
        <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
