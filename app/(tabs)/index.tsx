import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (userToken) {
                    router.replace('/Contatos');
                } else {
                    router.replace('/Login'); 
                }
            } catch (error) {
                console.error('Erro ao verificar login:', error);
            }
        };

        checkUserLoggedIn();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Carregando...</Text>
        </View>
    );
};

export default Index;