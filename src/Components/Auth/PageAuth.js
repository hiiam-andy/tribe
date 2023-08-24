import React from "react";
import AuthWeb from "./AuthWeb";

export default function PageAuth() {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AuthWeb />
    </section>
  );
}
