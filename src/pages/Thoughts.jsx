import React, { useEffect, useState } from 'react';
import { Button, ThoughtModal } from '../components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-toastify';
import Loader from '../components/Loader/Loader';
import ThoughtCard from '../components/Cards/ThoughtCard';
import { animate, motion, useMotionValue } from 'framer-motion';
import useMeasure from 'react-use-measure';

const Thoughts = () => {
  const [thoughtsArray, setThoughtsArray] = useState([]);
  const [addThoughtToggle, setAddThoughtToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const slow_duration = 75;
  const fast_duration = 20;
  const [duration, setDuration] = useState(fast_duration);

  const handleToggleThought = () => {
    setAddThoughtToggle((prev) => !prev);
  };

  const fetchThoughts = async () => {
    setLoading(true);
    setError(false);

    try {
      const thoughtsQuery = query(collection(db, 'thoughts'));
      const thoughtsDocs = await getDocs(thoughtsQuery);
      const thoughtsData = thoughtsDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (thoughtsData.length > 0) {
        setThoughtsArray(thoughtsData);
      } else {
        setThoughtsArray([]);
        setError(true);
      }
    } catch (e) {
      toast.error(e.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchThoughts();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setReRender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width - screen.width;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: 'linear',
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setReRender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [
    xTranslation,
    width,
    thoughtsArray.length,
    rerender,
    mustFinish,
    duration,
  ]);

  return (
    <div className='w-[90%] md:w-[80%] lg:w-[80%] mx-auto min-h-[70vh] p-4 rounded-lg relative flex flex-col justify-center items-center'>
      <div className='lg:w-[40%] mx-auto flex flex-col justify-center items-center mb-3'>
        <p className='text-center'>
          Want to share your thoughts and wishes with the couple and friends??
        </p>

        <Button
          type='button'
          text='Add wishes'
          className='upload flex justify-center w-full md:w-[40%] h-[50px] rounded-full max-lg:mx-auto mt-5'
          onClick={handleToggleThought}
        />
      </div>

      {addThoughtToggle && (
        <>
          <div className='absolute mx-auto w-full inset-0'>
            <ThoughtModal
              setAddThoughtToggle={setAddThoughtToggle}
              handleToggleThought={handleToggleThought}
              fetchThoughts={fetchThoughts}
            />
          </div>
          <div className='overlay'></div>
        </>
      )}

      {loading ? (
        <Loader
          className='relative flex justify-center items-center flex-col gap-3 mt-20'
          size={70}
          type='comment'
        />
      ) : error ? (
        <p className='text-center mt-20 text-red-500'>
          No thoughts available😔
        </p>
      ) : (
        <div
          className='flex w-full mt-20 gap-5 overflow-hidden'
          onMouseEnter={() => {
            setMustFinish(true);
            setDuration(slow_duration);
          }}
          onMouseLeave={() => {
            setMustFinish(true);
            setDuration(fast_duration);
          }}
        >
          {thoughtsArray.map((thought) => (
            <motion.div key={thought.id} ref={ref} style={{ x: xTranslation }}>
              <ThoughtCard thought={thought} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thoughts;
