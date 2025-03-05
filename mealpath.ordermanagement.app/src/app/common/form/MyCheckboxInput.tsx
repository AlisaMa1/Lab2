import React, { useState } from 'react';

interface Props {
  roleName: string
}

const CheckboxToggle = (props: Props) => {
  // State to track the checkbox status
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox toggle
  const handleCheckboxToggle = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxToggle}
        />
        {props.roleName}
      </label>
      <p>Checkbox is {isChecked ? 'checked' : 'unchecked'}.</p>
    </div>
  );
};

export default CheckboxToggle;
