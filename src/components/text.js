import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const title = (theme) => `
    font-size: ${theme.fontSizes.h4};
`;
const title_center = (theme) => `
font-size: ${theme.fontSizes.h4};
text-align:center;
padding:5px;
`;

const h1 = (theme) => `
font-size: ${theme.fontSizes.h5};
`;
const h = (theme) => `
font-size: ${theme.fontSizes.h5};
font-weight: ${theme.fontWeights.bold};

`;

const h2 = (theme) => `
font-size: ${theme.fontSizes.title};

`;

const caption2 = (theme) => `
font-size: ${theme.fontSizes.title};
font-weight: ${theme.fontWeights.bold};
text-align:center;
`;
const caption = (theme) => `
font-size: ${theme.fontSizes.title};
font-weight: ${theme.fontWeights.bold};
`;
const label = (theme) => `
font-size: ${theme.fontSizes.body};
font-weight: ${theme.fontWeights.regular};
text-transform: uppercase;
`;
const label_center = (theme) => `
font-size: ${theme.fontSizes.body};
font-weight: ${theme.fontWeights.regular};
text-transform: uppercase;
text-align:center;
`;
const label2 = (theme) => `
font-size: ${theme.fontSizes.body};
font-weight: ${theme.fontWeights.regular};
`;
const body = (theme) => `
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.regular};
`;
const body_tc = (theme) => `
font-size: ${theme.fontSizes.body};
font-weight: ${theme.fontWeights.regular};
text-align: center;
`;
const error = (theme) => `
    color: ${theme.colors.text.error};
`;
const success = (theme) => `
    color: ${theme.colors.text.success};
`;
const muted = (theme) => `
    color: ${theme.colors.brand.muted};
`;
const white = (theme) => `
    color: ${theme.colors.bg.primary};
font-size: ${theme.fontSizes.title};

`;


const variants = {
  title,
  title_center,
  h,
  h1,
  h2,
  caption,
  caption2,
  label,
  label_center,
  label2,
  body,
  body_tc,
  error,
  muted,
  success,
  white
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
