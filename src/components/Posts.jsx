import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';

const heights = [150, 300, 150, 100, 110, 150, 130, 80, 60, 90, 100, 150, 60, 70, 90];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#38013D',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Posts() {
  return (
    <div>
    {/* for mobile */}
      <div 
        style={{ backgroundImage: "url('/images/bg-2.png')" }}
        className='md:hidden h-full w-full flex flex-col  justify-center p-3'>
          <p className='text-3xl mb-5 font-semibold'>
            Posts
          </p>
          <Masonry columns={2} spacing={2}>
            {heights.map((height, index) => (
              <Item key={index} sx={{ height }}>
                {'Post ' + (index + 1)}
              </Item>
            ))}
          </Masonry>
      </div>
  
    {/* for ipad */}
    <div 
      style={{ backgroundImage: "url('/images/bg-2.png')" }}
      className='hidden md:flex lg:hidden h-full w-full justify-center p-10'>
        <Masonry columns={3} spacing={2}>
          {heights.map((height, index) => (
            <Item key={index} sx={{ height }}>
              {'Post ' + (index + 1)}
            </Item>
          ))}
        </Masonry>
    </div>

    {/* for desktop */}
    <div 
      style={{ backgroundImage: "url('/images/bg-2.png')" }}
      className='hidden md:hidden lg:flex h-full w-full justify-center p-10'>
        <Masonry columns={4} spacing={2}>
          {heights.map((height, index) => (
            <Item key={index} sx={{ height }}>
              {'Post ' + (index + 1)}
            </Item>
          ))}
        </Masonry>
    </div>
    </div>
  );
}