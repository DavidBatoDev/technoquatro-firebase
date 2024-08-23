import React from 'react';
import { Modal, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const MobileStudentModal = ({ openModal, handleStudentModalClose, selectedStudent }) => {
  const mobileStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    maxWidth: 600,
    bgcolor: '#fff',
    borderRadius: 8,
    outline: 'none',
    padding: '20px',
    textAlign: 'center',
  };

  return (
    <Modal
      open={openModal}
      onClose={handleStudentModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      className='md:hidden'
    >
      <div style={mobileStyle}>
        <div className='w-full flex text-[18px] md:text-[37.6px] font-semibold mb-2 text-white'>
          {selectedStudent?.name}
        </div>
        <Swiper navigation className='relative'>
          <div className='absolute top-0 right-0 z-30'>
            <IconButton onClick={handleStudentModalClose}>
              <CloseIcon className='text-black' />
            </IconButton>
          </div>
          {selectedStudent &&
            selectedStudent.img_urls.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[350px] w-full bg-cover bg-center bg-no-repeat"
                  style={{
                    background: `url(${image}) center center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='flex w-full h-full bg-black p-3 pb-0'>
          <div>
            <IconButton>
              <FavoriteBorderIcon className='text-white' />
            </IconButton>
            <span className='text-white'>5</span>
          </div>
          <div>
            <IconButton>
              <ChatBubbleOutlineIcon className='text-white' />
            </IconButton>
            <span className='text-white'>5</span>
          </div>
        </div>

        <div className='w-full text-start text-white bg-black p-5 pt-0'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt dignissimos accusamus distinctio sed quod sunt quia veritatis enim non repudiandae cupiditate ut ipsum, minima aut ipsam delectus qui perspiciatis minus!
        </div>
      </div>
    </Modal>
  );
};

export default MobileStudentModal;
