import React from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../../../Images/backButton.svg";

export default function PageProfileSettings() {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "#E3E1EC" }}>
      <img src={BackButton} alt="back" onClick={() => navigate(-1)} />
    </div>
  );
}
