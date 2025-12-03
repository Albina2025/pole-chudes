import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addQuestion, deleteQuestion } from "../store/questionsSlice";


export default function AdminPage() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((s) => s.questions.list);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAdd = () => {
    dispatch(
      addQuestion({
        id: Date.now(),
        question,
        answer,
      })
    );
    setQuestion("");
    setAnswer("");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Суроолорду башкаруу (CRUD)</h2>

      <Input
        value={question}
        onChange={setQuestion}
        placeholder="Суроо"
      />

      <Input
        value={answer}
        onChange={setAnswer}
        placeholder="Жооп"
      />

      <Button onClick={handleAdd}>Кошуу</Button>

      <hr />

      <h3>Бардык суроолор:</h3>

      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <b>{q.question}</b> — {q.answer}
          <br />
          <Button
            className="deleteBtn"
            onClick={() => dispatch(deleteQuestion(q.id))}
          >
            Өчүрүү
          </Button>
        </div>
      ))}
    </div>
  );
}
