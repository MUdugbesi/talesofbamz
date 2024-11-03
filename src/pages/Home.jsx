import React from 'react';
import { Card, UploadButton } from '../components/';
import { Link, useOutletContext } from 'react-router-dom';
import couples from '../assets/couple.png';
import { useAuth } from '../context';
import { Image } from '../utils/FramerMotion';

const Home = () => {
  const { toggleSigninForm, user } = useOutletContext();
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <>
      {user && userLoggedIn && (
        <p className='signedin_user' data-aos='fade-up'>
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
            <p className='title' data-aos='zoom-in' data-aos-delay='1000'>
              Capture Moments of Love!
            </p>
            <p className='sub-title' data-aos='zoom-in' data-aos-delay='2000'>
              Capture and share every moment that captivates your heart
            </p>
            <div data-aos='fade-right' data-aos-delay='3000'>
              <Link
                to={userLoggedIn ? '/gallery' : ''}
                className='mt-10'
                data-aos='fade-right'
                data-aos-delay='3000'
              >
                <UploadButton
                  text='Upload Photos'
                  className='upload flex justify-center w-[80%] md:w-[50%] h-[70px] rounded-full max-lg:mx-auto'
                  onClick={toggleSigninForm}
                />
              </Link>
            </div>
            <p
              className='mt-10 w-[95%] p-2 max-lg:mx-auto max-lg:text-center max-md:text-sm'
              data-aos='zoom-in'
              data-aos-delay='3000'
            >
              Take a beautiful and memorable photo of this special day and share
              this with the{' '}
              <span className='italic font-[500] text-red-500'>
                latest couple{' '}
              </span>
              and friends
            </p>
          </div>
        </div>

        <div
          className='flex justify-center items-center'
          data-aos='flip-right'
          data-aos-delay='300'
        >
          <div className='border-t-2 border-[#adebb3] rounded-t-full p-10 rounded-b-none'>
            <Image
              src={couples}
              alt='couple_image'
              className='w-[100%] h-auto object-fit border-2 border-[var(--bg)] p-2 rounded-full max-md:h-[400px] lg:h-[600px]'
            />
          </div>
        </div>

        <div className='text-[12px] md:text-[16px] w-[90%] md:w-[70%] mx-auto h-full flex justify-center items-center text-justify text-wrap animate__animated animate__bounceInDown animate__delay-2s'>
          Welcome to the celebration of love and togetherness! Join us as we
          embark on the most beautiful chapter of our lives. We are thrilled to
          have you share in the joy of our special day.
        </div>
      </div>
    </>
  );
};

export default Home;
