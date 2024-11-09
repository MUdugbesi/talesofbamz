import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Input, NavBar } from '../../components';
import { ContactForm, LoginForm, SignUpForm } from '../index';
import { useAuth } from '../../context';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { Footer } from '../../pages';

const RootLayout = () => {
  const [formType, setFormType] = useState(null);
  const { userLoggedIn, currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [mobileToggleMenu, setMobileToggleMenu] = useState(false);
  const [contactFormPop, setContactFormPop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn && currentUser) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const getDoc = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Users'));
        const userDoc = querySnapshot.docs.find(
          (doc) => currentUser && currentUser.email === doc.data().email
        );

        if (userDoc) {
          setUser(userDoc.data().username);
        } else {
          setUser(currentUser ? 'Anonymous' : null);
        }
      } catch (error) {
        console.error('Error fetching user document:', error);
        setUser('Anonymous');
      }
    };
    getDoc();
  }, [currentUser, user]);

  const toggleSigninForm = () => {
    if (userLoggedIn) {
      navigate('/gallery');
    } else {
      setFormType((prevType) => (prevType === 'signin' ? null : 'signin'));
      setMobileToggleMenu((prev) => !prev);
    }
  };
  const handleSignUpForm = () => {
    setFormType((prevType) => (prevType === 'signup' ? 'signin' : 'signup'));
  };
  const handleSignUpFormClose = () => {
    setFormType(null);
  };
  const handleMobilemobileToggleMenu = () => {
    setMobileToggleMenu((prev) => !prev);
  };
  const handleContactPopOver = () => {
    setContactFormPop((prev) => !prev);
  };

  return (
    <>
      <main className='relative w-[90%] h-auto min-h-[100vh] mx-auto rounded-lg mt-5 pt-1 main pb-5'>
        {formType === 'signin' && !userLoggedIn && (
          <>
            <LoginForm
              handleUploadOverlay={toggleSigninForm}
              handleSignUpForm={handleSignUpForm}
              className='absolute mx-auto w-full'
              user={user}
            />
          </>
        )}
        {formType === 'signup' && !userLoggedIn && (
          <>
            <SignUpForm
              onClick={handleSignUpForm}
              onClose={handleSignUpFormClose}
              className='absolute mx-auto w-full'
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
          setFormType={setFormType}
          onMobileToggle={handleMobilemobileToggleMenu}
          mobileToggleMenu={mobileToggleMenu}
          setMobileToggleMenu={setMobileToggleMenu}
        />
        <Outlet
          context={{
            toggleSigninForm,
            handleSignUpForm,
            user,
            username,
          }}
        />
        {contactFormPop && (
          <div className='absolute mx-auto w-full inset-0 top-10'>
            <ContactForm
              handleContactForm={handleContactPopOver}
              setContactFormPop={setContactFormPop}
            />
            <div className='overlay'></div>
          </div>
        )}
      </main>
      <Footer handleContactPopOver={handleContactPopOver} />
    </>
  );
};

export default RootLayout;
