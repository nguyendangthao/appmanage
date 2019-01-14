import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CategoryHome from '../src/components/category/categoryhome';
import ProductHome from '../src/components/product/producthome';
import SearchHome from '../src/components/search/searchhome';

export const SearchStack = createStackNavigator({
    searchHome: { screen: SearchHome },
});

export const CategoryStack = createStackNavigator({
    categoryHome: { screen: CategoryHome },
});

export const ProductStack = createStackNavigator({
    productHome: { screen: ProductHome },
});




