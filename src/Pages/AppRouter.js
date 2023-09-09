import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageFavorites from "../Components/Favorites/PageFavorites";
import PageEvent from "../Components/Event/PageEvent";
import PageProfile from "../Components/Profile/PageProfile";
import PageAuth from "../Components/Auth/PageAuth";
import PageProfileSettings from "../Components/Profile/ProfileSettings/PageProfileSettings";
import PageEvents from "../Components/Event/PageEvents";
import PageChat from "../Components/Chat/PageChat";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/events" element={<PageEvents />} />
      <Route path="/events/:id" element={<PageEvent />} />

      <Route path="/auth" element={<PageAuth />} />

      <Route path="/user/profile/:id" element={<PageProfile />} />
      <Route path="/settings" element={<PageProfileSettings />} />
      <Route path="/favorite" element={<PageFavorites />} />

      <Route path="/chat" element={<PageChat />} />
      <Route path="*" element={<Navigate to="/events" replace />} />
    </Routes>
  );
}
