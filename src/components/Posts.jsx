import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';

const heights = [150, 300, 150, 100, 110, 150, 130, 80, 60, 90, 100, 150, 60, 70, 90];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Posts() {
  return (
    <>
    {/* for mobile */}
    <div 
      style={{
        background: 'linear-gradient(180deg, rgba(18, 17, 86, 1) 0%, rgba(26, 25, 34, 1) 100%)'
      }}
      className='md:hidden h-full w-full flex justify-center p-3'>
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
      style={{
        background: 'linear-gradient(180deg, rgba(18, 17, 86, 1) 0%, rgba(26, 25, 34, 1) 100%)'
      }}
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
      style={{
        background: 'linear-gradient(180deg, rgba(18, 17, 86, 1) 0%, rgba(26, 25, 34, 1) 100%)'
      }}
      className='hidden md:hidden lg:flex h-full w-full justify-center p-10'>
        <Masonry columns={4} spacing={2}>
          {heights.map((height, index) => (
            <Item key={index} sx={{ height }}>
              {'Post ' + (index + 1)}
            </Item>
          ))}
        </Masonry>
    </div>
    </>
  );
}