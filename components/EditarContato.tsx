import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import { enviroment } from '../env/enviroment';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  grupo: string;
}

interface EditarContatoProps {
  contato: Contato; // Adicionar a prop 'contato'
  onClose: () => void;
  onSuccess: () => void; // Adicionar a prop 'onSuccess'
}

// Atualizar as props desestruturadas
export default function EditarContato({ contato: initialContato, onClose, onSuccess }: EditarContatoProps) {
  // const navigation = useNavigation(); // Removido
  // Inicializar o estado 'contato' com a prop 'initialContato' recebida
  const [contato, setContato] = useState<Contato>(initialContato);

  // Remover o useEffect, pois o contato agora é passado via props
  /*
  useEffect(() => {
    const fetchContato = async () => {
      try {
        const res = await axios.get<Contato>(`${enviroment.API_URL}/contatos/${contato.id}`);
        setContato(res.data);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar o contato');
      }
    };

    fetchContato();
  }, [contato.id]);
  */

  const atualizarContato = async () => {
    if (!contato.nome || !contato.telefone || !contato.email || !contato.grupo) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
      return;
    }

    try {
      await axios.put(`${enviroment.API_URL}/contatos/${contato.id}`, contato);
      Alert.alert('Sucesso', 'Contato atualizado!');
      onSuccess(); // Chamar a função onSuccess passada como prop
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar o contato');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="edit-3" size={28} color="#fff" style={styles.icon} />
      </View>
      <Text style={styles.titulo}>Editar contato</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={contato.nome}
        onChangeText={(text) => setContato({ ...contato, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={contato.telefone}
        onChangeText={(text) => setContato({ ...contato, telefone: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={contato.email}
        onChangeText={(text) => setContato({ ...contato, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Grupo"
        value={contato.grupo}
        onChangeText={(text) => setContato({ ...contato, grupo: text })}
      />

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.btnCancelar} onPress={onClose}>
          <Text style={styles.textCancelar}>Fechar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSalvar} onPress={atualizarContato}>
          <Text style={styles.textSalvar}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D7875',
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 24,
    alignSelf: 'center',
  },
  icon: {
    textAlign: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    color: '#333333',
  },
  botoes: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnCancelar: {
    backgroundColor: '#E57373',
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  textCancelar: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  btnSalvar: {
    backgroundColor: '#0D7875',
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  textSalvar: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});