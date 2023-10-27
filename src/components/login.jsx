import { useEffect, useState } from "react";
import { logo } from "../constants/logo";
import Input from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { signUserFailure, signUserStart, signUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import ValidationError from "./validation-error";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const loginHandler = async e => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = { email, password }
    try {
      const response = await AuthService.userLogin(user)
      dispatch(signUserSuccess(response.user));
      navigate('/')
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }

  useEffect(() => {
		if (loggedIn) {
			navigate('/')
      toast.success("Akkauntingizga kirdingiz!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
		}
    //eslint-disable-next-line
	}, [loggedIn])
  return (
    <div>
      <main className="form-signin w-25 m-auto text-center">
        <form>
          <img className="mb-4" src={logo} alt="" width="72" />
          <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
          <ValidationError />
          <Input
            type={"email"}
            label={"Email address"}
            state={email}
            setState={setEmail}
          />
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            setState={setPassword}
          />
          <button
            className="btn btn-primary w-100 py-2 mt-3"
            type="submit"
            onClick={loginHandler}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : "Log In"}
          </button>
          <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
