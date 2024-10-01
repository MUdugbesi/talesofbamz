import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { LoginForm, SignUpForm } from '../index';
import { useAuth } from '../../context';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const RootLayout = () => {
  const [formType, setFormType] = useState(null);
  const { userLoggedIn, currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDoc = async () => {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      querySnapshot.forEach((doc) => {
        if (currentUser) {
          if (currentUser.email === doc.data().email) {
            setUser(doc.data().username);
          } else {
            setUser(null);
          }
        }
      });
    };

    getDoc();
  }, [user, currentUser]);

  useEffect(() => {
    if (userLoggedIn && currentUser) {
      navigate('/gallery');
    }
  }, [userLoggedIn]);

  const toggleSigninForm = () => {
    if (userLoggedIn) {
      navigate('/gallery');
    } else {
      setFormType((prevType) => (prevType === 'signin' ? null : 'signin'));
    }
  };
  const handleSignUpForm = () => {
    setFormType((prevType) => (prevType === 'signup' ? 'signin' : 'signup'));
  };
  const handleSignUpFormClose = () => {
    setFormType(null);
  };

  return (
    <main>
      {formType === 'signin' && !userLoggedIn && (
        <>
          <LoginForm
            handleUploadOverlay={toggleSigninForm}
            handleSignUpForm={handleSignUpForm}
            className='absolute mx-auto w-screen'
            user={user}
          />
        </>
      )}
      {formType === 'signup' && !userLoggedIn && (
        <>
          <SignUpForm
            onClick={handleSignUpForm}
            onClose={handleSignUpFormClose}
            className='absolute mx-auto w-screen'
            user={user}
          />
        </>
      )}
      {((formType === 'signin' && !userLoggedIn) ||
        (formType === 'signup' && !userLoggedIn)) && (
        <div className='overlay'></div>
      )}
      <NavBar
        handleUploadOverlay={toggleSigninForm}
        userLoggedIn={userLoggedIn}
        user={user}
      />
      <Outlet
        context={{
          toggleSigninForm,
          handleSignUpForm,
          user,
        }}
      />
    </main>
  );
};

export default RootLayout;
