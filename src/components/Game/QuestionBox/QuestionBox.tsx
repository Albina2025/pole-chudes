import { useAppSelector } from "../../../hooks/useAppSelector";

export default function QuestionBox() {
  const questions = useAppSelector((s) => s.questions.list);
  const currentId = useAppSelector((s) => s.game.currentQuestionId);
  const current = questions.find((q) => q.id === currentId);

  return (
    <div style={{ marginBottom: 16, width: "50%",   boxShadow: "0 0 4px #000" }}>
      <div style={{ padding: 12, 
        border: "2px solid white", 
        borderRadius: 6, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10, 
        color: "white",
         backgroundColor: "rgba(41, 58, 71, 0.48)"
         }}> 
        <h3>Суроо:</h3>
        {current ? current.question : "Суроо тандаган жок"}
      </div>
    </div>
  );
}
