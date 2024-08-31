import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DesktopPostModal from './DesktopPostModal';
import MobilePostModal from './MobilePostModal'; // Import MobilePostModal

const dummyPosts = [
  {
    user_id: "user123",
    image_urls: [
      "/images/students/aidan.jpg"
    ],
    post_description: "Had a great time at the event today! Here are some pictures from the day.",
    facebook_link: "https://www.facebook.com/post/12345",
    reactions: ["user456", "user789", "user234"],
    comments: [
      {
        userId: "user456",
        comment: "Looks like an amazing event! Thanks for sharing!"
      },
      {
        userId: "user789",
        comment: "Wish I could have been there!"
      }
    ]
  },
  {
    user_id: "user234",
    image_urls: [
      "https://firebasestorage.googleapis.com/v0/b/technoquatro-31679.appspot.com/o/1724565870912449846960_507624131925521_8786989827832185250_n.jpg?alt=media&token=062c359a-f9e8-4848-800a-0935c591bddb"
    ],
    post_description: "Just finished a marathon. Exhausted but proud!",
    facebook_link: "",
    reactions: ["user123", "user456"],
    comments: [
      {
        userId: "user123",
        comment: "Congratulations! You did an amazing job!"
      },
      {
        userId: "user789",
        comment: "Wow, impressive! How long did it take you?"
      }
    ]
  }
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#2D3142' : '#FFFFFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#2D3142',
  borderRadius: '15px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.25)',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer', // Add cursor pointer to indicate it's clickable
}));

const PostImage = styled('img')({
  borderRadius: '12px',
  objectFit: 'cover',
  width: '100%',
  height: '200px',
});

const PostDescription = styled('p')(({ theme }) => ({
  paddingTop: '15px',
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.mode === 'dark' ? '#D8D8D8' : '#4A4A4A',
  lineHeight: '1.5',
  flex: 1,
  textAlign: 'center',
}));

export default function Posts() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="font-inter">
      {/* Add Post Button */}
      <div className='flex justify-between items-center p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg mb-8'>
        <p className='text-4xl font-semibold text-white'>
          Posts
        </p>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#6C63FF',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#F1F1F1',
            },
          }}>
          Add Post
        </Button>
      </div>

      {/* Mobile Layout */}
      <div
        style={{ backgroundImage: "url('/images/bg-2.png')" }}
        className='md:hidden h-full w-full flex flex-col justify-center p-3'>
        <Masonry columns={2} spacing={2}>
          {dummyPosts.map((post, index) => (
            <Item key={index} onClick={() => handlePostClick(post)}>
              <PostImage
                src={post.image_urls[0]}
                alt={`Post ${index + 1}`}
              />
              <PostDescription>{post.post_description}</PostDescription>
            </Item>
          ))}
        </Masonry>
      </div>

      {/* iPad Layout */}
      <div
        style={{ backgroundImage: "url('/images/bg-2.png')" }}
        className='hidden md:flex lg:hidden h-full w-full justify-center p-10'>
        <Masonry columns={3} spacing={3}>
          {dummyPosts.map((post, index) => (
            <Item key={index} onClick={() => handlePostClick(post)}>
              <PostImage
                src={post.image_urls[0]}
                alt={`Post ${index + 1}`}
                style={{ height: '250px' }}
              />
              <PostDescription>{post.post_description}</PostDescription>
            </Item>
          ))}
        </Masonry>
      </div>

      {/* Desktop Layout */}
      <div
        style={{ backgroundImage: "url('/images/bg-2.png')" }}
        className='hidden md:hidden lg:flex h-full w-full justify-center p-10'>
        <Masonry columns={4} spacing={3}>
          {dummyPosts.map((post, index) => (
            <Item key={index} onClick={() => handlePostClick(post)}>
              <PostImage
                src={post.image_urls[0]}
                alt={`Post ${index + 1}`}
                style={{ height: '300px' }}
              />
              <PostDescription>{post.post_description}</PostDescription>
            </Item>
          ))}
        </Masonry>
      </div>

      {/* Conditional Rendering of Modals */}
      {selectedPost && (
        <>
          <DesktopPostModal 
            openModal={openModal} 
            handleClose={handleCloseModal} 
            selectedPost={selectedPost} 
          />
          <MobilePostModal 
            openModal={openModal} 
            handleClose={handleCloseModal} 
            selectedPost={selectedPost} 
          />
        </>
      )}
    </div>
  );
}
E