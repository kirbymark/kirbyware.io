import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import uuid from 'react-native-uuid';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]);
  
  function addGoalHandler (enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      {text: enteredGoalText, uuid: uuid.v4()},
    ]);
  };

  function deleteGoalHandler(uuid) {
    setCourseGoals(currentCourseGoals => {
      {
        return currentCourseGoals.filter((goal) => goal.uuid !== uuid);
      }
    })
  };

  return (
    <View style={styles.appContainer}>

    <GoalInput OnAddGoal={addGoalHandler} />
          
      <View style={styles.goalsContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>My course goals are:</Text>
        <FlatList 
          data={courseGoals} 
          renderItem={(itemData) => { 
            return <GoalItem 
                      text={itemData.item.text} 
                      uuid={itemData.item.uuid} 
                      onDeleteItem={deleteGoalHandler}
                    />;
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
  goalsContainer: {
    flex: 5,
  },
});
