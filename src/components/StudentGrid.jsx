import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentCard from './StudentCard';

const StudentGrid = ({ membersToShow, category, handleStudentModalOpen }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 mt-7"
      >
        {membersToShow.map((student, index) => (
          <StudentCard
            key={index}
            student={student}
            category={category}
            handleStudentModalOpen={handleStudentModalOpen}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default StudentGrid;
