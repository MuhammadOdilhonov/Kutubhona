import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'; // RefreshControl-ni import qilib oling
import AuthBook from '../../Api/AuthBook';
import CardBook from '../CardBook/CardBook';

const ALongTime = () => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Refreshing holatini saqlab turuvchi state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await AuthBook.GetBook();
            const filteredData = response.filter((item) => item.BooleanBook === true);
            setData(filteredData);
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
});

export default ALongTime;
