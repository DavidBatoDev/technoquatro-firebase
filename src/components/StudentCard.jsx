import React from 'react';

const StudentCard = ({ student, category, handleStudentModalOpen }) => {
  return (
    <div
      onClick={() => handleStudentModalOpen(student)}
      className="flex flex-col items-center justify-center cursor-pointer"
    >
      <div className="relative w-[140px] h-[140px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[180px] lg:h-[180px] rounded-full overflow-hidden">
        <img
          src={student?.img}
          alt={student?.name}
          className="object-cover w-full h-full"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-800 opacity-30"
          style={{ mixBlendMode: 'multiply' }}
        ></div>
      </div>
      <div className="mt-3 md:mt-5 text-center text-black text-xs sm:text-sm font-normal">
        <p className="font-bold mb-1">{student?.name}</p>
        <p>
          {category === 'All'
            ? student.roles.join(', ')
            : student.roles
                .filter((role) => student.categories.includes(category))
                .join(', ')}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
