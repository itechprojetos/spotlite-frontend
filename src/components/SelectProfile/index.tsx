import React from 'react';

import Select from 'react-select';

function PickerProfile({
  OnChange,
  options,
  placeholder,
  isMulti,
  name,
  defaultValue,
}: any) {
  // Customização visual do Picker
  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 55,
    }),
  };


  return (
    <div>
      <Select
        options={options}
        name={name}
        styles={customStyles}
        isMulti={isMulti}
        placeholder={placeholder}
        onChange={OnChange}
        defaultValue={defaultValue}
        theme={(theme) => ({
          ...theme,
          borderRadius: 7,
        })}
      />
    </div>
  );
}

export default PickerProfile;
