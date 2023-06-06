import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textstyle1}>This is my Awesome Project</Text>
      <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="Enter a goal" />
          <Button title="Add Goal" color="#599284"/>
      </View>
      <View>
          <Text>List of Goals</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  textstyle1: {
    margin: 16, 
    borderWidth: 1, 
    borderColor: 'orange', 
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '80%',
    marginRight: 8,
  }
});
