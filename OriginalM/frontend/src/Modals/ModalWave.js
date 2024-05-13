import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const ModalWave = (props) => {




  return (
    
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Wave Modal</p>
          <Link to="/dashboard">close</Link>        </div>
      </div>
    
  );
};

export default ModalWave;
