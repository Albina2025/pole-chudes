import { Link } from "react-router-dom";

export const NoteFoundPage = () => {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>404 — Табылбады</h2>
      <p>Жол туура эмес.</p>
      <Link to="/login">Кайра кирүү</Link>
    </div>
  );
}
