import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageMain from "./PageMain";
import PageFavorites from "../Components/Favorites/PageFavorites";
import PageEvent from "../Components/Event/PageEvent";
import PageChat from "./PageChat";
import PageProfile from "../Components/Profile/PageProfile";
import PageAuth from "../Components/Auth/PageAuth";
import PageProfileSettings from "../Components/Profile/ProfileSettings/PageProfileSettings";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/main" element={<PageMain />} />
      <Route path="/auth" element={<PageAuth />} />
      <Route path="/user" element={<PageProfile />} />
      <Route path="/user/:id" element={<PageProfile />} />
      <Route path="/settings" element={<PageProfileSettings />} />
      <Route path="/favorite" element={<PageFavorites />} />
      <Route path="/chat" element={<PageChat />} />
      <Route path="/events/:id" element={<PageEvent />} />
      <Route path="*" element={<Navigate to="/main" replace />} />
    </Routes>
  );
}
