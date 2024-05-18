import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../../components/Typography/Typography";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { HomeIcon } from "../../../assets/icons/icons";
import Tooltip from "../../../components/Tooltip/Tooltip";
import { useAuth } from "../../../hooks/useAuth";

const Registration = ({ styles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    console.log("@reg", data);
    const token = "exampleToken";
    localStorage.setItem("user", JSON.stringify(data.email));
    login(token);
    navigate("/profile");
  };

  const form = useForm();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography tag="h2">Регистрация</Typography>

      <Typography tag="h4" className={styles.subtitle}>
        Введите необходимые данные для регистрации
      </Typography>

      <Controller
        name="email"
        control={form?.control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Email"
            type="email"
            id="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Электронная почта обязательна",
            })}
          />
        )}
      />

      <Controller
        name="password"
        control={form?.control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Пароль"
            type="password"
            id="password"
            error={errors.password?.message}
            {...register("password", {
              required: "Пароль обязательный",
            })}
          />
        )}
      />

      <div className={styles.button__container}>
        <Tooltip title={"Домой"}>
          <Link to={"/"}>
            <Button variant="outlined">
              <HomeIcon color="#213547" size={24} />
            </Button>
          </Link>
        </Tooltip>
        <Button type="submit">Зарегистрироваться</Button>
      </div>
    </form>
  );
};

export default Registration;
