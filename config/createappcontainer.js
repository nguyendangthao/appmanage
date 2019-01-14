import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { CategoryStack, ProductStack, SearchStack } from './navigation';

export default createAppContainer(createBottomTabNavigator(
    {
        Search: {
            screen: SearchStack,
            navigationOptions: {
                title: 'Tìm Kiếm',
            },
        },
        Category: {
            screen: CategoryStack,
            navigationOptions: {
                title: 'Loại Hàng',

            },
        },
        Product: {
            screen: ProductStack,
            navigationOptions: {
                title: 'Sản Phẩm',
            },
        },

    },

    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Search') {
                    iconName = `ios-search`;
                }
                else if (routeName === 'Category') {
                    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'Product') {
                    iconName = `ios-square${focused ? '' : '-outline'}`;
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            activeBackgroundColor: '#aec9e1',
            labelStyle: {
                fontSize: 16
            }
        },
    }
));