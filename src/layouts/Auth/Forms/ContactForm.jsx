import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import { IoMdClose } from 'react-icons/io';
import contact from '../../../assets/contact.png';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';
import { db } from '../../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { emailRegex } from '../../../utils/Capitalise';

const ContactForm = ({ className, handleContactForm, setContactFormPop }) => {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_text: '',
    contact_email: '',
  });
  const [message, setMessage] = useState(null);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setMessage(true);
    const { contact_name, contact_email, contact_text } = formData;
    if (emailRegex.test(contact_email)) {
      try {
        await addDoc(collection(db, 'messages'), {
          name: contact_name,
          text: contact_text,
          email: contact_email,
          timestamp: new Date(),
        });
        setTimeout(() => {
          toast('Message sent');
          setFormData({
            contact_name: '',
            contact_text: '',
            contact_email: '',
          });
          setContactFormPop((prev) => !prev);
        }, 2000);
      } catch (e) {
        toast(e.message);
      }
    }
  };

  return (
    <div
      className={`${className} grid grid-cols-1 md:grid-cols-2 gap-5 contact_form form`}
      data-aos='fade-up'
    >
      <div className='absolute -top-2 -right-2 border border-black bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center'>
        <IoMdClose
          className='text-white hover:cursor-pointer active:text-[red]'
          onClick={handleContactForm}
        />
      </div>
      <div className='flex justify-center items-center'>
        <img
          src={contact}
          alt='mail symbol'
          className='w-[50%] md:w-auto h-[10vh] md:h-auto'
        />
      </div>
      <form className='flex flex-col gap-5' onSubmit={handleSubmitContact}>
        <h1 className='h1_form'>Send a Message</h1>
        <Input
          type='text'
          placeholder='Name'
          name='contact_name'
          value={formData.contact_name}
          onChange={handleContactChange}
          minLength={3}
          required
        />
        {formData.contact_name && formData.contact_name.length < 3 && (
          <small className='text-red-400 text-[10px] md:text-[12px]'>
            Name should be more than 3 characters
          </small>
        )}
        <Input
          type='email'
          placeholder='Email address'
          name='contact_email'
          value={formData.contact_email}
          onChange={handleContactChange}
          minLength={3}
          required
        />
        {formData.contact_email && !emailRegex.test(formData.contact_email) && (
          <small className='text-red-400 text-[10px] md:text-[12px]'>
            Please enter a valid email address
          </small>
        )}
        <textarea
          className='textarea'
          cols={5}
          rows={10}
          placeholder='Message'
          name='contact_text'
          value={formData.contact_text}
          onChange={handleContactChange}
          minLength={15}
          required
        />
        {formData.contact_text && formData.contact_text.length < 15 && (
          <small className='text-red-400 text-[10px] md:text-[12px]'>
            Message should be more than 15 characters
          </small>
        )}
        <Button
          type='submit'
          className='contact_btn'
          text={
            !message ? (
              'Send'
            ) : (
              <>
                Sending <Loader className='flex' size={30} single />
              </>
            )
          }
          disable={
            formData.contact_name.length < 3 ||
            formData.contact_text.length < 15 ||
            !emailRegex.test(formData.contact_email)
          }
        />
      </form>
    </div>
  );
};

export default ContactForm;
