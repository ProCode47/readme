import { SafeArea } from "../../../utility/safe-area";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import notAvailable from "../../../utility/404.jpg";
import * as Linking from 'expo-linking';
import { ActivityIndicator } from 'react-native-paper';
import { GOOGLE_API_KEY } from '@env'
import NetInfo from '@react-native-community/netinfo';



import {
  Header,
  FavouriteIcon,
  BackIcon,
  ImageSource,
  HeaderRow,
} from "../components/home.styles";
import { Text } from "../../../components/text";
import { View, ScrollView, Pressable } from "react-native";

const BookDisplay = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 40px;
`;
const BookDisplayImage = styled.View`
  width: 80%;
  height: 220px;
  margin: 0 auto;
  margin-top: -20px;
`;
const BookDisplayInfo = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const BookShadow = styled.View`
  position: relative;
  width: 60%;
  height: 220px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 30px;
`;
const InfoText = styled.View`
height:50px
justify-content:space-between;
align-items:center;
`;
const ActionTab = styled.View`
  flex-direction: row;
  width: 85%;
  height: 50px;
  border-radius: 15px;
  margin: 0 auto;
  overflow: hidden;
`;
const Press = styled(Pressable)`
width:50%
margin-right: 2px;

`;

const Action = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  align-items: center;
  justify-content: space-evenly;
`;

export default function BookDetails({ route, navigation }) {
  const [book, setBook] = useState(null);
  const [NetworkError, setNetworkError] = useState(true);
  const NETWORK_ERROR_MESSSAGE = "Oops... it seems you are offline"

  
  useEffect(() => {
    const netSubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setNetworkError(state.isInternetReachable)
    });
    
    // To subscribe to these update, just use:
    netSubscribe();
  },[])
  

  useEffect(() => {
    // console.log(route.params.isbn);
    const isbn = route.params.isbn;
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.items[0]);
        setBook(res.items[0]);
      })
      .catch(console.error);
  }, [route]);

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <Header>
        <BackIcon onPress={() => navigation.goBack()} />
        <FavouriteIcon />
      </Header>
      {!book && <View style={{ height: 500, justifyContent: "center", alignItems: "center" }}>
      {NetworkError ? <ActivityIndicator animating={true} size={50} color="#7D4A4A" />: <Text>{NETWORK_ERROR_MESSSAGE}</Text>}
      </View>}
      {book && (
        <ScrollView>
          <Spacer size="large" />
          <BookDisplay>
            <BookShadow>
              <BookDisplayImage>
                <ImageSource
                    source={
                      book.volumeInfo.imageLinks
                        ? {
                            uri: book.volumeInfo.imageLinks.thumbnail,
                          }
                        : notAvailable
                    }
                  resizeMode={"cover"}
                />
              </BookDisplayImage>
            </BookShadow>
            <Spacer size="medium" />
            <Text variant="title_center">{book.volumeInfo.title}</Text>
            <Text variant="label_center">{book.volumeInfo.authors[0]}</Text>
          </BookDisplay>
          <BookDisplayInfo>
            <InfoText>
              <Text variant="caption"> Rating </Text>
              <Text variant="label">
                <Ionicons name="star" size={15} color="#FEC600" />{" "}
                {book.volumeInfo.averageRating ? (
                  book.volumeInfo.averageRating
                ) : (
                  <Text>N/A</Text>
                )}{" "}
              </Text>
            </InfoText>
            <InfoText>
              <Text variant="caption"> Language </Text>
              <Text variant="label">
                {" "}
                {book.volumeInfo.language.toUpperCase()}{" "}
              </Text>
            </InfoText>
            <InfoText>
              <Text variant="caption"> Pages </Text>
              <Text variant="label"> {book.volumeInfo.pageCount} </Text>
            </InfoText>
            <InfoText>
              <Text variant="caption"> Audio </Text>
              <Text variant="label"> N/A </Text>
            </InfoText>
          </BookDisplayInfo>
          <Spacer size="large" />
          <ActionTab>
            <Press
              onPress={book.volumeInfo.previewLink ? ()=> Linking.openURL(book.volumeInfo.previewLink): ()=>null}
            >
              <Action>
                <Feather name="book-open" size={20} color="#fff" />
               <Text variant="white"> Read Book </Text>
              </Action>
            </Press>
            <Press
              onPress={book.volumeInfo.infoLink ? ()=> Linking.openURL(book.volumeInfo.infoLink) : () => null}
            >
              <Action>
                <Feather name="credit-card" size={20} color="#fff" />
                <Text variant="white">Buy Book </Text>
              </Action>
            </Press>
          </ActionTab>
          <Spacer size="xl" />
          <HeaderRow>
            <Spacer position="left" size="medium">
              <Text variant="h">What's it about ?</Text>
            </Spacer>
          </HeaderRow>
          <View style={{ padding: 10 }}>
            <Text variant="body">{book.volumeInfo.description} </Text>
          </View>
        </ScrollView>
      )}
    </SafeArea>
  );
}
