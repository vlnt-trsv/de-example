import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Typography from "../../../components/Typography/Typography";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { HomeIcon } from "../../../assets/icons/icons";

const Registration = ({ styles, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("@reg", data);
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
        <Link to={"/"}>
          <Button variant="outlined">
            <HomeIcon color="#213547" size={24} />
          </Button>
        </Link>
        <Button type="submit">Зарегистрироваться</Button>
      </div>
    </form>
  );
};

export default Registration;
