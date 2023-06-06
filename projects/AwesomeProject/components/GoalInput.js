import { StyleSheet, View, TextInput, Button, Modal, Image } from 'react-native';
import { useState } from 'react';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler (enteredText) {
        setEnteredGoalText(enteredText)
      };
      
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
        <Modal visible={props.visible} animationType="slide" transparent={true}>
            <View style={styles.inputBackground}>
                <View style={styles.inputContainer}>
                    <Image style={styles.image} source={require('../assets/images/goal.png')} />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Enter a goal!"
                        placeholderTextColor="#bbbbbb" 
                        onChangeText={goalInputHandler}
                        value={enteredGoalText}    
                    />
                    <View style={styles.buttonContainer}>  
                        <View style={styles.button}>
                            <Button title="Add Goal" color="#42ad38" onPress={addGoalHandler}/>
                        </View>    
                        <View style={styles.button}>  
                            <Button title="Cancel" color="#94c706" onPress={props.onCancel} />
                        </View>            
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: '#1c7401',
        borderRadius: 6,
        borderColor: '#016d30',
        borderWidth: 4,
        padding: 16,
        margin: 8,
        height: 300,
      },
    inputBackground: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.75)',
      },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 6,
        width: '100%',
        padding: 6,
        color: 'white',
      },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    button: {
        width: '30%',
        marginHorizontal: 8,
    },
    image: {
        width: 100,
        height: 100,
        margin: 8,
    },
});