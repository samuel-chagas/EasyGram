import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

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