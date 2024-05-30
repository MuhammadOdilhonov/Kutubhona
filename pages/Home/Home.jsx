import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AuthBook from '../../Api/AuthBook';
import CardBook from '../../components/CardBook/CardBook';

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [showClearIcon, setShowClearIcon] = useState(false); // State for clear icon visibility
    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        AuthBook.GetBook()
            .then((res) => {
                setData(res);
                setFilteredData(res); // Initial filtered data is set to all data
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleSearchChange = (text) => {
        setSearchText(text);
        setShowClearIcon(text.length > 0);
        const searchRegex = new RegExp(text.trim(), 'gi'); // Case-insensitive search with 'gi' flag
        const filteredDat = filteredData.filter(item => searchRegex.test(item.NameBook) || searchRegex.test(item.AfterBook)); // Search by name property (assuming data has a 'name' property)
        setData(filteredDat);
    };

    const handleClearText = () => {
        setData(filteredData)
        setSearchText('');
        setShowClearIcon(false);
    };

    return (
        <View style={styles.HomeScreen}>
            <Animated.View style={styles.header}>
                <View style={styles.container}>
                    <View style={{ ...styles.header_textvsinput }}>
                        <View style={{ zIndex: -1 }}>
                            <Text style={styles.header_textvsinput_title}>Sizga kerak {"\n"}bolgan  kitobni topamiz</Text>
                        </View>
                        <View style={styles.header_textvsinput_search}>
                            <Image source={require('../../assets/search_icon.png')} style={styles.header_textvsinput_search_searchIcon} />
                            <TextInput
                                style={styles.header_textvsinput_search_searchInput}
                                placeholder="Izlash..."
                                placeholderTextColor="black"
                                onChangeText={handleSearchChange}
                                value={searchText}
                            />
                            {showClearIcon && (
                                <TouchableOpacity onPress={handleClearText}>
                                    <Image
                                        source={require('../../assets/clear_icon.png')}
                                        style={styles.header_textvsinput_search_clearIcon}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Animated.View>
            <View style={styles.body}>
                <ScrollView style={{ height: "58%" }} >
                    {
                        data ?
                            data.map((item, i) => {
                                return (
                                    <View key={i}>
                                        <CardBook state={item} />
                                    </View>
                                )
                            })
                            :
                            <ActivityIndicator size="large" color="blue" />
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    HomeScreen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        width: '100%',
        height: 220,
        backgroundColor: 'rgb(217,187,132)',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    header_textvsinput: {
        marginTop: 25,
    },
    header_textvsinput_title: {
        fontFamily: "Poppins",
        fontSize: 35,
        fontWeight: '600',
        lineHeight: 44.16,
        letterSpacing: -0.005,
        textAlign: "left",
        color: 'white'
    },
    header_textvsinput_search: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginTop: 10
    },
    header_textvsinput_search_searchIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
    },
    header_textvsinput_search_searchInput: {
        flex: 1,
        fontSize: 16,
        color: 'black'
    },
    header_textvsinput_search_clearIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    body: {
        paddingTop: 10,
    },
});

export default Home;