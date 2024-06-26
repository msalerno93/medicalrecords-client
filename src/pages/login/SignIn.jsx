import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../auth/authSlice'
import Button from "../../components/Button";
import { useEffect, useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    if (isSuccess || user) {
      navigate('/patients')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleLogin = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <div className="pt-24 pb-10 px-5 text-center items-center font-bolder">
      <div className="text-center items-center">
        <p className="text-red-500">
          PLEASE NOTE: This is not a mobile-friendly application
        </p>
        <p className="text-red-500">
          Access to patient records outside of the office is a HIPAA violation
        </p>
        <div className="flex justify-center py-4">
          <img
            width={350}
            src="https://previews.123rf.com/images/yupiramos/yupiramos1803/yupiramos180323656/97722776-people-team-medical-professional-medicine-clipboard-vector-illustration.jpg"
            alt=""
          />
        </div>

        <form onSubmit={handleLogin} className="">
          <div className="flex justify-center">
            <div className="flex justify-center items-center">
              <p className="text-xl">Email:</p>{" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="m-2 rounded-lg text-bold pl-2 text-lg"
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="text-xl">Password:</p>{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="m-2 rounded-lg text-bold pl-2 text-lg"
              />
            </div>
          </div>
          <Button type='submit'>Log In!</Button>
        </form>
        <div className="flex justify-center">
          <p className="pr-2 font-extrabold text-lg">Don't have an account?</p>{" "}
          <Link className="hover:text-white text-lg" to="/signup">
            Sign Up!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
