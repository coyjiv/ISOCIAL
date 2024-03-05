import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActionIconButton } from "../index";
import { MainSearchItem } from "./MainSearchItem";
import {
  LogoContainer,
  LogoHiddenContentWrapper,
  LogoLink,
  SearchBase,
  SearchContainer,
  SearchIcon,
  SearchMenu,
  SearchWrapper,
} from "./MainSearch.styled";
import { useClickOutside } from "../../hooks/index.js";
import MainSearchEmptySection from "./MainSearchEmptySection/MainSearchEmptySection.jsx";

// eslint-disable-next-line react/prop-types
const MainSearch = ({ value, searchItems, onChange }) => {
  const [options, setOptions] = useState(searchItems);
  const [inputActive, setInputActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBlur = () => {
    setInputActive(false);
    onChange("");
    setOptions([]);
  };

  const handleGoToUser = (id) => {
    if (id) {
      navigate(`/profile/${id}`);
    }
  };

  const inputRef = useClickOutside(handleBlur);

  const handleChange = ({ target }) => {
    onChange(target.value);
  };

  useEffect(() => {
    if (value === "") {
      setOptions([]);
    } else {
      setOptions(searchItems);
    }

    if (inputActive) {
      const t = setTimeout(() => setMenuOpen(true), 80);
      return () => clearTimeout(t);
    }
    if (!inputActive) {
      const t = setTimeout(() => setMenuOpen(false), 80);
      return () => clearTimeout(t);
    }
  }, [inputActive, searchItems, value]);

  return (
    <SearchWrapper open={inputActive} ref={inputRef}>
      <LogoContainer open={inputActive}>
        <LogoHiddenContentWrapper open={inputActive}>
          <LogoLink to="/" open={inputActive}>
            <Typography fontSize="22px" fontWeight="bold">
              iSocial
            </Typography>
          </LogoLink>
          <ActionIconButton icon="arrowLeft" />
        </LogoHiddenContentWrapper>
      </LogoContainer>
      <SearchContainer>
        <SearchIcon open={inputActive} />
        <SearchBase
          value={value}
          onFocus={() => setInputActive(!inputActive)}
          onChange={(e) => handleChange(e)}
          placeholder="Search Isocial"
        />
      </SearchContainer>
      {menuOpen && options && (
        <SearchMenu>
          {options?.map(({ id, firstName, lastName, avatarsUrl }) => (
            <MainSearchItem
              key={id}
              avatars={avatarsUrl}
              variant="search"
              fullName={`${firstName} ${lastName}`}
              onClick={() => handleGoToUser(id)}
            />
          ))}
        </SearchMenu>
      )}
      {menuOpen && options?.length === 0 && (
        <SearchMenu>
          <MainSearchEmptySection title="No results" user="user" />
        </SearchMenu>
      )}
    </SearchWrapper>
  );
};

MainSearch.propTypes = {
  searchItems: PropTypes.array,
  onChange: PropTypes.func,
};

MainSearch.displayName = "MainSearch";

export default MainSearch;
