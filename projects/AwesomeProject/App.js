import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import uuid from 'react-native-uuid';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  
  function goalInputHandler (enteredText) {
    setEnteredGoalText(enteredText)
  };
  
  function addGoalHandler () {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      {text: enteredGoalText, key: uuid.v4()},
    ]);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="Enter a goal!" 
          onChangeText={goalInputHandler}/>   
          <Button title="Add Goal" color="#599284" onPress={addGoalHandler}/>
      </View>
      <View style={styles.goalsContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>My course goals are:</Text>
        <FlatList 
          data={courseGoals} 
          renderItem={(itemData) => { 
            return (
              <View style={[styles.listItems, styles.shadow]}>
                <Text>{'\u2010'} {itemData.item.text}</Text>
              </View>
            );
          }}
        /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#cef5c2',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#dfeeb4',
    borderRadius: 6,
    borderColor: '#016d30',
    borderWidth: 4,
    padding: 16,
    margin: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 6,
  },  
  listItems: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#42ad38',
    fontWeight: '400',
    color: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
});
