import React, { useState, useEffect } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import 'react-slideshow-image/dist/styles.css';
import MainDescription from './MainDescription';
import CategoryNav from './CategoryNav';
import StudentGrid from './StudentGrid';
import MobileStudentModal from './MobileStudentModal';
import DesktopStudentModal from './DesktopStudentModal';
import {app, db} from '../firebase';
import {collection, onSnapshot} from 'firebase/firestore';
import EditMobileStudentModal from './EditMobileStudentModal';

const descriptionData = {
  "default": "United, we <strong>Celestial Kins</strong> form an unstoppable cosmic force achieving greatness beyond mere ideas.",
  "Solar": "The <span style='color: #FFAA05; font-weight: bold;'>Solar</span> class officers are our guiding stars, illuminating the path for our cosmic endeavors with their leadership and vision.",
  "Nebula": "The <span style='color: #FB4BFF; font-weight: bold;'>Nebula</span> creators craft visuals and presence, meticulously documenting our cosmic knowledge and moderating our celestial discourse.",
  "Stardust": "The <span style='color: #27D8FF; font-weight: bold;'>Stardust</span> are the diligent curators, meticulously documenting our cosmic knowledge and moderating our celestial discourse.",
  "Vortex": "The <span style='color: #06FA76; font-weight: bold;'>Vortex</span> subject masters, with their cosmic domains, wielding their expertise to tackle the most complex celestial challenges.",
  "Lunar": "The <span style='color: #FF4B4B; font-weight: bold;'>Lunar</span> are the celestial caretakers, ensuring the well-being of our cosmic community and fostering a culture of inclusivity and belonging."
};

const LandingStudents = () => {
  SwiperCore.use([Navigation]);
  const [category, setCategory] = useState('All');
  const [studentsData, setStudentsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
    setOpenModal(false);
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setOpenModal(true);
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'studentsData'), (snapshot) => {
      setStudentsData(snapshot.docs.map((doc) => doc.data()));
    });

    return unsub;
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
  };

  return (
    <main 
      style={{ backgroundImage: "url('/images/bg-2.png')" }}
      className="min-h-[800px] py-12 px-8 lg:px-28 text-black"
    >
      <MainDescription category={category} descriptionData={descriptionData} />
      <CategoryNav category={category} handleCategoryClick={handleCategoryClick} />
      <StudentGrid membersToShow={membersToShow} category={category} handleStudentModalOpen={handleStudentModalOpen} />

      {/* Mobile Modal */}
      <MobileStudentModal 
        openModal={openModal} 
        handleStudentModalClose={handleStudentModalClose} 
        selectedStudent={selectedStudent} 
        handleOpenEditModal={handleOpenEditModal}
      />

      {/* Edit Mobile Modal */}
      {selectedStudent && (
        <EditMobileStudentModal 
          openEditModal={openEditModal}
          handleEditModalClose={handleCloseEditModal}
          selectedStudent={selectedStudent}
        />
      )}

      {/* Desktop Modal */}
      <DesktopStudentModal 
        openModal={openModal} 
        handleStudentModalClose={handleStudentModalClose} 
        selectedStudent={selectedStudent} 
      />
    </main>
  );
};

export default LandingStudents;
