"use client";

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './box.css';

const NumberBox = forwardRef((props, ref) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setValue(input);
    }
  };

  useImperativeHandle(ref, () => ({
    value: value
  }));

  return (
    <div className='NumberBox'>
        <h3 className='event_attend'>Number of Attendings</h3>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter numbers only"
        className="box"
        ref={ref}
      />
    </div>
  );
});

export default NumberBox;
