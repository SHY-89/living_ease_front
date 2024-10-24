import styles from "./Login.module.css";
import classNames from "classnames/bind";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";
import { googleCallbackUri, googleClientId } from "../../Services/config.ts";
const cx = classNames.bind(styles);

type LoginFormsInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`;
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>();

  const onLoginGoogle = () => {
    window.location.href = googleSignInUrl;
  };
  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.email, form.password);
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)} className={cx("login-form")}>
      <div className={cx("login-div")}>
        <h1>로그인</h1>
        <input
          type="email"
          placeholder="이메일"
          {...register("email", { required: true })}
        />
        {errors.email ? (
          <p className={cx("password-warning")}>{errors.email.message}</p>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: true })}
        />
        {errors.password ? (
          <p className={cx("password-warning")}>{errors.password.message}</p>
        ) : (
          <div className={cx("password-warning")}>
            ※ 8자 이상 대문자, 소문자, 숫자, 특수문자 중 3가지 이상을 사용해
            주세요.
          </div>
        )}
      </div>

      <div className={cx("btn-container")}>
        <button className={cx("login-btn")} type="submit">
          로그인하기
        </button>
        <div className={cx("divider")}>
          <span>또는</span>
        </div>
        <button
          className={cx("google-btn")}
          type="button"
          onClick={onLoginGoogle}
        >
          구글 계정으로 로그인하기
        </button>
      </div>
    </form>
  );
};

export default Login;
