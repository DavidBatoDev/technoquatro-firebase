import React from 'react';

const getCategoryColor = (category) => {
    switch (category) {
      case 'Solar':
        return '#FFAA05';
      case 'Nebula':
        return '#FB4BFF';
      case 'Stardust':
        return '#27D8FF';
      case 'Vortex':
        return '#06FA76';
      case 'Lunar':
        return '#FF4B4B';
      default:
        return '#EBE331';
    }
  };

const CategoryNav = ({ category, handleCategoryClick }) => {
  const categories = ['All', 'Solar', 'Nebula', 'Stardust', 'Vortex', 'Lunar'];

  return (
    <nav className="mt-9 md:mt-2">
      <ul className="flex flex-wrap gap-4 text-[1.125rem] font-bold">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`cursor-pointer ${category === cat ? `text-[${getCategoryColor(cat)}] underline` : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default CategoryNav;
