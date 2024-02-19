import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  account: Yup.string()
    .matches(/^[a-zA-Z_\-/./1-9]+$/, "Заборонені символи")
    .min(6, "Логін занадто короткий")
    .required("Обов'язково до заповнення"),
  login: Yup.string()
    .matches(/^[a-zA-Z_\-/./1-9]+$/, "Заборонені символи")
    .min(6, "Логін занадто короткий")
    .required("Обов'язково до заповнення"),
  password: Yup.string()
    .matches(/^[a-zA-Z_\-/./1-9]+$/, "Заборонені символи")
    .min(3, "Пароль занадто короткий")
    .required("Обов'язково до заповнення"),
});
