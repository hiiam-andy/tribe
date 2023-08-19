import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageMain from "./PageMain";
import PageFavorites from "./PageFavorites";
import PageEvents from "./PageEvents";
import PageEvent from "./PageEvent";
import PageChat from "./PageChat";
import PageProfile from "./PageProfile";
import PageAuth from "./PageAuth";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/main" element={<PageMain />} />

      <Route path="/auth" element={<PageAuth />} />

      <Route path="/profile" element={<PageProfile />} />
      <Route path="/favorite" element={<PageFavorites />} />
      <Route path="/chat" element={<PageChat />} />
      <Route path="/events" element={<PageEvents />} />
      <Route path="/events/:id" element={<PageEvent />} />
      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  );
}
