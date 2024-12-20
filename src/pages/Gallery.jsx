import { useEffect, useState } from 'react';
import { db, imageDb } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import ImageUploadModal from './ImageUploadModal';
import { Button, ImageCard } from '../components';
import { useAuth } from '../context';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from '../components/Swiper/Swiper';
import Loader from '../components/Loader/Loader';

const Gallery = () => {
  const [img, setImg] = useState(null);
  const [images, setImages] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const { user } = useOutletContext();
  const { userLoggedIn, currentUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [fetchSuccessful, setFetchSuccessful] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const handleUploadImage = async () => {
    setUploading(true);
    if (img !== null && currentUser) {
      const imgRef = ref(imageDb, `files/${uuid()}`);
      try {
        await uploadBytes(imgRef, img);
        const imgUrl = await getDownloadURL(imgRef);

        await addDoc(collection(db, 'images'), {
          url: imgUrl,
          uploaderName: currentUser.displayName || user || 'Anonymous',
          userId: currentUser.uid,
          timestamp: new Date(),
          type: img.type,
        });

        setImg(null);
        setToggleForm(false);
        toast.success('Photo uploaded successfully', { className: 'text-sm' });
        fetchImages();
      } catch (error) {
        toast.error('Failed to upload image: ' + error.message);
      } finally {
        setUploading(false);
      }
    }
  };

  const fetchImages = async () => {
    setFetchSuccessful(true);
    try {
      let imagesQuery;
      if (lastDoc) {
        imagesQuery = query(
          collection(db, 'images'),
          orderBy('timestamp', 'desc'),
          limit(pageSize)
        );
      } else {
        imagesQuery = query(
          collection(db, 'images'),
          orderBy('timestamp', 'desc'),
          limit(pageSize)
        );
      }
      const imageDocs = await getDocs(imagesQuery);
      const imagesData = imageDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSliderImages(imagesData);
      setImages([]);
      setImages((prev) => [...prev, ...imagesData]);
      setLoading(false);
      setLoadingMore(false);
      if (imagesData.length === 0) setFetchSuccessful(false);
    } catch (error) {
      toast.error('Failed to fetch images: ' + error.message);
      setFetchSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 10 >=
      document.documentElement.scrollHeight
    ) {
      setPageSize((prev) => prev + 1);
      setLoadingMore(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [pageSize]);

  const handleFileChange = ({ target }) => {
    setImg(target.files[0]);
  };

  const toggleUploadForm = () => {
    setToggleForm((prev) => !prev);
  };

  const handleFormClose = () => {
    setToggleForm(false);
    setImg(null);
    toast.error('Upload cancelled by user');
  };

  return (
    <>
      <div className='relative'>
        {toggleForm && (
          <>
            <div className='overlay'></div>
            <ImageUploadModal
              handleFileChange={handleFileChange}
              handleUploadImage={handleUploadImage}
              handleFormClose={handleFormClose}
              uploading={uploading}
              img={img}
            />
          </>
        )}

        <p className='text-center pt-3 text-[50px] font-sacramento'>
          Our Gallery
        </p>
        <div className='flex justify-center items-center'>
          {userLoggedIn && currentUser && (
            <Button
              onClick={toggleUploadForm}
              className='upload h-[40px] lg:w-[15%] md:h-[50px] rounded-full px-4'
              text='Upload Your Photo'
            />
          )}
        </div>

        {loading ? (
          <Loader
            className='relative flex justify-center items-center flex-col gap-3 mt-20'
            size={70}
            double
          />
        ) : (
          <>
            {fetchSuccessful ? (
              images.length > 0 ? (
                <>
                  <div data-aos='fade-right'>
                    <Slider gallery={sliderImages} className='' />
                  </div>
                  <div className='gallery' data-aos='fade-up'>
                    {images.map((image) => (
                      <ImageCard
                        key={image.id}
                        imgUrl={image.url}
                        user={image.uploaderName}
                        timestamp={image.timestamp}
                        type={image.type}
                      />
                    ))}
                  </div>
                  {loadingMore && (
                    <Loader
                      type='dot'
                      size={40}
                      color='white'
                      className='flex justify-center items-center '
                    />
                  )}
                </>
              ) : (
                <p className='text-center text-red-500 mt-40'>
                  No Images available yet, add yours!
                </p>
              )
            ) : (
              <p className='text-center mt-40 text-red-500'>
                No Images available yet, add yours!
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Gallery;
