// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { LoginPage } from "../pages/LoginPage/LoginPage";
// import { GamePage } from "../pages/GamePage/GamePage";
// import { AdminPage } from "../pages/AdminPage/AdminPage";
// import { NoteFoundPage } from "../pages/NoteFountPage/NoteFoundPage";
// import Layout from "../components/Layout/Layout";
// import { useAppSelector } from "../hooks/useAppSelector";

// export default function AppRouter() {
//   const isAdmin = useAppSelector((s) => s.auth.isAdmin);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<GamePage />} />
//           <Route path="game" element={<GamePage />} />
//         </Route>

//         <Route
//           path="/admin"
//           element={isAdmin ? <Layout /> : <Navigate to="/login" />}
//         >
//           <Route index element={<AdminPage />} />
//         </Route>

//         <Route path="/login" element={<LoginPage />} />

//         <Route path="*" element={<NoteFoundPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

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

          {/* Protected Admin Page */}
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
