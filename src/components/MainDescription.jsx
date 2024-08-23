import React from 'react';

const MainDescription = ({ category, descriptionData }) => {
  return (
    <div className="max-w-[512px]">
      <p className="text-[28px] md:text-[37.6px] font-bold mb-2">Greet the Quatro Celestials:</p>
      <p className="text-justify text-sm font-normal">
        Our diverse TecnoQuatro Extraterrestrials transcends boundaries, fusing celestial talents.
      </p>
      <div className='h-[50px]'>
        <p
          className="text-justify text-sm font-normal mt-5"
          dangerouslySetInnerHTML={{ __html: descriptionData[category] || descriptionData.default }}
        />
      </div>
    </div>
  );
};

export default MainDescription;
