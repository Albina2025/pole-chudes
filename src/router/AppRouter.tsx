import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { GamePage } from "../pages/GamePage/GamePage";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import { NoteFoundPage } from "../pages/NoteFountPage/NoteFoundPage";
import Layout from "../components/Layout/Layout";
import { AdminRoute } from "./AdminRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GamePage />} />
          <Route path="game" element={<GamePage />} />

          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
