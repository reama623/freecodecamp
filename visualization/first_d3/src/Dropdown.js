const Dropdown = ({ options, selectedValue, onSelectedValueChange }) => {
  return (
    <select
      onChange={(e) => onSelectedValueChange(e.target.value)}
      value={selectedValue}
    >
      {options.map((item, i) => (
        <option value={item.value} key={i}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
