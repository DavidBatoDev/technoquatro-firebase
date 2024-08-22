import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'react-slideshow-image/dist/styles.css';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const descriptionData = {
  "default": "United, we <strong>Celestial Kins</strong> form an unstoppable cosmic force achieving greatness beyond mere ideas.",
  "Solar": "The <span style='color: #FFAA05; font-weight: bold;'>Solar</span> class officers are our guiding stars, illuminating the path for our cosmic endeavors with their leadership and vision.",
  "Nebula": "The <span style='color: #FB4BFF; font-weight: bold;'>Nebula</span> creators craft visuals and presence, meticulously documenting our cosmic knowledge and moderating our celestial discourse.",
  "Stardust": "The <span style='color: #27D8FF; font-weight: bold;'>Stardust</span> are the diligent curators, meticulously documenting our cosmic knowledge and moderating our celestial discourse.",
  "Vortex": "The <span style='color: #06FA76; font-weight: bold;'>Vortex</span> subject masters, with their cosmic domains, wielding their expertise to tackle the most complex celestial challenges.",
  "Lunar": "The <span style='color: #FF4B4B; font-weight: bold;'>Lunar</span> are the celestial caretakers, ensuring the well-being of our cosmic community and fostering a culture of inclusivity and belonging."
};

const style = {
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

const LandingStudents = () => {
  SwiperCore.use([Navigation]);
  const [category, setCategory] = useState('All');
  const [studentsData, setStudentsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const res = await fetch('./students.json');
        const data = await res.json();
        setStudentsData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchStudentsData();
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const findMembersByCategory = (category) => {
    if (category === 'All') {
      return studentsData.filter(
        (student, index) => index !== studentsData.length - 1 && student.name.trim() !== ""
      );
    } else {
      return studentsData
        .map((student) => {
          if (student.categories.includes(category)) {
            const index = student.categories.indexOf(category);
            const filteredRoles = student.roles[index] ? [student.roles[index]] : [];
            return {
              ...student,
              roles: filteredRoles,
              categories: [category],
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }
  };

  const membersToShow = findMembersByCategory(category);

  const handleStudentModalOpen = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  const handleStudentModalClose = () => {
    setOpenModal(false);
    setSelectedStudent(null);
    setCurrentImgIndex(0);
  };

  return (
    <main className="min-h-[800px] py-12 px-8 lg:px-28 bg-gradient-to-b from-[#42235A] to-[#8D4AC0] text-white">
      <div className="max-w-[512px]">
        <p className="text-[28px] md:text-[37.6px] font-bold mb-2">Greet the Quatro Celestials:</p>
        <p className="text-justify text-sm font-normal">
          Our diverse TecnoQuatro Extraterrestrials transcends boundaries, fusing celestial talents.
        </p>
        <p
          className="text-justify text-sm font-normal mt-5"
          dangerouslySetInnerHTML={{ __html: descriptionData[category] || descriptionData.default }}
        />
      </div>

      <nav className="mt-4 md:mt-2">
        <ul className="flex flex-wrap gap-4 text-[1.125rem] font-bold">
          <li
            className={`cursor-pointer ${category === 'All' ? 'text-[#EBE331] underline' : ''}`}
            onClick={() => handleCategoryClick('All')}
          >
            All
          </li>
          <li
            className={`cursor-pointer ${category === 'Solar' ? 'text-[#FFAA05] underline' : ''}`}
            onClick={() => handleCategoryClick('Solar')}
          >
            Solar
          </li>
          <li
            className={`cursor-pointer ${category === 'Nebula' ? 'text-[#FB4BFF] underline' : ''}`}
            onClick={() => handleCategoryClick('Nebula')}
          >
            Nebula
          </li>
          <li
            className={`cursor-pointer ${category === 'Stardust' ? 'text-[#27D8FF] underline' : ''}`}
            onClick={() => handleCategoryClick('Stardust')}
          >
            Stardust
          </li>
          <li
            className={`cursor-pointer ${category === 'Vortex' ? 'text-[#06FA76] underline' : ''}`}
            onClick={() => handleCategoryClick('Vortex')}
          >
            Vortex
          </li>
          <li
            className={`cursor-pointer ${category === 'Lunar' ? 'text-[#FF4B4B] underline' : ''}`}
            onClick={() => handleCategoryClick('Lunar')}
          >
            Lunar
          </li>
        </ul>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 mt-7"
        >
          {membersToShow.map((student, index) => (
            <div
              onClick={() => handleStudentModalOpen(student)}
              key={index}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="relative w-[170px] h-[170px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden">
                <img
                  src={student.img}
                  alt={student.name}
                  className="object-cover w-full h-full"
                />
                {/* Add a subtle background pattern or overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-800 opacity-30"
                  style={{ mixBlendMode: 'multiply' }}
                ></div>
              </div>
              <div className="mt-3 md:mt-5 text-center text-white text-xs sm:text-sm font-normal">
                <p className="font-bold mb-1">{student.name}</p>
                <p>
                  {category === 'All'
                    ? student.roles.join(', ')
                    : student.roles
                        .filter((role) => student.categories.includes(category))
                        .join(', ')}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleStudentModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <div 
          style={style}
        >
        <div className='w-full flex text-[18px] md:text-[37.6px] font-semibold mb-2 text-white'>
          {selectedStudent?.name}
        </div>
          <Swiper navigation>
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
    </main>
  );
};

export default LandingStudents;
