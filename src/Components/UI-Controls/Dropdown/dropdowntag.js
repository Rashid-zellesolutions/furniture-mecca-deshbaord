import React, { useState } from 'react';

// Custom dropdown component
const DropdownWithFields = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [colorInputValue1, setColorInputValue1] = useState('#ffffff'); // Default color for background input
  const [colorInputValue2, setColorInputValue2] = useState('#ffffff'); // Default color for text input
  const [isOpen, setIsOpen] = useState(false); // Control dropdown visibility

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);
  };

  const handleColorInputChange1 = (event) => {
    setColorInputValue1(event.target.value);
  };

  const handleColorInputChange2 = (event) => {
    setColorInputValue2(event.target.value);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
        {isOpen ? 'Close' : 'Open'} Input Fields
      </div>
      {isOpen && (
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px', padding: '10px', backgroundColor: '#fff' }}>
          
          {/* Background Color Input */}
          <label style={{ lineHeight: '18px', color: 'var(--text-color)', fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-small)', marginBottom: '5px', display: 'block' }}>Background Color<span className='superscript'>*</span></label>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', height: '40px', }}>
            <span style={{ lineHeight: '19.5px',  color: 'var(--text-color)', fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-avg)', marginRight: '10px', marginLeft: '10px', }}>{colorInputValue1}</span> {/* Display Hex Code */}
            <div style={{ flexGrow: 1 }} /> {/* Empty space in the center */}
            <input
              type="color"
              value={colorInputValue1}
              onChange={handleColorInputChange1}
              style={{
                width: '56px',
                height: '34px',
                border: 'none',
                borderRadius: '4px', // Make the color input square with rounded corners
                margin: '5px',
              }} 
            />
          </div>

          {/* Text Color Input */}
          <label style={{ lineHeight: '18px',  color: 'var(--text-color)', fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-small)', marginBottom: '5px', display: 'block', marginTop: '10px' }}>Text Color<span className='superscript'>*</span></label>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', height: '40px', }}>
            <span style={{ lineHeight: '19.5px',  color: 'var(--text-color)', fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-avg)', marginRight: '10px', marginLeft: '10px' }}>{colorInputValue2}</span> {/* Display Hex Code */}
            <div style={{ flexGrow: 1 }} /> {/* Empty space in the center */}
            <input
              type="color"
              value={colorInputValue2}
              onChange={handleColorInputChange2}
              style={{
                width: '56px',
                height: '34px',
                border: 'none',
                borderRadius: '4px', // Make the color input square with rounded corners
                margin: '5px',
              }} 
            />
          </div>

          {/* Text Input */}
          <label style={{ lineHeight: '18px',  color: 'var(--text-color)', fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-small)', marginBottom: '5px', display: 'block', marginTop: '10px' }}>Text<span className='superscript'>*</span></label>
          <input
            type="text"
            placeholder="Enter text"
            value={textInputValue}
            onChange={handleTextInputChange}
            style={{ marginTop: '5px', width: '90%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
        </div>
      )}
    </div>
  );
};

// Default export
export default DropdownWithFields;