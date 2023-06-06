import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler (enteredText) {
        setEnteredGoalText(enteredText)
      };
      
    function addGoalHandler() {
        props.OnAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput} 
                placeholder="Enter a goal!" 
                onChangeText={goalInputHandler}
                value={enteredGoalText}    
            />   
            <Button title="Add Goal" color="#599284" onPress={addGoalHandler}/>
        </View>
    );
}

export default GoalInput;

const styles = StyleSheet.create({
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
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 6,
      },  
});