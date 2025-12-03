import { useAppSelector } from "../../hooks/useAppSelector";

export default function QuestionBox() {
  const questions = useAppSelector((s) => s.questions.list);
  const currentId = useAppSelector((s) => s.game.currentQuestionId);
  const current = questions.find((q) => q.id === currentId);

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Суроо:</h3>
      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
        {current ? current.question : "Суроо тандаган жок"}
      </div>
    </div>
  );
}
