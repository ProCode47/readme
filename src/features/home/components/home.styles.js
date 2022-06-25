import styled from "styled-components/native";
import { Text } from "../../../components/text";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../infrastructure/theme/colors";

import { Card, Searchbar } from "react-native-paper";

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 60px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const MenuIcon = styled(Feather).attrs({
  name: "menu",
  size: 20,
  color: colors.brand.primary,
})``;
export const BellIcon = styled(Feather).attrs({
  name: "bell",
  size: 20,
  color: colors.ui.primary,
})``;
export const EditIcon = styled(Feather).attrs({
  name: "edit",
  size: 20,
  color: colors.ui.primary,
})``;
export const BackIcon = styled(Feather).attrs({
  name: "chevron-left",
  size: 20,
  color: colors.brand.primary,
})``;
export const FavouriteIcon = styled(Feather).attrs({
  name: "heart",
  size: 20,
  color: colors.brand.primary,
})``;
export const BrandText = styled(Text).attrs({
  variant: "title",
})``;
export const HomeSearch = styled(Searchbar).attrs({
  placeholder: "search books",
  iconColor: colors.text.primary,
})`
  color: ${(props) => props.theme.colors.text.primary};
  width: 69.5%;
  border-radius: 0px;
`;
export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const BookCard = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 10px;
  flex-direction: row;
  height: 120px;
  border-radius: 5px;
  width: 300px;
  elevation: 1;
`;
export const BookImage = styled.View`
  width: 35%;
`;
export const ImageSource = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
export const BookInfo = styled.View`
  width: 65%;
  justify-content: space-evenly;
  padding: 10px;
`;
export const ReadingCard = styled.View`
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  width: 150px;
  height: 250px;
  border-radius: 10px;
  position: relative;
`;
export const ReadingTitle = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 150px;
  position: absolute;
  border-radius: 10px;
  top: 25%;
  z-index: -10;
  elevation: 2;
  justify-content: center;
  align-items: center;
`;
export const ReadingImage = styled.View`
  width: 80%;
  margin: 0 auto;
  height: 150px;
  border-radius: 10px;
`;
export const TextOffset = styled.View`
  margin-top: 55%;
`;
export const LibraryCard = styled(Card)`
margin-left:5px;
margin-right:5px
border-radius:5px;
margin-bottom:5px
width:150px;

`;
export const LibraryContent = styled(Card.Content)`
  justify-content: center;
  align-items: center;
`;
