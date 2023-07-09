import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageMain from "./PageMain";
import PageFavorites from "./PageFavorites";
import PageEvent from "./PageEvent";
import PageChat from "./PageChat";
import PageProfile from "./PageProfile";
import PageSettings from "./PageSettings";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PageMain />} />
      <Route path="/favorites" element={<PageFavorites />} />
      <Route path="/event" element={<PageEvent />} />
      <Route path="/chat" element={<PageChat />} />
      <Route path="/profile" element={<PageProfile />} />
      <Route path="/settings" element={<PageSettings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
