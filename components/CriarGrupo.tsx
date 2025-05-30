import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { enviroment } from '../env/enviroment';

interface CriarGrupoProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CriarGrupo: React.FC<CriarGrupoProps> = ({ onClose, onSuccess }) => {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('#00897B');

  const criarGrupo = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome do grupo é obrigatório.');
      return;
    }
    try {
      await axios.post(enviroment.API_URL + '/grupos', {
        nome,
        cor,
        dataCriacao: new Date().toISOString(),
      });
      onSuccess();
      onClose();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar o grupo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar novo grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do grupo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Cor (hexadecimal)"
        value={cor}
        onChangeText={setCor}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={criarGrupo}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#B0BEC5',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#00897B',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CriarGrupo;