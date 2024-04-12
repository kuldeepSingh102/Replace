import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OTPVerificationForm from "./otp";
import "./App.css";

function LoginForm() {
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    setIsOTPVerified(true);
  };

  return (
    <div className="form-container">
      {!isOTPVerified && !isLoginSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                validate: {
                  containsCapitalNumberSpecial: (value) =>
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    ) ||
                    "Password must contain at least one capital letter, one number, one special character, and be at least 8 characters long",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <div className="form-group">
              <label htmlFor="countryCode"></label>Country code:
              <select name="countryCode">
                <option value="India">India (+91)</option>
                <option value="London">London (+44)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phoneno"></label>Phone Number:
              <input
                type="number"
                id="phoneno"
                {...register("phoneno", {
                  required: "PhoneNo. is required",
                  maxLength: { value: 10, message: "maximum length is 10" },
                  minLength: { value: 10, message: "minimum length is 10" },
                })}
              />
              {errors.phoneno && <p>{errors.phoneno.message}</p>}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : !isLoginSuccess ? (
        <OTPVerificationForm setIsLoginSuccess={setIsLoginSuccess} />
      ) : (
        <div>
          <h2>You have successfully logged in!</h2>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
