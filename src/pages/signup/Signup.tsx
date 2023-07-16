import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignupUserMutation } from "../../redux/features/user/userApi";
import { toast } from "react-hot-toast";
import {useEffect} from 'react';
const Signup = () => {
  type SignupFormValues = {
    email: string;
    password: string;
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormValues>();
  const [signup, { isError, isLoading, isSuccess, error }] =
    useSignupUserMutation();
  const navigate = useNavigate();
  const onSignup = (values: SignupFormValues) => {
    signup(values);
  };
  
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("User registered successfully! please login");
      navigate("/login");
    }

    if (!isLoading && isError && error) {
      if (error?.data?.errorMessages[0]?.message.includes("duplicate ")) {
        toast.error("Email already used, please login");
      }
    }
  }, [isLoading, isSuccess, isError, error, navigate]);



  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-xl ">
        <h2 className="text-xl text-center font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit(onSignup)}>
          <div className="form-control w-full ">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full "
              {...register("email", { required: "Email Address is required" })}
            />
            {errors.email && (
              <p className="mt-2 text-red-600" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or more!",
                },
              })}
            />
            {errors.password && (
              <p className="mt-2 text-red-600" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>

          <input
            className="btn btn-accent w-full mt-5"
            type="submit"
            value="Sign Up"
          />
          {/* {signupError && <p className="mt-2 text-red-600">{signupError}</p>} */}
        </form>

        <p className="text-center mt-4">
          Already have an account ?{" "}
          <Link className="text-primary " to="/login">
            please login
          </Link>{" "}
        </p>
        {/* <div className="divider">OR</div>
        <button onClick={handleGoogleSignup} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button> */}
      </div>
    </div>
  );
};

export default Signup;
