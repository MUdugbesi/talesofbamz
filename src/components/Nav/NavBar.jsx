/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import UploadButton from '../Button/UploadButton';
import Button from '../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { useAuth } from '../../context';

const NavBar = ({
  handleUploadOverlay,
  user,
  userLoggedIn,
  setFormType,
  onMobileToggle,
  mobileToggleMenu,
  setMobileToggleMenu,
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      await signOut(auth);
      toast.success('User signed out');
      navigate('/');
      setFormType(null);
      setMobileToggleMenu(false);
    } catch (e) {
      console.error(e);
      toast.error('Unable to sign out user');
    }
  };

  return (
    <>
      <nav className='nav'>
        <div className='logo-ctn'>
          <Link to='/'>
            <img src={Logo} className='logo-img' />
          </Link>
          <p className='text-primary'>TalesofBamz'24</p>
        </div>

        <ul className='navlist'>
          <NavLink
            to='/'
            className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}
          >
            About
          </NavLink>
          <NavLink
            to='/gallery'
            className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}
          >
            Gallery
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) => `navItem ${isActive ? 'active' : ''}`}
          >
            Contact
          </NavLink>
        </ul>

        <UploadButton
          text='Upload'
          className={`${
            userLoggedIn && 'hidden sm:hidden lg:flex'
          } upload px-5 max-md:hidden flex`}
          onClick={handleUploadOverlay}
        />
        {userLoggedIn ? (
          <div className='text-sm hidden md:flex flex-col lg:inline w-[20%] text-center justify-center items-center'>
            <span>Not {user || currentUser.displayName}?</span>{' '}
            <Button
              className='font-[500] hover:underline text-purple-500 text-sm'
              onClick={handleUserLogout}
              text='Log out'
            />
          </div>
        ) : (
          ''
        )}

        {/* mobile navbar */}

        {!mobileToggleMenu ? (
          <IoMdMenu className='mobile_icon' onClick={onMobileToggle} />
        ) : (
          <IoMdClose className='mobile_icon' onClick={onMobileToggle} />
        )}

        {mobileToggleMenu && (
          <>
            <ul className='navlist_mobile'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `navItem_mobile ${isActive ? 'active' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  `navItem_mobile ${isActive ? 'active' : ''}`
                }
              >
                About
              </NavLink>
              <NavLink
                to='/gallery'
                className={({ isActive }) =>
                  `navItem_mobile ${isActive ? 'active' : ''}`
                }
              >
                Gallery
              </NavLink>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  `navItem_mobile ${isActive ? 'active' : ''}`
                }
              >
                Contact
              </NavLink>
              <UploadButton
                text='Upload'
                className='upload px-5 flex md:hiden justify-center items-center w-[70%] mx-auto'
                onClick={handleUploadOverlay}
              />
              {user && userLoggedIn ? (
                <div className='text-sm text-center'>
                  <span>Not {user || currentUser.displayName}?</span>{' '}
                  <Button
                    className='font-[500] hover:underline text-purple-500 text-sm mt-28'
                    onClick={handleUserLogout}
                    text='Log out'
                  />
                </div>
              ) : (
                ''
              )}
            </ul>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
