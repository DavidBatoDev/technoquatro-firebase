import React, { useState } from 'react';
import { Modal, IconButton, CircularProgress, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import TrashIcon from '@mui/icons-material/Delete';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app, db } from '../firebase'; // Update this path according to your structure
import { collection, addDoc } from 'firebase/firestore';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: '350px',
  backgroundColor: '#1E1E1E', // Dark gray background for a modern look
  borderRadius: '15px',
  outline: 'none',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '90%', // Adjust for mobile screen size
};

const MobileAddPostModal = ({ open, handleClose }) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 6) {
      setImageUploadError('You can only upload a maximum of 6 images.');
      return;
    }
    setImages([...images, ...files]);
    setImageUploadError(null);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return setError('Please upload at least one image.');
    setLoading(true);
    try {
      const img_urls = await Promise.all(images.map(storeImage));
      const newPost = {
        user_id: "currentUserId", // Replace with actual user ID
        image_urls: img_urls,
        post_description: description,
        reactions: [],
        comments: [],
        created_at: new Date(),
      };
      await addDoc(collection(db, 'posts'), newPost);
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      className='md:hidden' // Only show on mobile
    >
      <div style={modalStyle}>
        {loading ? (
          <div className='h-full w-full flex justify-center items-center'>
            <CircularProgress />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='w-full h-full bg-[#1E1E1E] p-4 flex flex-col justify-between'
          >
            <div className='flex justify-between items-center mb-4'>
              <IconButton onClick={handleClose}>
                <CloseIcon className='text-gray-400 hover:text-white transition' />
              </IconButton>
              <p className='text-white font-semibold text-lg'>
                Add New Post
              </p>
            </div>
            <p className='text-white text-start mb-3 font-semibold'>
              Images:
              <small className='text-red-500 ml-2'>{imageUploadError}</small>
            </p>
            {/* Images */}
            <div className='grid grid-cols-3 gap-2'>
              {images.map((image, index) => (
                <div key={index} className='relative border border-gray-600 h-28 w-28'>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`image${index}`}
                    className='h-full w-full object-cover rounded'
                  />
                  <div className='flex justify-center items-center absolute right-1 top-1 bg-white rounded-full w-5 h-5'>
                    <TrashIcon
                      onClick={() => handleRemoveImage(index)}
                      className='text-red-500 cursor-pointer'
                    />
                  </div>
                </div>
              ))}
              <label
                htmlFor='img_urls-mobile'
                className='relative border cursor-pointer border-gray-600 rounded h-28 w-28 flex items-center justify-center'
              >
                <AddIcon className='text-gray-400 border rounded-full text-3xl' />
              </label>
              <input
                id='img_urls-mobile'
                onChange={handleImageUpload}
                hidden
                type='file'
                accept='image/*'
                multiple
                name='img_urls-mobile'
              />
            </div>
            {/* Description */}
            <div className='mt-4 w-full'>
              <p className='text-white font-semibold text-start'>Description:</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full h-24 bg-[#292929] text-white p-3 border border-gray-600 rounded resize-none'
                placeholder='Write a description...'
                style={{ lineHeight: '1.4', fontSize: '0.9rem' }}
              />
            </div>
            <div>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{
                  backgroundColor: '#6C63FF',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  marginTop: '20px',
                  '&:hover': {
                    backgroundColor: '#5A54D7',
                  },
                  width: '100%',
                }}>
                Post
              </Button>
              {error && <p className='text-red-500 mt-2'>{error}</p>}
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default MobileAddPostModal;
