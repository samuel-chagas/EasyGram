import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { enviroment } from '../../env/enviroment';

import Footer from '../../components/Footer';
// import CriarGrupo from '../../components/CriarGrupo'; // Crie este componente se desejar modal para criar grupo

import { Grupos } from '../../interfaces/grupos';

const GruposScreen: React.FC = () => {
  const [grupos, setGrupos] = useState<Grupos[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const carregarGrupos = async () => {
    try {
      const response = await axios.get<Grupos[]>(enviroment.API_URL + '/grupos');
      setGrupos(response.data);
    } catch (err) {
      console.error('Erro ao carregar grupos:', err);
    }
  };

  useEffect(() => {
    carregarGrupos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grupos</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
      </View>

      {grupos.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="people-circle-outline" size={50} color="#B0BEC5" />
          <Text style={styles.emptyText}>
            Você ainda não faz parte de nenhum grupo! Que tal criar um?
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Novo grupo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={grupos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.groupContainer, { borderLeftColor: item.cor || '#00897B' }]}>
              <Text style={styles.groupText}>{item.nome}</Text>
              <Text style={styles.groupDate}>
                Criado em: {new Date(item.dataCriacao).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
      {/* <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <CriarGrupo
          onClose={() => setModalVisible(false)}
          onSuccess={carregarGrupos}
        />
      </Modal> */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#607D8B',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#00897B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  groupContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  groupDate: {
    fontSize: 12,
    color: '#607D8B',
    marginTop: 4,
  },
});

export default GruposScreen;