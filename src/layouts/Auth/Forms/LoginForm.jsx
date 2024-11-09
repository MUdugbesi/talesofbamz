import { useState, useEffect } from 'react';
import { Input, Button } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { auth } from '../../../firebase/firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';

import { toast } from 'react-toastify';
import { emailRegex } from '../../../utils/Capitalise';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Loader from '../../../components/Loader/Loader';

const LoginForm = ({ handleUploadOverlay, className, handleSignUpForm }) => {
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassord] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const { email, password } = formData;

    if (emailRegex.test(email)) {
      try {
        const loggedIn = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (loggedIn) {
          toast.success('User logged in successfully');
        } else {
          toast.error('Error signing in - check credentials and try again');
        }
      } catch (e) {
        console.error(e);
        toast.error('Error signing in - check credentials and try again');
        setLoggingIn(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // Reload user to get the latest data if needed
      }
      console.log(user);
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [auth]);

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    if (user && token) {
      navigate('/');
      toast.success('User logged in successfully');
    }
  };
  const handleShowPassword = () => {
    setShowPassord((prev) => !prev);
  };

  const handleResetPassword = async () => {
    const { email } = formData;
    const actionCodeSettings = {
      url: 'https://talesofbamz24.netlify.app',
      handleCodeInApp: true,
    };
    try {
      if (email) {
        await sendPasswordResetEmail(auth, email, actionCodeSettings);
        toast.success(`Password reset link sent to ${email}`);
      } else {
        toast.error(`Enter a valid credential`);
      }
    } catch (e) {
      toast.error('Error', e.message);
    }
  };

  return (
    <div className={className}>
      <form
        className='form flex justify-center items-center'
        data-aos='fade-right'
      >
        <div className='absolute -top-2 -right-2 border border-black bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center'>
          <IoMdClose
            className='text-white hover:cursor-pointer active:text-[red]'
            onClick={handleUploadOverlay}
          />
        </div>
        <div className='flex flex-col w-full h-full'>
          <Button
            className='btn font-[500] gap-2'
            text='Sign in with Google'
            type='google'
            onClick={handleLoginWithGoogle}
          />
          <div className='flex justify-center items-center gap-2 mt-5 mb-5'>
            <hr className='border border-[#acacacb1] w-[50px] md:w-[100px]' />
            <p className='text-[10px]'>or sign in with email</p>
            <hr className='border border-[#acacacb1 w-[50px] md:w-[100px]' />
          </div>

          <Input
            placeholder='Email'
            name='email'
            type='email'
            onChange={handleLoginChange}
            value={formData.email}
          />
          {formData.email && !emailRegex.test(formData.email) && (
            <small className='text-red-400 text-[10px]'>
              Please enter a valid email address
            </small>
          )}
          <p
            className='underline text-end text-[10px] md:text-sm  mb-2 mt-2 hover:cursor-pointer'
            onClick={handleResetPassword}
          >
            Forgot?
          </p>
          <div className='relative'>
            <Input
              placeholder='Password'
              name='password'
              type={showPassword && 'password'}
              onChange={handleLoginChange}
              value={formData.password}
            />
            <div className='absolute right-4 top-3 md:top-5'>
              {!showPassword ? (
                <FaEye onClick={handleShowPassword} />
              ) : (
                <FaEyeSlash onClick={handleShowPassword} />
              )}
            </div>
          </div>

          <Button
            className='btn font-[500] gap-2 mt-10 bg-[#780478] text-white hover:opacity-80'
            text={
              !loggingIn ? (
                'Log in'
              ) : (
                <div className='flex gap-2'>
                  Logging in
                  <Loader type='spin' size={20} color='#fff' />
                </div>
              )
            }
            onClick={handleLoginFormSubmit}
            disable={!emailRegex.test(formData.email) || !formData.password}
          />
          <p className='md:text-sm text-[#00000093] text-end mt-4 text-[10px]'>
            Don't have an account?{' '}
            <Link
              className='underline text-blue-300 hover:text-blue-600'
              onClick={handleSignUpForm}
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
