import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserByNameQuery } from "../../store/services/searchService.js";
import { useDebounce } from 'usehooks-ts';

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


const MainSearch = () => {
  const [value, setValue] = useState("");
  const [page] = useState(0);


  const debouncedValue = useDebounce(value, 200);

  const { data, isFetching: isLoading, isSuccess } = useGetUserByNameQuery(
    { name: debouncedValue, page: page },
    { skip: debouncedValue === "" },
  );

  const handleChange = (value) => {
    setValue(value);
  };

  const [options, setOptions] = useState([]);
  const [inputActive, setInputActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBlur = () => {
    setTimeout(() => {
      setInputActive(false);
      setValue("");
      setOptions([]);
    }, 150);
  };

  const handleGoToUser = (id) => {
    if (id) {
      navigate(`/profile/${id}`);
      handleBlur();
    }
  };

  const inputRef = useClickOutside(handleBlur);

  useEffect(() => {
    if (isSuccess && data?.content) {
      setOptions(data.content);
    }
  }, [data?.content, isSuccess])

  useEffect(() => {
    if (value === "") {
      setOptions([]);
    }

    if (inputActive) {
      const t = setTimeout(() => setMenuOpen(true), 80);
      return () => clearTimeout(t);
    }
    if (!inputActive) {
      const t = setTimeout(() => setMenuOpen(false), 80);
      return () => clearTimeout(t);
    }
  }, [inputActive, value]);

  const renderExpression = isLoading
    ? <MainSearchEmptySection isLoading={isLoading} />
    : options.length > 0
      ? options?.map(({ id, firstName, lastName, avatarsUrl }) => (
        <MainSearchItem
          key={id}
          avatars={avatarsUrl}
          variant="search"
          fullName={`${firstName} ${lastName}`}
          onClick={() => handleGoToUser(id)}
        />
      ))
      : <MainSearchEmptySection />;

  return (
    <SearchWrapper open={inputActive} ref={inputRef}>
      <LogoContainer open={inputActive}>
        <LogoHiddenContentWrapper open={inputActive}>
          <LogoLink to="/" open={inputActive}>
            <Typography fontSize="22px" fontWeight="bold">
              iSocial
            </Typography>
          </LogoLink>
          <ActionIconButton onClick={handleBlur} icon="arrowLeft" />
        </LogoHiddenContentWrapper>
      </LogoContainer>
      <SearchContainer>
        <SearchIcon open={inputActive} />
        <SearchBase
          value={value}
          onFocus={() => setInputActive(true)}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e.target.value)}
        />
      </SearchContainer>
      {menuOpen && <SearchMenu>
        {renderExpression}
      </SearchMenu>}
    </SearchWrapper>
  );
};

MainSearch.propTypes = {
  value: PropTypes.string,
  searchItems: PropTypes.array,
  onChange: PropTypes.func,
};

MainSearch.displayName = "MainSearch";

export default MainSearch;
