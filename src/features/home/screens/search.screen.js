import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Text } from "../../../components/text";
import { Header } from "../components/home.styles";
import { Pressable, ScrollView, View } from "react-native";
import { Spacer } from "../../../components/spacer";
import { Card } from "react-native-paper";
import {GOOGLE_API_KEY} from '@env'
import styled from "styled-components";
import notAvailable from "../../../utility/404.jpg";
import { Dimensions } from "react-native";
const DEVICE_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = DEVICE_WIDTH / 2.2

export const LibraryCard = styled(Card)`

margin-left:10px;
border-radius:5px;
margin-bottom:5px
margin-top: 10px
width: ${CARD_WIDTH}px;


`;
export const LibraryContent = styled(Card.Content)`
  justify-content: center;
  align-items: center;
`;

export default function SearchScreen({ route, navigation }) {
  const [books, setBooks] = useState(null);
  const search = route.params.search;
  const [bookError, setBookError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setBookError(
        "Book not found, please use a valid keyword and try again"
      );
    }, 2800);
  }, []);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?&maxResults=25&q=${
        search.selectedCriteria === "title"
          ? `intitle:${search.searchQuery}&`
          : ""
      }
      ${
        search.selectedCriteria === "author"
          ? `inauthor:${search.searchQuery}&`
          : ""
      }
      ${search.selectedCriteria === "isbn" ? `isbn:${search.searchQuery}&` : ""}
      key=${GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.items);
        setBooks(res.items);
      })
      .catch(console.error);
  }, [route]);
  return (
    <SafeArea>
      <Header>
        <Text>
          Search Results for <Text variant="caption">{search.searchQuery}</Text>{" "}
        </Text>
      </Header>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {books &&
          books.map((item, index) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Books", {
                  isbn: item.volumeInfo.industryIdentifiers
                    ? item.volumeInfo.industryIdentifiers[0].identifier
                    : null,
                })
              }
              key={index}
            >
              <LibraryCard>
                <Card.Cover
                  source={
                    item.volumeInfo.imageLinks
                      ? {
                          uri: item.volumeInfo.imageLinks.thumbnail,
                        }
                      : notAvailable
                  }
                />
                <LibraryContent>
                  <Spacer position="top" />
                  <Text variant="caption2">{item.volumeInfo.title}</Text>
                  <Spacer position="top" />
                  <Text variant="body_tc">{item.volumeInfo.authors}</Text>
                </LibraryContent>
              </LibraryCard>
            </Pressable>
          ))}
        {!books && (
          <>
            <View
              style={{
                flex: 1,
                height: 400,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <Text variant="label_center">{bookError}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeArea>
  );
}
