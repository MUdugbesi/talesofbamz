import React from 'react';
import { Card, UploadButton } from '../components/';
import { Link, useOutletContext } from 'react-router-dom';
import couples from '../assets/couple.png';
import { useAuth } from '../context';

const Home = () => {
  const { toggleSigninForm, user } = useOutletContext();
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <>
      {user && userLoggedIn && (
        <p className='signedin_user'>
          Hi <span className='font-cookie text-3xl'>{user}</span>
        </p>
      )}
      {currentUser && userLoggedIn
        ? currentUser.displayName && (
            <p className='signedin_user'>
              Hi{' '}
              <span className='font-cookie text-3xl'>
                {currentUser.displayName}
              </span>
            </p>
          )
        : ''}
      <div className='dashboard'>
        <div className='p-5'>
          <div className='home-desc'>
            <p className='title'>Capture Moments of Love!</p>
            <p className='sub-title'>
              Capture and share every moment that captivates your heart
            </p>
            <Link to={userLoggedIn ? '/gallery' : ''} className='mt-10'>
              <UploadButton
                text='Upload Photos'
                className='upload flex justify-center w-[80%] md:w-[50%] h-[70px] rounded-full max-lg:mx-auto'
                onClick={toggleSigninForm}
              />
            </Link>
            <p className='mt-10 w-[95%] p-2 max-lg:mx-auto max-lg:text-center max-md:text-sm'>
              Take a beautiful and memorable photo of this special day and share
              this with the{' '}
              <span className='italic font-[500] text-red-500'>
                latest couple{' '}
              </span>
              and friends
            </p>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className='border-t-2 border-[#ff7782] rounded-t-full p-10 rounded-b-none'>
            <img
              src={couples}
              alt='couple_image'
              className='object-cover border-2 border-[#adebb3] rounded-full max-md:h-[400px] lg:h-[600px]'
            />
          </div>
        </div>

        <div className='w-[90%] md:w-[70%] mx-auto h-full flex flex-col justify-evenly '>
          <Card
            text='Wishing you joy, love, and happiness on your wedding day and as you begin your new life together'
            className='translate-x-10 max-md:mb-10 max-lg:mb-14'
          />
          <Card
            icon='heart'
            text='May the years ahead be filled with nothing but hugs and kisses, because no one deserves happily ever after more than you both!'
            className='-translate-x-10 text-primary max-md:mb-10 max-lg:mb-14'
          />
          <Card
            text='Wishing you joy, love, and happiness on your wedding day and as you begin your new life together'
            className='translate-x-10 max-md:mb-10 max-lg:mb-14'
          />
        </div>
      </div>
    </>
  );
};

export default Home;
