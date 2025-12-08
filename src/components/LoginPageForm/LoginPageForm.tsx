import { useState } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginPageForm = () => {
  const [loginV, setLoginV] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const doLogin = () => {
    dispatch(login({ login: loginV, password }));
    navigate("/admin");
  };

  return (
    <div style={{ width: 300, margin: "100px auto" }}>
      <h2>Админ кирүү</h2>

      <Input value={loginV} onChange={setLoginV} placeholder="Логин" />
      <Input value={password} onChange={setPassword} placeholder="Пароль" type="password" />

      <Button onClick={doLogin}>Кирүү</Button>
    </div>
  );
}

