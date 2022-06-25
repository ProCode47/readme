import { createStackNavigator } from '@react-navigation/stack';
import BookDetails from '../../features/home/screens/book-details.screen';
import HomeScreen from '../../features/home/screens/home.screen';
import SearchScreen from '../../features/home/screens/search.screen';

const Stack = createStackNavigator();

export const SearchNavigator =()=> {
  return (
      <Stack.Navigator
      screenOptions={{headerShown:false}}>
      <Stack.Screen name="HomePage" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen  name="Books" component={BookDetails}/>
    </Stack.Navigator>
  );
}