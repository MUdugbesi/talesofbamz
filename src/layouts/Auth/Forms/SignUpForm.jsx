import React, { useState } from 'react';
import { Input, Button } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { auth, db } from '../../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import {
  validateCredentials,
  validatePassword,
  emailRegex,
} from '../../../utils/Capitalise';
import Loader from '../../../components/Loader/Loader';

const SignUpForm = ({ onClick, onClose, className }) => {
  const navigate = useNavigate();
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [showPassword, setShowPassord] = useState(true);
  const [passwordValidations, setPasswordValidations] = useState({});

  const [formData, setFormData] = useState({
    name: 'Marvelous',
    username: 'sparkle',
    email: 'udugbesimarves@gmail.com',
    password: 'wewesco50#',
  });
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      const valid = validatePassword(value);
      setPasswordValidations(valid);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setCreatingAccount(true);
    const { email, password, name, username } = formData;
    const validatedCredentials = validateCredentials(
      name,
      username,
      email,
      password
    );
    try {
      if (validatedCredentials) {
        const signedUp = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = auth.currentUser;
        if (signedUp && user) {
          await setDoc(doc(db, 'Users', user.uid), {
            id: user.uid,
            email: user.email,
            name: name,
            username: username,
          });
          navigate('/');
          toast.success('User account created successfully');
        } else {
          toast.error('Check credentials and try again');
          setCreatingAccount(false);
        }
      } else {
        toast.error('Check credentials and try again');
        setCreatingAccount(false);
      }
    } catch (e) {
      console.error('Error', e);
      toast.error(
        'Unable to create user account - check credentials and try again',
        { className: 'text-sm' }
      );
      setCreatingAccount(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassord((prev) => !prev);
  };

  return (
    <div className={className}>
      <form className='form'>
        <div className='absolute -top-2 -right-2 border border-black bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center'>
          <IoMdClose
            className='text-white hover:cursor-pointer active:text-[red]'
            onClick={onClose}
          />
        </div>
        <div className='flex flex-col w-full h-full'>
          <Button
            className='btn font-[500] gap-2'
            text='Sign up with Google'
            type='google'
            onClick={onClick}
          />
          <div className='flex justify-center items-center gap-2 mt-5 mb-5'>
            <hr className='border border-[#acacacb1] w-[50px] md:w-[100px]' />
            <p className='md:text-[10px] text-[10px]'>or sign up with email</p>
            <hr className='border border-[#acacacb1] w-[50px] md:w-[100px]' />
          </div>

          <div className='flex gap-3 mb-4'>
            <div className='flex flex-col'>
              <Input
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleSignupChange}
              />
              {formData.name && formData.name.length < 3 && (
                <small className='text-[10px] text-red-500 mt-[2px]'>
                  Enter more than 3 characters
                </small>
              )}
            </div>
            <div className='flex flex-col'>
              <Input
                placeholder='Username'
                name='username'
                value={formData.username}
                onChange={handleSignupChange}
              />
              {formData.username && formData.username.length < 3 && (
                <small className='text-[10px] text-red-500 mt-[2px]'>
                  Enter more than 3 characters
                </small>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <Input
              placeholder='Username or Email'
              label='Email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleSignupChange}
            />
            {formData.email && !emailRegex.test(formData.email) && (
              <small className='text-red-400 text-[10px]'>
                Please enter a valid email address
              </small>
            )}
            <div className='relative'>
              <Input
                placeholder='Password'
                label='Password'
                type={showPassword && 'password'}
                name='password'
                value={formData.password}
                onChange={handleSignupChange}
              />
              <div className='absolute right-4 top-[35px] md:top-[42px]'>
                {showPassword ? (
                  <FaEyeSlash onClick={handleShowPassword} />
                ) : (
                  <FaEye onClick={handleShowPassword} />
                )}
              </div>
            </div>

            {formData.password && validatePassword(formData.password) && (
              <small className='text-red-400 text-[8px] md:text-[10px]'>
                <ul>
                  {!passwordValidations.hasUppercase && (
                    <li>Password must contain at least one uppercase letter</li>
                  )}
                  {!passwordValidations.hasSpecialChar && (
                    <li>
                      Password must contain at least one special letter
                      [!@#$%^&*]
                    </li>
                  )}
                  {!passwordValidations.hasDigit && (
                    <li>Password must contain at least one number</li>
                  )}
                  {!passwordValidations.minLength && (
                    <li>Password must be a minimum of 8 characters</li>
                  )}
                </ul>
              </small>
            )}
          </div>

          <Button
            className='btn font-[500] gap-2 mt-10 bg-[#780478] text-white hover:opacity-80'
            text={
              !creatingAccount ? (
                'Create Account'
              ) : (
                <div className='flex gap-2'>
                  Creating Account
                  <Loader type='spin' size={20} color='#fff' />
                </div>
              )
            }
            onClick={handleSignUpSubmit}
            disable={
              !validateCredentials(
                formData.name,
                formData.username,
                formData.email,
                formData.password
              )
            }
          />

          <p className='md:text-sm text-[#00000093] text-end mt-4 text-[10px]'>
            Already have an account?{' '}
            <Link
              className='underline text-blue-300 hover:text-blue-600'
              onClick={onClick}
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
