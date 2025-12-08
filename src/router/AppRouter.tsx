import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {GamePage} from "../pages/GamePage/GamePage";
import {AdminPage} from "../pages/AdminPage/AdminPage";
import {NoteFoundPage} from "../pages/NoteFountPage/NoteFoundPage";
import { useAppSelector } from "../hooks/useAppSelector";

export default function AppRouter() {
  const isAdmin = useAppSelector((s) => s.auth.isAdmin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={isAdmin ? <AdminPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/game"
          element={isAdmin ? <GamePage /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
