import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ActivityIndicator, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthBook from '../../Api/AuthBook';

const CardBook = (props) => {
    const [modalVisible, setModalVisible] = useState(false); // Modal ochish/yoqish uchun
    const [modalNewWindow, setmodalNewWindow] = useState(false);
    const [idBook, setIdBook] = useState()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [opketishKun, setOpketishKun] = useState('');
    const [opkelishKun, setOpkelishKun] = useState('');

    const prosp = props?.state;

    const Dot = ({ focused }) => (
        <View
            style={{
                position: "absolute",
                width: 15, // Nuqta o'lchami
                height: 15, // Nuqta balandligi
                top: 10,
                right: 15,
                borderRadius: 10, // Nuqta radiusi (eng/bo'yi)
                backgroundColor: focused ? "red" : "green", // Nuqta rangi, focused bo'lsa "#8EF4BC" rangni ko'rsat, aks holda "#ccc" rangni ko'rsat
            }}
        />
    );

    const handleButtonClick = (params) => {
        setIdBook(params)
        setModalVisible(true); // Modalni ochish
    };
    const ViewNewWindow = (params) => {
        setIdBook(params)
        setmodalNewWindow(true);
    }

    const handleModalClose = () => {
        setModalVisible(false); // Modalni yopish
        setmodalNewWindow(false)
        setName('');
        setPhone('');
        setEmail('');
        setDescription('');
        setOpketishKun('');
        setOpkelishKun('');
    };

    const handleSend = () => {
        // Inputlarni tekshirish
        if (!name || !phone || !email || !description || !opketishKun || !opkelishKun) {
            // Agar bittasi ham to'ldirilmagan bo'lsa, alert chiqaring
            alert('Iltimos, barcha maydonlarni to\'ldiring.');
            return; // Yuborishni davom etmang
        }

        setIsLoading(true); // Yuborishni boshladik
        let newData = {
            name: name,
            phone: phone,
            email: email,
            description: description,
            opketishKun: opketishKun,
            opkelishKun: opkelishKun
        };

        idBook.data = { ...idBook.data, ...newData };
        idBook.BooleanBook = true;

        AuthBook.putBook(idBook.id, idBook)
            .then(res => {
                setIsLoading(false);
                setModalVisible(false) // Yuborish tugadi, loading holatini o'chiramiz
                // Sahifani yangilash logikasi shu joyda qo'shilishi mumkin
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false); // Yuborishda xatolik ro'y berib, loading holatini o'chiramiz
            });
    };


    const handleSendCleaning = () => {
        setIsLoading(true); // Yuborishni boshladik
        let newData = {};

        idBook.data = { ...idBook.data, ...newData };
        idBook.BooleanBook = false;

        AuthBook.putBook(idBook.id, idBook)
            .then(res => {
                setIsLoading(false);
                setmodalNewWindow(false)// Yuborish tugadi, loading holatini o'chiramiz
                // Sahifani yangilash logikasi shu joyda qo'shilishi mumkin
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false); // Yuborishda xatolik ro'y berib, loading holatini o'chiramiz
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.CardBook}>
                <View style={styles.CardBook_left}>
                    <View style={styles.CardBook_left_imguser}>
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: prosp.ImageBook }} />
                    </View>
                </View>
                <View style={styles.CardBook_right}>
                    <Text style={styles.CardBook_right_BookName}>{prosp.NameBook}</Text>
                    <Text style={styles.CardBook_right_BookInfo}>{prosp.SeriesBook}</Text>
                    <Text style={styles.CardBook_right_BookInfo}>After:{prosp.AfterBook}</Text>
                    <TouchableOpacity style={styles.CardBook_right_button} onPress={() => { prosp.BooleanBook ? ViewNewWindow(prosp) : handleButtonClick(prosp) }}>
                        <Text style={styles.CardBook_right_buttonText}>
                            {prosp.BooleanBook ? "Kim olib ketganini ko`rish" : "Arendaga berish"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Dot focused={prosp.BooleanBook} />
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Malunmot to`ldiring</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(8, 12, 47, 0.65)"
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(8, 12, 47, 0.65)"
                            placeholder="+998 999 99 99"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(8, 12, 47, 0.65)"
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(8, 12, 47, 0.65)"
                            placeholder="Olib ketadigan kun"
                            keyboardType="decimal-pad"
                            value={opketishKun}
                            onChangeText={setOpketishKun}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(8, 12, 47, 0.65)"
                            placeholder="Olib keladigan kun"
                            keyboardType="decimal-pad"
                            value={opkelishKun}
                            onChangeText={setOpkelishKun}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(8, 12, 47, 0.65)"
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <View style={{ width: 200, flexDirection: "row" }}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                                <Text style={styles.modalButtonText}>Orqaga</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleSend}>
                                {
                                    isLoading ?
                                        <ActivityIndicator size="large" color="blue" />
                                        :
                                        <Text style={styles.modalButtonText}>Yuborish</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNewWindow}
                onRequestClose={handleModalClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>To'liq malumot</Text>
                        <View style={styles.modalInfo}>
                            <Text style={styles.modalInfoText}>Name: {idBook && idBook.data.name}</Text>
                            <Text style={styles.modalInfoText}>Phone: <TouchableOpacity onPress={() => Linking.openURL(`tel:${idBook && idBook.Number}`)}><Text style={{ color: "rgb(172,122,217)" }}>{idBook && idBook.data.phone}</Text></TouchableOpacity></Text>
                            <Text style={styles.modalInfoText}>Email: {idBook && idBook.data.email}</Text>
                            <Text style={styles.modalInfoText}>Olib ketadigan kun: {idBook && idBook.data.opketishKun}</Text>
                            <Text style={styles.modalInfoText}>Olib keladigan kun: {idBook && idBook.data.opkelishKun}</Text>
                            <Text style={styles.modalInfoText}>Description: {idBook && idBook.data.description}</Text>
                        </View>
                        <View style={{ width: 200, flexDirection: "row" }}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                                <Text style={styles.modalButtonText}>Orqaga</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleSendCleaning}>
                                {
                                    isLoading ?
                                        <ActivityIndicator size="large" color="blue" />
                                        :
                                        <Text style={styles.modalButtonText}>Olib keldi</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    CardBook: {
        height: 140,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'rgba(247, 248, 248, 1)',
    },
    CardBook_left: {
        width: 90,
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    CardBook_left_imguser: {
        width: 100,
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    CardBook_right: {
        width: 200,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 15,
    },
    CardBook_right_BookName: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.02,
        textAlign: 'left',
        color: "rgba(8, 12, 47, 0.65)"
    },
    CardBook_right_BookInfo: {
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.02,
        color: "rgba(125, 139, 183, 1)"
    },
    CardBook_right_button: {
        backgroundColor: '#F7F8F8',
        borderRadius: 10,
        height: 30,
        paddingHorizontal: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    CardBook_right_buttonText: {
        height: 40,
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 35, // Bu o'rniga ma'lumotli qiymat qo'yish kerak
        letterSpacing: 0.02,
        textAlign: 'left',
        color: "#222E54"
    },
    // Modal styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    input: {
        height: 40,
        width: 200,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: "black"
    },
    modalButton: {
        backgroundColor: '#F7F8F8',
        borderRadius: 10,
        height: 30,
        paddingHorizontal: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 10
    },
    modalButtonText: {
        height: 40,
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 35,
        letterSpacing: 0.02,
        textAlign: 'left',
        color: "#222E54"
    },
    modalInfo: {
        marginTop: 10,
        width: '100%',
        alignItems: 'flex-start',
    },
    modalInfoText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#222E54',
    }
    // Modal styles
});

export default CardBook;
