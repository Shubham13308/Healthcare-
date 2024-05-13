import React from 'react';
import defaultProfileImage from '../../Images/profile.png';

export const Header = (props) => {
  const { image, name, lname } = props;

  const imageUrl = image ? `http://127.0.0.1:3002/${image}` : defaultProfileImage;

  return (
    <div className='header'>
      <div className='pro-img'>
        <img
          src={imageUrl}
          alt="profile"
          width='100%'
          className='profile-img'
        />
      </div>
      <div className='mr-3'>
        <p className='greet'>Good Afternoon</p>
        <p className='profile-name'>{name} {lname}</p>
      </div>
    </div>
  );
};
