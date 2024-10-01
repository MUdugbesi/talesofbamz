import { useState } from 'react';
import { Input, Button } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { auth } from '../../../firebase/firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { toast } from 'react-toastify';

const LoginForm = ({ handleUploadOverlay, className, handleSignUpForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'test@gmail.com',
    password: 'wewesco50#',
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
    const { email, password } = formData;
    try {
      const loggedIn = await signInWithEmailAndPassword(auth, email, password);
      if (loggedIn) {
        toast.success('User logged in successfully');
      } else {
        toast.error('Error signing in - check credentials and try again');
      }
    } catch (e) {
      console.error(e.message);
      toast.error('Error signing in - check credentials and try again');
    }
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    // / Sign in using a popup.
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    // This gives you a Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    if (user && token) {
      navigate('/');
      toast.success('User logged in successfully');
    }
  };

  return (
    <div className={className}>
      <form className='form'>
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
            <p className='md:text-sm text-[10px]'>or sign in with email</p>
            <hr className='border border-[#acacacb1 w-[50px] md:w-[100px]' />
          </div>

          <Input
            placeholder='Email'
            name='email'
            type='email'
            onChange={handleLoginChange}
            value={formData.email}
          />
          <p className='underline text-end text-sm mb-2 mt-2 hover:cursor-pointer'>
            Forgot?
          </p>
          <Input
            placeholder='Password'
            name='password'
            type='password'
            onChange={handleLoginChange}
            value={formData.password}
          />

          <Button
            className='btn font-[500] gap-2 mt-10 bg-[#780478] text-white hover:opacity-80'
            text='Sign in'
            onClick={handleLoginFormSubmit}
          />
          <p className='text-sm text-[#00000093] text-end mt-4'>
            Don't have an account?{' '}
            <Link className='underline' onClick={handleSignUpForm}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
