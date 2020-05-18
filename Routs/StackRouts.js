import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Dishdetail from '../components/DishdetailComponent';
import Menu from '../components/MenuComponent';

const screens={
    Menu:{screen:Menu},
    Dishdetail:{screen:Dishdetail},
}
const  MainStack= createStackNavigator(screens);

export default createAppContainer(MainStack);

