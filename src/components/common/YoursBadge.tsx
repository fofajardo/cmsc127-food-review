import React from "react";
import { FaUserCheck } from "react-icons/fa";
export const YoursBadge = () => {
  return (
    <div className="badge-accent badge text-white p-4">
      <FaUserCheck className="mr-2 text-base" />
      Yours
    </div>
  );
};
