const Dropdown = ({ items, selectedValue, setSelectedValue }) => {
  return (
    <select
      onChange={(e) => setSelectedValue(e.target.value)}
      value={selectedValue}
    >
      {items.map((item, i) => (
        <option value={item.value} key={i}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
