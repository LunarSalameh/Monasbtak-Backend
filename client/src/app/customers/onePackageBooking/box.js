"use client";

import React, { useState } from 'react';
import './box.css';

function NumberBox() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setValue(input);
    }
  };

  return (
    <div className='NumberBox'>
        <h3 className='event_attend'>Number of Attendings</h3>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter numbers only"
        className="box"
      />
    </div>
  );
}

export default NumberBox;
