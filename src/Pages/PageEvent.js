import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageEvent() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>назад</button>
      <div></div>
    </div>
  );
}
