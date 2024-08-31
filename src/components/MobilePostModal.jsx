import React from 'react';
import { Modal, IconButton, TextField, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';

const MobilePostModal = ({ openModal, handleClose, selectedPost, handleOpenEditModal }) => {
  const { user } = useSelector((state) => state.user);

  const mobileStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '350px',
    height: '100%',
    maxHeight: '625px',
    backgroundColor: '#1E1E1E', // Dark gray background for a modern look
    borderRadius: '15px',
    outline: 'none',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    overflow: 'hidden',
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      className="md:hidden"
    >
      <div style={mobileStyle}>
        <div className='relative h-full flex flex-col'>
          {/* Image Swiper */}
          <div className='w-full flex-shrink-0'>
            <Swiper navigation>
              {selectedPost &&
                selectedPost.image_urls.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="h-[300px] w-full bg-cover bg-center bg-no-repeat"
                      style={{
                        background: `url(${image}) center center no-repeat`,
                        backgroundSize: 'cover',
                        borderRadius: '15px 15px 0 0', // Rounded top corners
                      }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* Comments and engagement */}
          <div className='bg-[#1E1E1E] flex flex-col justify-between text-white flex-grow'>
            <div>
              <div className='flex justify-between items-center p-4 border-b border-gray-600'>
                <div className='flex items-center gap-3'>
                  <img
                    className='w-[40px] h-[40px] object-cover rounded-full border border-gray-600'
                    src={selectedPost?.image_urls[0]} alt="" />
                  <p className='font-bold text-sm'>{selectedPost?.user_id}</p>
                </div>
                <div>
                  <IconButton onClick={handleClose}>
                    <CloseIcon className='text-gray-400 hover:text-white transition' />
                  </IconButton>
                </div>
              </div>
              <div className='p-4 text-gray-300 text-sm'>
                <p>{selectedPost?.post_description}</p>
              </div>
              <div className='px-4 py-2 overflow-y-auto' style={{ maxHeight: '150px' }}>
                {selectedPost?.comments.map((comment, index) => (
                  <div key={index} className='mb-3'>
                    <span className='font-semibold text-white text-sm'>{comment.userId}</span>
                    <p className='text-gray-400 text-xs'>{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex justify-between items-center px-4 py-2 border-t border-gray-600'>
                <div className='flex items-center'>
                  <IconButton>
                    <FavoriteBorderIcon className='text-gray-400 hover:text-pink-500 transition' />
                  </IconButton>
                  <span className='text-gray-400 text-xs'>{selectedPost?.reactions.length}</span>
                  <IconButton>
                    <ChatBubbleOutlineIcon className='text-gray-400 hover:text-blue-500 transition' />
                  </IconButton>
                  <span className='text-gray-400 text-xs'>{selectedPost?.comments.length}</span>
                </div>
                {selectedPost?.user_id === user?.user_id && (
                  <IconButton onClick={handleOpenEditModal}>
                    <EditIcon className='text-gray-400 hover:text-green-500 transition' />
                  </IconButton>
                )}
              </div>
              <div className='flex items-center p-3 bg-[#292929]'>
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
                    padding: '6px 10px',
                    fontSize: '12px',
                    '&::placeholder': {
                      color: '#888888',
                    },
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    marginLeft: '8px', 
                    backgroundColor: '#6C63FF', 
                    color: 'white', 
                    borderRadius: '12px', 
                    padding: '6px 12px',
                    fontSize: '12px',
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
    </Modal>
  );
};

export default MobilePostModal;
