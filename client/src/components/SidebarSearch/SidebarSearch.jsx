import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import { SearchBase, SearchContainer } from "./SidebarSearch.styled";
import { useTheme } from "@mui/material";

const SidebarSearch = ({ value, placeholder, onChange, ...props }) => {
  const { palette } = useTheme();

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <SearchContainer {...props}>
      <FiSearch color={palette.greyColor} />
      <SearchBase
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </SearchContainer>
  );
};

SidebarSearch.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SidebarSearch.displayName = "SidebarSearch";

export default SidebarSearch;
