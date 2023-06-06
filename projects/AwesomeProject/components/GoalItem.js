import { StyleSheet, View, Text, Pressable } from 'react-native';

function GoalItem(props) {
    return (
        <View style={[styles.listItems, styles.shadow]}>
            <Pressable android_ripple={{color: '#023a1a'}} onPress={props.onDeleteItem.bind(this, props.uuid)}>
                <Text style={styles.itemText}>{'\u2010'} {props.text} </Text>
            </Pressable>
        </View>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    listItems: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#42ad38',
        fontWeight: '400',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    itemText: {
        padding: 16,
        color: 'white',
    }
});