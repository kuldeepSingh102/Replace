import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function OTPVerificationForm({ setIsLoginSuccess }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = data => {
      // Handle OTP verification submission here
      // console.log(data);
      // Set isLoginSuccess to true after successful login
      setIsLoginSuccess(true);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>OTP Verification</h2>
        <div className='form-group'>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            {...register('otp', { required: 'OTP is required',
            maxLength: { value: 5, message: "maximum length is 5" },minLength:{value:5,message:"minimum length is 5"}})}
          />
          {errors.otp && <p>{errors.otp.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
}
export default OTPVerificationForm;