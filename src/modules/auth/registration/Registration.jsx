import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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

  const { handleRegister } = useAuth();

  const onSubmit = async (data) => {
    await handleRegister(data);
  };

  const inputs = [
    { name: "login", placeholder: "Логин", type: "text" },
    { name: "password", placeholder: "Пароль", type: "password" },
    { name: "full_name", placeholder: "Полное имя", type: "text" },
    { name: "phone", placeholder: "Номер телефона", type: "tel" },
    { name: "email", placeholder: "Электронная почта", type: "email" },
  ];

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography tag="h2">Регистрация</Typography>

      <Typography tag="h4" className={styles.subtitle}>
        Введите необходимые данные для регистрации
      </Typography>

      {inputs.map((input) => (
        <Input
          key={input.name}
          placeholder={input.placeholder}
          type={input.type}
          id={input.name}
          error={errors[input.name]?.message}
          {...register(input.name, {
            required: `${input.placeholder} обязательно`,
          })}
        />
      ))}

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
