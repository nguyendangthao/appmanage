import React from 'react';
import { Button, Text, View, Picker, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
class ProductHome extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ProductHome1111!</Text>
                <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

export default ProductHome

