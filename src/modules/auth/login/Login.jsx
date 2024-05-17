import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../../components/Typography/Typography";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { HomeIcon } from "../../../assets/icons/icons";
import Tooltip from "../../../components/Tooltip/Tooltip";

const Login = ({ styles, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("@login", data);
    localStorage.setItem("user", JSON.stringify(data.email));
    navigate("/profile");
  };

  const form = useForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography tag="h2">Вход </Typography>

      <Typography tag="h4" className={styles.subtitle}>
        Введите электронную почту
      </Typography>

      <Controller
        name="email"
        control={form?.control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            placeholder="Email"
            type="email"
            id="email"
            {...(fieldState.error && { error: fieldState.error.message })}
            {...register("email", {
              required: "Электронная почта обязательна",
            })}
          />
        )}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <Controller
        name="password"
        control={form?.control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            placeholder="Пароль"
            type="password"
            id="password"
            {...(fieldState.error && { error: fieldState.error.message })}
            {...register("password", {
              required: "Пароль обязательный",
            })}
          />
        )}
      />
      {errors.password && <span>{errors.password.message}</span>}

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
