import React from 'react';
import { Modal, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';

const DesktopStudentModal = ({ openModal, handleStudentModalClose, selectedStudent, handleOpenEditModal }) => {
  const { user } = useSelector((state) => state.user);


  const desktopStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '700px',
    width: '800px',
    maxWidth: 900,
  };

  return (
    <Modal
      open={openModal}
      onClose={handleStudentModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      className='hidden md:flex'
    >
      <div style={desktopStyle}>
        <div className='relative h-full flex flex-col'>
          <div className=' w-full h-full flex'>
            {/* image swiper */}
            <div className='w-[60%]'>
              <Swiper navigation style={{ height: '100%' }}>
                {selectedStudent &&
                  selectedStudent.img_urls.map((image, index) => (
                    <SwiperSlide key={index} style={{ height: '100%' }}>
                      <div
                        className="h-full w-full bg-cover bg-center bg-no-repeat"
                        style={{
                          background: `url(${image}) center center no-repeat`,
                          backgroundSize: 'cover',
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            {/* comments and engagement */}
            <div className='bg-black w-[40%] flex flex-col justify-between'>
              <div>
                <div className='flex justify-between'>
                  <div className='h-16 w-full p-5 flex items-center gap-2'>
                    <img
                      className='w-[40px] h-[40px] object-cover rounded-full'
                      src={selectedStudent?.img_urls[0]} alt="" />
                    <p className='text-white font-bold'>{selectedStudent?.name}</p>
                  </div>
                  <div className='flex'>
                    <IconButton onClick={handleStudentModalClose}>
                      <CloseIcon className='text-white' />
                    </IconButton>
                  </div>
                </div>
                <div className='p-5 text-white'>
                  <p>{selectedStudent?.description}</p>
                </div>
                <div>
                  {/* comments goes here */}
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex justify-between px-2'>
                  <div className='flex items-center'>
                    <IconButton>
                      <FavoriteBorderIcon className='text-white' />
                    </IconButton>
                    <span className='text-white'>5</span>
                    <IconButton>
                      <ChatBubbleOutlineIcon className='text-white' />
                    </IconButton>
                    <span className='text-white'>5</span>
                  </div>
                  {selectedStudent?.student_number === user?.studentNumber && (
                    <div className='flex items-center'>
                      <IconButton onClick={handleOpenEditModal}>
                        <EditIcon className='text-white' />
                      </IconButton>
                    </div>
                  )}
                </div>
                <div className='flex items-center'>
                  <input
                    className='w-full bg-black text-white p-2 outline-none'
                    type="text" placeholder='Add comment..' name="" id="" />
                  <button className='text-white p-4'>Post</button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </Modal>
  );
};

export default DesktopStudentModal;
