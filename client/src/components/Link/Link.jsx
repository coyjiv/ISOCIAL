import PropTypes from "prop-types";
import { LinkBase } from "./Link.styled.js";

const Link = ({ to, color, children }) => {
  return (
    <LinkBase color={color} to={to}>
      {children}
    </LinkBase>
  );
};

Link.propTypes = {
  color: PropTypes.oneOf(["grey", "blue"]),
  to: PropTypes.string,
  children: PropTypes.any,
};

Link.defaultProps = {
  color: "grey",
};

Link.displayName = "Link";

export default Link;
