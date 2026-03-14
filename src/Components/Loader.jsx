// src/Components/Loader.jsx
import React from "react";
import { BeatLoader } from "react-spinners";

export default function Loader({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <BeatLoader color="#a855f7" size={15} margin={5} />
    </div>
  );
}