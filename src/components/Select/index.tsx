import React from 'react';

import Select from 'react-select';

function Picker({
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
      height: 45,
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
          borderRadius: 3,
        })}
      />
    </div>
  );
}

export default Picker;
