import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../../components/Typography/Typography";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { HomeIcon } from "../../../assets/icons/icons";
import Tooltip from "../../../components/Tooltip/Tooltip";
import { useAuth } from "../../../hooks/useAuth";

const Login = ({ styles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const onSubmit = async (data) => {
    await handleLogin(data);
    navigate("/profile");
  };

  const inputs = [
    { name: "login", placeholder: "Логин", type: "text" },
    { name: "password", placeholder: "Пароль", type: "password" },
  ];

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography tag="h2">Вход </Typography>

      <Typography tag="h4" className={styles.subtitle}>
        Введите электронную почту
      </Typography>

      {inputs.map((input) => (
        <Input
          key={input.name}
          placeholder={input.placeholder}
          type={input.type}
          id={input.name}
          error={errors[input.name]?.message}
          {...register(input.name, {
            required: `${input.placeholder} обязательный`,
          })}
        />
      ))}

      <div className={styles.button__container}>
        <Tooltip title={"Домой"}>
          <Link to={"/"}>
            <Button variant="outlined">
              <HomeIcon size={24} />
            </Button>
          </Link>
        </Tooltip>
        <Button type="submit">Войти</Button>
      </div>
    </form>
  );
};

export default Login;
