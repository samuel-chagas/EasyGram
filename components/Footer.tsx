import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando ícones

const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/Login')}>
        <Icon name="home" size={24} color="#0D7875" /> {/* Ícone de Home */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/Contatos')}>
        <Icon name="person" size={24} color="#0D7875" /> {/* Ícone de Perfil */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)/Grupos')}>
        <Icon name="group" size={24} color="#0D7875" /> {/* Ícone de Perfil */}
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Fixar no final da tela
    bottom: 0, // Alinhar ao fundo
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
});