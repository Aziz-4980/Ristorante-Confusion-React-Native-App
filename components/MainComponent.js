import React, {Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import ContactUs from './ContactComponent';
// import { View,Platform } from 'react-native';
// import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import AboutUs from './AboutComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';


const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
          headerLeft: <Icon name="menu" size={24} 
          color= 'white'
          onPress={ () => navigation.toggleDrawer() } />          
        })  
    },
        Dishdetail: { screen: Dishdetail ,
        navigationOptions:({navigation}) => ({
            
        headerLeft: <Icon name="menu" size={24}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />
        })}
    },{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headreTitleStyle: {
            color: '#fff'
        }    
    
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home ,
        navigationOptions:({navigation}) => ({
            
        headerLeft: <Icon name="menu" size={24}
        color= 'white'
        onPress={ () => navigation.toggleDrawer() } />
        })
    }
  }, {
    navigationOptions:{
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"}  
    });


const ContactUsNavigator = createStackNavigator({
  ContactUs: { screen: ContactUs ,
    navigationOptions:({navigation}) => ({
        
    headerLeft: <Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer() } />
    })
}
}, {
navigationOptions:{
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTitleStyle: {
      color: "#fff"            
  },
  headerTintColor: "#fff"}  
});

const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs ,
    navigationOptions:({navigation}) => ({
        
    headerLeft: <Icon name="menu" size={24}
    color= 'white'
    onPress={ () => navigation.toggleDrawer() } />
    })
}
}, {
navigationOptions:{
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTitleStyle: {
      color: "#fff"            
  },
  headerTintColor: "#fff"}  
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );


const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        } 
      },
      ContactUs:
      { screen: ContactUsNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='address-card'
                type='font-awesome'            
                size={22}
                color={tintColor}
              />
            ),
        }
      },
      AboutUs:
      { screen: AboutUsNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      }
}, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent

});

class Main extends Component { 
    
    render(){
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS ==='ios' ? 0 : Constants.statusBarHeight }}>
            <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  

export default Main;