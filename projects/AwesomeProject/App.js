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
      
      <View style={styles.FlexBox}>
        <View style={styles.Box1}>
          <Text>1</Text>
        </View>
        <View style={styles.Box2}>
          <Text>2</Text>
        </View>
        <View style={styles.Box3}>
          <Text>3</Text>
        </View>
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
    padding: 20,
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
  Box1: {
    backgroundColor: 'red',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box2: {
    backgroundColor: 'green',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box3: {
    backgroundColor: 'cyan',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlexBox: {
    padding: 5,
    flexDirection: 'row',
    width: '80%',
    height: 300,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '80%',
    marginRight: 8,
  }
});
