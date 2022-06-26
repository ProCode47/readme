import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/text";
import { Spacer } from "../../../components/spacer";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator } from "react-native-paper";
import {NYTIMES_API_KEY} from '@env'
import {
  ScrollView,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { Card, Button } from "react-native-paper";
import {
  BellIcon,
  BookCard,
  BookImage,
  BookInfo,
  BrandText,
  Header,
  HeaderRow,
  HomeSearch,
  ImageSource,
  LibraryCard,
  LibraryContent,
  MenuIcon,
} from "../components/home.styles";

export default function HomeScreen({ navigation }) {
  const [selectedCriteria, setSelectedCriteria] = useState("title");
  const [fictionList, setFictionList] = useState();
  const [nonFictionList, setNonFictionList] = useState();
  const [listLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${NYTIMES_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setFictionList(res.results.books);
      })
      .catch(console.error);
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${NYTIMES_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setNonFictionList(res.results.books);
      })
      .catch(console.error);
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeArea>
      {/* Header Section */}
      <Header>
        <MenuIcon onPress={() => navigation.openDrawer()} />
        <BrandText>readme</BrandText>
        <BellIcon />
      </Header>
      <Spacer size="medium" />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "grey",
            justifyContent: "space-between",
          }}
        >
          <HomeSearch
            onSubmitEditing={() => {
              navigation.push("Search", {
                search: { searchQuery, selectedCriteria },
              });
            }}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <Picker
            style={{ width: "30%", backgroundColor: "white" }}
            itemStyle={{ backgroundColor: "yellow" }}
            prompt="Select Search Criteria"
            selectedValue={selectedCriteria}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCriteria(itemValue)
            }
          >
            <Picker.Item label="Title" value="title" />
            <Picker.Item label="ISBN" value="isbn" />
            <Picker.Item label="Author" value="author" />
          </Picker>
        </View>
        {!listLoaded && (
          <View
            style={{
              height: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator animating={true} size={50} color="#7D4A4A" />
          </View>
        )}

        {fictionList && nonFictionList && (
          <>
            <Spacer size="large" />
            {/* Explore Section */}
            <HeaderRow>
              <Spacer position="left" size="medium">
                <Text variant="h1">Best Sellers (Fiction) </Text>
              </Spacer>
              <Spacer position="right" size="small">
                <Text variant="muted">
                  View all
                  <Feather name="chevron-right" size={15} />
                </Text>
              </Spacer>
            </HeaderRow>
            <Spacer size="medium" />
            <View style={{ height: 130 }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={fictionList}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Books", {
                          isbn: item.primary_isbn13,
                        })
                      }
                    >
                      <BookCard>
                        <BookImage>
                          <ImageSource
                            source={{ uri: item.book_image }}
                            resizeMode={"cover"}
                          />
                        </BookImage>
                        <BookInfo>
                          <Text variant="label2">
                            <Ionicons name="star" size={15} color="#FEC600" />
                            <Spacer position="left" /> {item.rank}
                          </Text>
                          <Text variant="caption">{item.title}</Text>
                          <Text variant="label">{item.author}</Text>
                        </BookInfo>
                      </BookCard>
                    </Pressable>
                  );
                }}
                keyExtractor={(item) => item.primary_isbn10}
              />
            </View>
            <Spacer size="large" />
            {/* Reading Section */}
            <HeaderRow>
              <Spacer position="left" size="medium">
                <Text variant="h1">Best Sellers (Non-Fiction)</Text>
              </Spacer>
              <Spacer position="right" size="small">
                <Text variant="muted">
                  View all
                  <Feather name="chevron-right" size={15} />
                </Text>
              </Spacer>
            </HeaderRow>
            <Spacer size="medium" />
            <View style={{ height: 300 }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={nonFictionList}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      onLayout={setLoaded(true)} //experimental
                      onPress={() =>
                        navigation.navigate("Books", {
                          isbn: item.primary_isbn13,
                        })
                      }
                    >
                      <LibraryCard>
                        <Card.Cover source={{ uri: item.book_image }} />
                        <LibraryContent>
                          <Spacer position="top" />
                          <Text variant="caption2">{item.title}</Text>
                          <Spacer position="top" />
                          <Text variant="body_tc">{item.author}</Text>
                        </LibraryContent>
                      </LibraryCard>
                    </Pressable>
                  );
                }}
                keyExtractor={(item) => item.primary_isbn10}
              />
            </View>
            <Spacer size="large" />
            {/* Popular Authors */}
            <HeaderRow>
              <Spacer position="left" size="medium">
                <Text variant="h1">
                  Popular Authors <Spacer position="left" />{" "}
                  <Feather name="pen-tool" size={15} color="#7D4A4A" />
                </Text>
              </Spacer>
              <Spacer position="right" size="small">
                <Text variant="muted">
                  Swipe to see all
                  <Feather name="chevron-right" size={15} />
                </Text>
              </Spacer>
            </HeaderRow>
            <Spacer size="medium" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  width: Dimensions.get("window").width,
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Spacer position="left" size="medium">
                  <Spacer position="bottom">
                    <Text variant="h2">Classics</Text>
                  </Spacer>
                </Spacer>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "William Shakespeare",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  William Shakespeare
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "F. Scott Fitzgerald",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  F. Scott Fitzgerald
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Jane Austen",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Jane Austen
                </Button>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width,
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Spacer position="left" size="medium">
                  <Spacer position="bottom">
                    <Text variant="h2">Mystery - Thriller</Text>
                  </Spacer>
                </Spacer>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Agatha Christie",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Agatha Christie
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Stephen King",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Stephen King
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "James Patterson",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  James Patterson
                </Button>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width,
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Spacer position="left" size="medium">
                  <Spacer position="bottom">
                    <Text variant="h2">Romance</Text>
                  </Spacer>
                </Spacer>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Danielle Steel",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Danielle Steel
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Nicholas Sparks",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Nicholas Sparks
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Nora Roberts",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Nora Roberts
                </Button>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width,
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Spacer position="left" size="medium">
                  <Spacer position="bottom">
                    <Text variant="h2">Childrens</Text>
                  </Spacer>
                </Spacer>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "J. K. Rowling",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  J. K. Rowling
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Dr. Seuss",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Dr. Seuss
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "Roald Dahl",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  Roald Dahl
                </Button>
              </View>
              <View
                style={{
                  width: Dimensions.get("window").width,
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Spacer position="left" size="medium">
                  <Spacer position="bottom">
                    <Text variant="h2">Fantasy</Text>
                  </Spacer>
                </Spacer>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "J. R. R. Tolkien",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  J. R. R. Tolkien
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "C. S. Lewis",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  C. S. Lewis
                </Button>
                <Button
                  onPress={() => {
                    navigation.push("Search", {
                      search: {
                        searchQuery: "George R.R. Martin",
                        selectedCriteria: "author",
                      },
                    });
                  }}
                  mode="contained"
                  color="#7D4A4A"
                  style={{ width: "70%", marginBottom: 10 }}
                >
                  George R.R. Martin
                </Button>
              </View>
            </ScrollView>
          </>
        )}
      </ScrollView>
    </SafeArea>
  );
}
