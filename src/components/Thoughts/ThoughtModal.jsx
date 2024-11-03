import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { db } from '../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { IoMdClose } from 'react-icons/io';

const ThoughtModal = ({
  className,
  setAddThoughtToggle,
  handleToggleThought,
  fetchThoughts,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    thought: '',
  });

  const handleThoughtChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddThought = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, 'thoughts'), {
        name: formData.name,
        thought: formData.thought,
        timestamp: new Date(),
      });
      toast.success('Thought added successfully!');
      setFormData({ name: '', thought: '' });
      setAddThoughtToggle((prev) => !prev);
      fetchThoughts();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = isLoading ? (
    <>
      Adding thoughts{' '}
      <Loader className='flex' size={30} type='dot' color='white' />
    </>
  ) : (
    'Add wishes'
  );

  return (
    <div className={`${className} form max-lg:w-full`}>
      <form className='flex flex-col gap-3 ' onSubmit={handleAddThought}>
        <div className='absolute -top-2 -right-2 border border-black bg-black rounded-full w-[30px] h-[30px] flex justify-center items-center'>
          <IoMdClose
            className='text-white hover:cursor-pointer active:text-[red]'
            onClick={handleToggleThought}
          />
        </div>
        <h1 className='h1_form'>Add your wishes</h1>
        <Input
          placeholder='Name'
          name='name'
          value={formData.name}
          onChange={handleThoughtChange}
          minLength={3}
        />
        {formData.name && formData.name.length < 3 && (
          <small className='text-red-400'>
            Name should be more than 3 characters
          </small>
        )}
        <textarea
          placeholder='Wishes / Thoughts'
          className='textarea'
          cols={5}
          rows={10}
          name='thought'
          value={formData.thought}
          onChange={handleThoughtChange}
          minLength={10}
        />
        {formData.thought && formData.thought.length < 10 && (
          <small className='text-red-400'>
            Wishes should be more than 10 characters
          </small>
        )}
        <Button
          type='submit'
          className='contact_btn w-full h-[50px]'
          text={buttonText}
          disable={formData.name.length < 3 || formData.thought.length < 10}
        />
      </form>
    </div>
  );
};

export default ThoughtModal;
