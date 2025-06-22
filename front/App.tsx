import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AuthStackNavigator from './src/navigations/AuthStackNavigator';

function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 100,
    width: 100,
    justifyContent: 'center',
  },
});

export default App;
