// src/pages/DashboardPlaceholder.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  roleLabel: string;
}

export const DashboardPlaceholder: React.FC<Props> = ({ roleLabel }) => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">

      <h1 className="text-3xl font-bold">
        {roleLabel} Dashboard
      </h1>

      <p className="text-gray-600">
        Welcome, {user.fullName}
      </p>

      <Button onClick={logout}>
        Logout
      </Button>

    </div>
  );
};