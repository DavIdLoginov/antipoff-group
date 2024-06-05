import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Имя обязательно"),
  email: Yup.string()
    .email("Неправильный формат email")
    .required("Email обязателен"),
  password: Yup.string()
    .required("Пароль обязателен")
    .min(3, "Пароль должен содержать минимум 3 символа")
    .max(10, "Пароль должен содержать максимум 10 символов")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .matches(/\d/, "Пароль должен содержать хотя бы одну цифру")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Пароль должен содержать хотя бы один специальный символ"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Пароли должны совпадать")
    .required("Подтверждение пароля обязательно"),
});
