import { useState } from "react";
import { RegisterMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { selectRegisterError } from "./userSlice";
import { register } from "./userThunk";
const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);
  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName].message;
  };
  const [state, setState] = useState<RegisterMutation>({
    username: "",
    password: "",
  });
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={submitFormHandler}>
          <h3 className="text-center my-4">Sign up</h3>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="name"
              required
              name="username"
              onChange={inputChangeHandler}
              className="form-control"
            />
            <span className="text-6 text-danger">
              {getFieldError("username")}
            </span>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              name="password"
              onChange={inputChangeHandler}
              className="form-control"
            />
            <span className="text-6 text-danger">
              {getFieldError("username")}
            </span>
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
