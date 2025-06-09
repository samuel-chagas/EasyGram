import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { enviroment } from '../env/enviroment';

interface CriarGrupoProps {
  onClose: () => void; // igual ao CriarContato
  onSuccess: () => void;
}

const CORES = ['#00C897', '#FF6F61', '#FFD600', '#1976D2', '#8E24AA', '#43A047', '#F4511E'];

const CriarGrupo: React.FC<CriarGrupoProps> = ({ onClose, onSuccess }) => {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState(CORES[0]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: cor }]}>
        <MaterialIcons name="bookmark" size={36} color="#fff" />
      </View>
      <Text style={styles.title}>Novo grupo</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="bookmark-border" size={24} color="#90A4AE" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nome do grupo"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#90A4AE"
        />
      </View>
      <Text style={{ color: '#333', marginBottom: 8, alignSelf: 'flex-start' }}>Escolha a cor do grupo:</Text>
      <View style={styles.colorOptionsContainer}>
        {CORES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorOption,
              { backgroundColor: c, borderWidth: cor === c ? 3 : 1, borderColor: cor === c ? '#333' : '#ccc' },
            ]}
            onPress={() => setCor(c)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.salvar}
        onPress={criarGrupo}
      >
        <Text style={styles.salvarTexto}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelar}
        onPress={onClose}
      >
        <Text style={styles.cancelarTexto}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 25,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    elevation: 4,
  },
  iconCircle: {
    backgroundColor: '#00C897',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    marginBottom: 20,
    width: '100%',
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#263238',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 32,
    gap: 12,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  cancelar: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#E8E8E8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelarTexto: {
    color: '#333',
    fontSize: 16,
  },
  salvar: {
    width: '100%',
    backgroundColor: '#00C897',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  salvarTexto: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CriarGrupo;