import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="Enter a goal!" />
          <Button title="Add Goal" color="#599284"/>
      </View>
      <View style={styles.goalsContainer}>
          <Text>List of Goals...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#1f3',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  textstyle1: {
    margin: 16, 
    borderWidth: 1, 
    borderColor: 'orange', 
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    flex : 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  goalsContainer: {
    flex: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
});
