import { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { guessWord } from "../../../store/gameSlice";

export default function WordInput() {
  const [val, setVal] = useState("");
  const dispatch = useAppDispatch();

  const onTry = () => {
    if (!val.trim()) return;
    dispatch(guessWord(val.trim()));
    setVal("");
  };

  return (
    <div style={{ marginTop: 12, width: "50%" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center"}}>
        <Input value={val} onChange={setVal} placeholder="Жоопту киргизүү" />
        <Button onClick={onTry}>Текшерүү</Button>
      </div>
    </div>
  );
}
