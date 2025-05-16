
import axios from "axios";
import InputField from "../components/InputField";
import { useCallback, useState } from "react";
import Loading from "../components/Loading";
import { Auth } from "../context/authContext";
import { useTranslation } from "react-i18next";


const SignIn = () => {
  const { t } = useTranslation();
  const { login, setMessage } = Auth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormDataChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.email && formData.email.length < 3) {
      newErrors.email = "Email must be at least 3 characters long.";
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else {
      const passwordPattern = /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

      if (!passwordPattern.test(formData.password)) {
        newErrors.password =
          "Password must include an uppercase letter, a number, and a special character.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:3001/users/login`,
          formData
        );
        if (response.data.status === "success") {
          setErrors({ form: " " });
          login(response.data.data.token);
          setMessage("You have successfully logged in.");

          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.data) {
          const errorMessage = err.response.data.message;
          if (errorMessage === "Email or password are incorrect") {
            setErrors({ form: "Email or password are incorrect." });
          } else {
            setErrors({ form: errorMessage });
          }
        } else {
          setErrors({ form: "Something went wrong!" });
        }
      }
    },
    [validateForm, formData, login, setMessage]
  );

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit}>
      {errors.form && (
        <div>
          <div className="error">{`${errors.form}`}</div>
        </div>
      )}

      <div className="flex flex-col gap-5 items-center relative">
        <div className="flex flex-col w-full text-right">
          <InputField
            labelName={t("email")}
            onChange={(value) => {
              handleFormDataChange("email", value);
            }}
            type="email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="flex flex-col w-full text-right">
          <InputField
            labelName={t("password")}
            onChange={(value) => {
              handleFormDataChange("password", value);
            }}
            type="password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button className="w-[30%]" type="submit">
          <span>{t("login_now")}</span>
        </button>
      </div>
    </form>
  );
};

export default SignIn;
