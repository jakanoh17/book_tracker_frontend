import { useFormAndValidation } from "../../utils/useFormAndValidation";

export default function AuthFormModal({ emailName, passwordName }) {
  const { values, errors, handleChange, isValid } = useFormAndValidation();

  return (
    <form action="" className="auth">
      <p className="auth__input-title">Email</p>
      <span className="auth__span-message">{errors[emailName]}</span>
      <input
        type="email"
        className="auth__input"
        name={emailName}
        value={values[emailName] || ""}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <p className="auth__input-title">Password</p>
      <span className="auth__span-message">{errors[passwordName]}</span>
      <input
        type="password"
        className="auth__input"
        name={passwordName}
        value={values[passwordName] || ""}
        onChange={handleChange}
        placeholder="Enter password"
      />
      <button
        className={`auth__submit-btn ${isValid && "auth__submit-btn_enabled"}`}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
