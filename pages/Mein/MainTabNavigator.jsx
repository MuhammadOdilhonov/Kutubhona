import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Home/Home';
import ALongTime from '../../components/ALongTime/ALongTime';
import Law from '../../components/Law/Law';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
    </Stack.Navigator>
);

const ALongTimeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ALongTimeScreen" component={ALongTime} />
    </Stack.Navigator>
);
const LawStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LawScreen" component={Law} />
    </Stack.Navigator>
);

const MainTabNavigator = () => {
    const Dot = ({ color, focused }) => (
        focused ? (
            <View
                style={{
                    width: 5, // Nuqta o'lchami
                    height: 5, // Nuqta balandligi
                    top: 10,
                    borderRadius: 4, // Nuqta radiusi (eng/bo'yi)
                    backgroundColor: "#925BFE", // Nuqta rangi
                }}
            />
        ) : null
    );

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: "red" }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#190482',
                    tabBarInactiveTintColor: "#5FBDFF",
                    tabBarLabelStyle: { display: "none" },
                    tabBarStyle: {
                        borderRadius: 50,
                        position: 'absolute',
                        bottom: 10,
                        left: 20.5,
                        right: 20.5,
                        height: 85,
                        borderRadius: 23,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 44,
                        paddingBottom: 10,
                    },
                }}>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={{ flexWrap: "wrap", alignItems: "center" }}>
                                <Image
                                    source={require('../../assets/home_icon.png')}
                                    style={{ width: 35, height: 35, tintColor: color }}
                                />
                                <Dot focused={focused} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="ALongTime"
                    component={ALongTimeStack}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={{ flexWrap: "wrap", alignItems: "center" }}>
                                <Image
                                    source={require('../../assets/ALongTime.png')}
                                    style={{ width: 35, height: 35, tintColor: color }}
                                />
                                <Dot focused={focused} />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Law"
                    component={LawStack}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={{ flexWrap: "wrap", alignItems: "center" }}>
                                <Image
                                    source={require('../../assets/Law.png')}
                                    style={{ width: 35, height: 35, tintColor: color }}
                                />
                                <Dot focused={focused} />
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </View >
    );
}


export default MainTabNavigator;
