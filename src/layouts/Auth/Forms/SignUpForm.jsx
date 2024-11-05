import React, { useState } from 'react';
import { Input, Button } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { auth, db } from '../../../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import { toast } from 'react-toastify';

const SignUpForm = ({ onClick, onClose, className }) => {
  const navigate = useNavigate();

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
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, username } = formData;
    try {
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
      }
    } catch (e) {
      console.error('Error', e);
      toast.error(
        'Unable to create user account - check credentials and try again',
        { className: 'text-sm' }
      );
    }
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
            <Input
              placeholder='Name'
              name='name'
              value={formData.name}
              onChange={handleSignupChange}
            />
            <Input
              placeholder='Username'
              name='username'
              value={formData.username}
              onChange={handleSignupChange}
            />
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
            <Input
              placeholder='Password'
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleSignupChange}
            />
          </div>
          <Button
            className='btn font-[500] gap-2 mt-10 bg-[#780478] text-white hover:opacity-80'
            text='Create Account'
            onClick={handleSignUpSubmit}
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
