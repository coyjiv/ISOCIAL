import styled from "@emotion/styled";

const getButtonIconVariant = (theme) => ({
  icon: {
    padding: "8px 8px 8px 8px",
    borderRadius: "50%",
  },
  text: {
    gap: "10px",
    padding: "6px 0 6px 0",
    width: "100%",
    borderRadius: "4px",
  },
  iconWithBg: {
    padding: "8px 8px 8px 8px",
    borderRadius: "50%",
    backgroundColor: theme.palette.background?.greyHover,
  },
});

export const ButtonBase = styled.button(
  ({ background, color, variant, withHover, theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",

    background: background ? background : "none",
    color,
    transition: "background-color 0.25s ease",
    ...getButtonIconVariant(theme)[variant],
    ...(withHover && {
      "&:hover": {
        backgroundColor:
          variant === "iconWithBg"
            ? theme.palette.background?.darkGreyHover
            : theme.palette.background?.greyHover,
      },
    }),
  }),
);
