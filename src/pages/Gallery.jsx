import { useEffect, useState } from 'react';
import { db, imageDb } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import ImageUploadModal from './ImageUploadModal';
import { Button, ImageCard } from '../components';
import { useAuth } from '../context';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

const Gallery = () => {
  const [img, setImg] = useState(null);
  const [images, setImages] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const { user } = useOutletContext();

  const { userLoggedIn, currentUser } = useAuth();

  const handleUploadImage = async () => {
    if (img !== null && currentUser) {
      const imgRef = ref(imageDb, `files/${uuid()}`);
      await uploadBytes(imgRef, img);
      const imgUrl = await getDownloadURL(imgRef);

      await addDoc(collection(db, 'images'), {
        url: imgUrl,
        uploaderName: currentUser.displayName || user || 'Anonymous',
        userId: currentUser.uid,
        timestamp: new Date(),
      });

      setImg(null);
      setToggleForm(false);
      toast.success('Photo uploaded successfully', { className: 'text-sm' });
      fetchImages();
    }
  };

  const fetchImages = async () => {
    const imagesQuery = query(collection(db, 'images'));
    const imageDocs = await getDocs(imagesQuery);

    const imagesData = imageDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setImages(imagesData);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = ({ target }) => {
    setImg(target.files[0]);
  };

  const toggleUploadForm = () => {
    setToggleForm((prev) => !prev);
  };

  const handleFormClose = () => {
    setToggleForm(false);
    toast.error('Upload cancelled by user');
  };

  return (
    <>
      <div>
        {toggleForm && (
          <>
            <div className='overlay'></div>
            <ImageUploadModal
              handleFileChange={handleFileChange}
              handleUploadImage={handleUploadImage}
              handleFormClose={handleFormClose}
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
              className='upload lg:w-[15%] h-[50px] rounded-full px-4'
              text='Upload Your Photo'
            />
          )}
        </div>

        <div className='gallery'>
          {images.map((image) => (
            <div key={image.id}>
              <ImageCard
                imgUrl={image.url}
                user={image.uploaderName}
                timestamp={image.timestamp}
              />{' '}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
