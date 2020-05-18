import React, {Component } from 'react';
// import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
// import ContactUs from './ContactComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Constants from 'expo-constants';

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);
class Main extends Component {
    constructor(props) {
        super(props);
       
    }
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
    }
    render() {

        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <MenuNavigator/>
            </View>
        );
    }
}

export default Main;
