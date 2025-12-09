import { useState } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addQuestion, deleteQuestion, updateQuestion } from "../../store/questionsSlice";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export const AdminPageForm = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((s) => s.questions.list);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const navigate = useNavigate();

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

  const logoutAdmin = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ padding: 30, width: "70%" }}>
      <h2>Суроолорду башкаруу (CRUD)</h2>

      <Input value={question} onChange={setQuestion} placeholder="Суроо" />
      <Input value={answer} onChange={setAnswer} placeholder="Жооп" />

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
          {editId === q.id ? (
            <>
              <Input value={editQuestion} onChange={setEditQuestion} />
              <Input value={editAnswer} onChange={setEditAnswer} />

              <div style={{ display: "flex", gap: 15, marginTop: 5 }}>
                <Button
                  onClick={() => {
                    dispatch(
                      updateQuestion({
                        id: q.id,
                        question: editQuestion,
                        answer: editAnswer,
                      })
                    );
                    setEditId(null);
                  }}
                >
                  Сактоо
                </Button>

                <Button onClick={() => setEditId(null)}>Отмена</Button>
              </div>
            </>
          ) : (
            <>
              <b>{q.question}</b> — {q.answer}
              <div style={{ display: "flex", gap: 20, marginTop: 5 }}>
                <Button onClick={() => dispatch(deleteQuestion(q.id))}>
                  Өчүрүү
                </Button>

                <Button
                  onClick={() => {
                    setEditId(q.id);
                    setEditQuestion(q.question);
                    setEditAnswer(q.answer);
                  }}
                >
                  Түзөтүү
                </Button>
              </div>
            </>
          )}
        </div>
      ))}

      <Button onClick={logoutAdmin}>Выйти</Button>
    </div>
  );
};
