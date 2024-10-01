import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import UploadButton from '../Button/UploadButton';
import Button from '../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { useAuth } from '../../context';

const NavBar = ({ handleUploadOverlay, user, userLoggedIn }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentUser } = useAuth();
  const handleUserLogout = async () => {
    try {
      await signOut(auth);
      toast.success('User signed out');
    } catch (e) {
      console.error(e);
      toast.error('Unable to sign out user');
    }
  };

  console.log(user);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
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
          className={`${userLoggedIn && 'hidden'} upload px-5 flex`}
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

        {!toggleMenu ? (
          <IoMdMenu className='mobile_icon' onClick={handleToggleMenu} />
        ) : (
          <IoMdClose className='mobile_icon' onClick={handleToggleMenu} />
        )}

        {toggleMenu && (
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
              {user ? (
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
