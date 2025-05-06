import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditarContato from '../../components/EditarContato';

export default function App() {
  const handleClose = () => {
    console.log('Fechar botão pressionado');
  };

  return (
    <View style={styles.container}>
      <EditarContato onClose={handleClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});