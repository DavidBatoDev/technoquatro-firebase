import React, { useState, useEffect } from 'react';

const descriptionData = {
  "default": "United, we <strong>Celestial Kins</strong> form an unstoppable cosmic force achieving greatness beyond mere ideas.",
  "Solar": "The <span style='color: #FFAA05; font-weight: bold;'>Solar</span> class officers are our guiding stars, illuminating the path for our cosmic endeavors with their leadership and vision.",
  "Nebula": "The <span style='color: #FB4BFF; font-weight: bold;'>Nebula</span> creators craft visuals and presence, meticulously documenting our cosmic knowledge and moderating our celestial discourse.",
  "Stardust": "The <span style='color: #27D8FF; font-weight: bold;'>Stardust</span> are the diligent curators, meticulously documenting our cosmic knowledge and moderating our celestial discourse.",
  "Vortex": "The <span style='color: #06FA76; font-weight: bold;'>Vortex</span> subject masters, with their cosmic domains, wielding their expertise to tackle the most complex celestial challenges.",
  "Lunar": "The <span style='color: #FF4B4B; font-weight: bold;'>Lunar</span> are the celestial caretakers, ensuring the well-being of our cosmic community and fostering a culture of inclusivity and belonging."
};

const LandingStudents = () => {
    const [category, setCategory] = useState('All');
    const [studentData, setStudentsData] = useState([]);

    useEffect(() => {
        const fetchStudentsData = async () => {
          try {
            const res = await fetch('./students.json');
            const data = await res.json();
            setStudentsData(data);
          } catch (error) {
            console.error('Error fetching JSON data:', error);
          }
        }
        fetchStudentsData();
    }, []);

    const handleCategoryClick = (category) => {
      setCategory(category);
    };

    const findMembersByCategory = (category) => {
      if (category === 'All') {
        return studentData.filter((student, index) => index !== studentData.length - 1 && student.name.trim() !== "");
      } else {
        return studentData.map(student => {
          if (student.categories.includes(category)) {
            const index = student.categories.indexOf(category);
            const filteredRoles = student.roles[index] ? [student.roles[index]] : [];
            return {
              ...student,
              roles: filteredRoles,
              categories: [category]
            };
          } else {
            return null;
          }
        }).filter(Boolean);
      }
    };

    const membersToShow = findMembersByCategory(category);

  return (
    <main className="min-h-[800px] py-12 px-28 bg-gradient-to-b from-[#42235A] to-[#8D4AC0] text-white">
      <div className="max-w-[512px]">
        <p className="text-[37.6px] font-bold mb-2">Greet the Quatro Celestials:</p>
        <p className="text-justify text-sm font-normal">Our diverse TecnoQuatro Extraterrestrials transcends boundaries, fusing celestial talents.</p>
        <p className="text-justify text-sm font-normal mt-5" dangerouslySetInnerHTML={{ __html: descriptionData[category] || descriptionData.default }} />
      </div>

      <nav className="mt-2">
        <ul className="flex pt-7 gap-4 text-[1.125rem] font-bold flex-wrap">
          <li className={`cursor-pointer ${category === 'All' ? 'text-[#EBE331] underline' : ''}`} onClick={() => handleCategoryClick('All')}>All</li>
          <li className={`cursor-pointer ${category === 'Solar' ? 'text-[#FFAA05] underline' : ''}`} onClick={() => handleCategoryClick('Solar')}>Solar</li>
          <li className={`cursor-pointer ${category === 'Nebula' ? 'text-[#FB4BFF] underline' : ''}`} onClick={() => handleCategoryClick('Nebula')}>Nebula</li>
          <li className={`cursor-pointer ${category === 'Stardust' ? 'text-[#27D8FF] underline' : ''}`} onClick={() => handleCategoryClick('Stardust')}>Stardust</li>
          <li className={`cursor-pointer ${category === 'Vortex' ? 'text-[#06FA76] underline' : ''}`} onClick={() => handleCategoryClick('Vortex')}>Vortex</li>
          <li className={`cursor-pointer ${category === 'Lunar' ? 'text-[#FF4B4B] underline' : ''}`} onClick={() => handleCategoryClick('Lunar')}>Lunar</li>
        </ul>
      </nav>

      <div className="grid grid-cols-6 gap-8 mt-7">
        {membersToShow.map((student, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-5">
              <img src={student.img} alt='' className="w-[170px] h-[170px] rounded-full object-cover" />
              <div className="mt-5 text-center text-white text-sm font-normal">
                <p className="font-bold mb-1">{student.name}</p>
                <p>{category === 'All' ? student.roles.join(', ') : student.roles.filter(role => student.categories.includes(category)).join(', ')}</p>
              </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default LandingStudents;
