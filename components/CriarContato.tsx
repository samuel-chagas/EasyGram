import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import { enviroment } from '../env/enviroment';
import { ModalProps } from '../types/modal-props'; // Ajuste o caminho conforme necessário

export default function CriarContato({ onClose, onSuccess }: ModalProps) {  
  const [nome, setNome] = useState('');
  const [numero, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [grupoId, setGrupo] = useState(null);
  const [open, setOpen] = useState(false); // controla abertura  
  const [items, setItems] = useState<{ label: string; value: string | number }[]>([]);

  const salvarContato = async () => {
    console.log("[salvarContato]", nome, numero, email, grupoId);
    
    try {
      await axios.post(enviroment.API_URL + '/contatos', { nome, numero, email, grupoId });    
      onSuccess();
    } catch (err) {
      console.error("Erro ao criar contato", err);       
    }
  };

  
  useEffect(() => {    
    const listarGrupos = async () => {
      try {
        const response = await axios.get<any[]>(`${enviroment.API_URL}/grupos`);    

        const gruposFormatados: any = response.data.map((grupo) => ({
          label: grupo.nome, // ou outro campo legível
          value: grupo.id,   // o campo que será armazenado em `grupo`
        }));
        setItems(gruposFormatados);
      } catch (err) {
        console.error("Erro ao carregar grupos", err);        
      }    
    }

    listarGrupos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="users" size={28} color="#fff" style={styles.icon} />
      </View>

      <Text style={styles.titulo}>Novo contato</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Telefone" value={numero} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
      {/* TROCAR POR UM SELECT de grupos */}
      {/* <TextInput style={styles.input} placeholder="Grupo" value={grupo} onChangeText={setGrupos} /> */}
      <DropDownPicker
        open={open}
        value={grupoId}
        items={items}
        setOpen={setOpen}
        setValue={setGrupo}
        setItems={setItems}
        placeholder="Selecione um grupo"
        style={styles.input}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <TouchableOpacity style={styles.cancelar} onPress={onClose}>
        <Text style={styles.cancelarTexto}>Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.salvar} onPress={salvarContato}>
        <Text style={styles.salvarTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 25,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4
  },
  iconContainer: {
    backgroundColor: '#00C897',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  icon: {
    fontSize: 30,
    color: '#fff'
  },
  titulo: {
    fontSize: 22,
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#F8F8F8'
  },
  cancelar: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  cancelarTexto: {
    color: '#333',
    fontSize: 16
  },
  salvar: {
    width: '100%',
    backgroundColor: '#00C897',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  salvarTexto: {
    color: '#fff',
    fontSize: 16
  },
  dropdown: {
    borderColor: '#ccc',
    height: 50,    
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
});
