import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Image } from 'react-native'; // RefreshControl-ni import qilib oling
import AuthBook from '../../Api/AuthBook';
import CardBook from '../CardBook/CardBook';

const ALongTime = () => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Refreshing holatini saqlab turuvchi state
    const [nallArray, setNallArray] = useState()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await AuthBook.GetBook();
            const filteredData = response.filter((item) => item.BooleanBook === true);
            if (filteredData == 0) {
                setNallArray(true)
            } else {
                setData(filteredData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false); // Refreshing tugagandan so'ng false qilingan
        }
    };

    const onRefresh = () => {
        setRefreshing(true); // Refreshing boshlandi
        fetchData(); // Malumotlarni qayta yuklash
    };

    return (
        <View style={styles.aLongTime}>
            <Text style={styles.aLongTime_text}>Berib yuborilgan Kitoblar</Text>
            <ScrollView
                refreshControl={ // refreshControl propini qo'shish
                    <RefreshControl
                        refreshing={refreshing} // Refreshing holatini belgilash
                        onRefresh={onRefresh} // Refresh tugmasi bosilganda ishlatiladigan funksiya
                    />
                }
            >
                {data.length > 0 ? (
                    <ScrollView style={{ height: '58%' }}>
                        {data.map((item, i) => (
                            <View key={i}>
                                <CardBook state={item} />
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    nallArray == true ?
                        <View style={styles.content}>
                            <Image
                                source={{ uri: 'https://i.pinimg.com/originals/58/89/72/588972e93d5e0da8a4cb2f7f97108335.gif' }}
                                style={styles.gif}
                            />
                            <Text style={styles.content_text}>Hali hechkim kitob olib ketmadi</Text>
                        </View>
                        :
                        <ActivityIndicator size="large" color="blue" />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    aLongTime: {
        height: '87%',
    },
    aLongTime_text: {
        fontSize: 22,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: 'black',
        marginTop: 15,
        textAlign: 'center',
    },
    content: {
        alignItems: 'center'
    },
    gif: {
        width: 100, // adjust the width as needed
        height: 100, // adjust the height as needed
        marginBottom: 10 // space between the GIF and the text
    },
    content_text: {
        fontSize: 20,
        color: "blue"
    }
});

export default ALongTime;
