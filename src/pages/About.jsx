import React from 'react';

const About = () => {
  return (
    <div className='about font-rubik'>
      <div>
        <div className='p-6 text-[#00000093]'>
          <h1 className='text-center font-[500] text-2xl p-2 uppercase text-[#000000d7]'>
            Our Journey Together
          </h1>
          <p className='text-justify'>
            Welcome to our wedding gallery website! We are{' '}
            <span className='font-[500] italic'>the Bamideles</span>, and this
            is our story. From the moment we met, we knew that our lives were
            destined to be intertwined. Through every adventure, challenge, and
            unforgettable moment, we’ve grown together and are so excited to
            begin the next chapter of our lives as one.
          </p>
          <br />
          <p className='text-justify'>
            This website is a space we created to share our love story with all
            of you — our cherished family and friends — who have supported us
            along the way. We want this to be more than just a place for wedding
            updates; it’s a digital scrapbook filled with the memories we’ll
            treasure for a lifetime.
          </p>
        </div>
        <div className='p-6 text-[#00000093] lg:mt-24'>
          <h2 className='text-center font-[500] text-md p-2 uppercase text-[#000000d7]'>
            Why This Site?
          </h2>
          <p className='text-justify'>
            Our wedding day is one of the most important days of our lives, and
            we didn’t want a single moment to be forgotten. That’s why we built
            this website — to gather and share the beautiful memories from our
            special day with everyone who means the world to us. This is a place
            where you, our beloved guests, can contribute your photos, thoughts,
            and well-wishes, helping us build a gallery that we’ll look back on
            for years to come.
          </p>
        </div>
      </div>
      <div className='grid grid-rows-2 min-h-[75vh] h-auto gap-10 text-[#00000093]'>
        <div className='p-6 lg:p-12'>
          <h3 className='text-center text-lg p-2 text-[#000000d7] font-[500]'>
            How It Works
          </h3>
          <ol className='list-decimal p-2 text-justify'>
            <li className='pb-4'>
              <span className='font-[500] text-black'>
                Upload Your Photos:{' '}
              </span>
              Have any beautiful, funny, or emotional moments from our wedding?
              We’d love to see them! You can easily upload your photos here so
              we can relive those memories from your perspective.
            </li>
            <li className='pb-4'>
              <span className='font-[500] text-black'>View Our Gallery: </span>
              We’ve gathered some of our favorite photos from the wedding day,
              and we invite you to explore the gallery and remember the magic
              with us.
            </li>
            <li>
              <span className='font-[500] text-black'>Stay Connected: </span>
              Our journey doesn’t end at the wedding. Check back for updates as
              we continue to share our life’s moments, adventures, and
              milestones.
            </li>
          </ol>
        </div>
        <div className='p-6 lg:p-12 pt-2'>
          <h3 className='text-[#000000d7] font-[500]'>A Special Thanks</h3>
          <p className='mt-4 italic'>
            To all of our loved ones, thank you for being part of our story.
            You’ve shaped who we are as individuals and as a couple, and we’re
            beyond grateful to celebrate our wedding with you. Your presence on
            our special day, whether in person or through your warm wishes,
            means the world to us.
          </p>
          <p className='mt-5'>
            With love and gratitude,
            <br />
            <span className='italic text-primary'>TalesofBamz'24</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
