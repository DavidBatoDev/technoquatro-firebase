import React from 'react';
import { Modal, IconButton, Box, TextField, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';

const DesktopPostModal = ({ openModal, handleClose, selectedPost, handleOpenEditModal }) => {
  const { user } = useSelector((state) => state.user);

  const desktopStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '700px',
    width: '850px',
    backgroundColor: '#1E1E1E', // Dark gray background for a modern look
    borderRadius: '20px',
    outline: 'none',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    overflow: 'hidden',
  };

  const mobileStyle = {
    ...desktopStyle,
    width: '350px',
    height: '625px',
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      className={window.innerWidth >= 768 ? 'hidden md:flex' : 'md:hidden'}
    >
      <div style={window.innerWidth >= 768 ? desktopStyle : mobileStyle}>
        <div className='relative h-full flex flex-col'>
          <div className='w-full h-full flex'>
            {/* Image swiper */}
            <div className='w-full lg:w-[60%]'>
              <Swiper navigation style={{ height: '100%' }}>
                {selectedPost &&
                  selectedPost.image_urls.map((image, index) => (
                    <SwiperSlide key={index} style={{ height: '100%' }}>
                      <div
                        className="h-full w-full bg-cover bg-center bg-no-repeat"
                        style={{
                          background: `url(${image}) center center no-repeat`,
                          backgroundSize: 'cover',
                          borderRadius: '20px 0 0 20px', // Rounded left corners
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            {/* Comments and engagement */}
            <div className='bg-[#1E1E1E] lg:w-[40%] flex flex-col justify-between text-white'>
              <div>
                <div className='flex justify-between items-center p-4 border-b border-gray-600'>
                  <div className='flex items-center gap-3'>
                    <img
                      className='w-[45px] h-[45px] object-cover rounded-full border border-gray-600'
                      src={selectedPost?.image_urls[0]} alt="" />
                    <p className='font-bold text-lg'>{selectedPost?.user_id}</p>
                  </div>
                  <div>
                    <IconButton onClick={handleClose}>
                      <CloseIcon className='text-gray-400 hover:text-white transition' />
                    </IconButton>
                  </div>
                </div>
                <div className='p-5 text-gray-300'>
                  <p>{selectedPost?.post_description}</p>
                </div>
                <div className='px-5 py-3 overflow-y-auto' style={{ maxHeight: '200px' }}>
                  {selectedPost?.comments.map((comment, index) => (
                    <div key={index} className='mb-4'>
                      <span className='font-semibold text-white'>{comment.userId}</span>
                      <p className='text-gray-400'>{comment.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex justify-between items-center px-4 py-3 border-t border-gray-600'>
                  <div className='flex items-center'>
                    <IconButton>
                      <FavoriteBorderIcon className='text-gray-400 hover:text-pink-500 transition' />
                    </IconButton>
                    <span className='text-gray-400'>{selectedPost?.reactions.length}</span>
                    <IconButton>
                      <ChatBubbleOutlineIcon className='text-gray-400 hover:text-blue-500 transition' />
                    </IconButton>
                    <span className='text-gray-400'>{selectedPost?.comments.length}</span>
                  </div>
                  {selectedPost?.user_id === user?.user_id && (
                    <IconButton onClick={handleOpenEditModal}>
                      <EditIcon className='text-gray-400 hover:text-green-500 transition' />
                    </IconButton>
                  )}
                </div>
                <div className='flex items-center p-4 bg-[#292929]'>
                  <TextField
                    className='w-full text-white'
                    variant="standard"
                    placeholder='Add comment...'
                    InputProps={{
                      disableUnderline: true,
                      style: { color: 'white' },
                    }}
                    sx={{
                      backgroundColor: '#333333',
                      borderRadius: '15px',
                      padding: '8px 12px',
                      '&::placeholder': {
                        color: '#888888',
                      },
                    }}
                  />
                  <Button 
                    variant="contained" 
                    sx={{ 
                      marginLeft: '10px', 
                      backgroundColor: '#6C63FF', 
                      color: 'white', 
                      borderRadius: '12px', 
                      padding: '8px 16px',
                      '&:hover': {
                        backgroundColor: '#5A54D7',
                      } 
                    }}>
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DesktopPostModal;