import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { enviroment } from '../../env/enviroment';

import CriarGrupo from '../../components/CriarGrupo';
import Footer from '../../components/Footer';

import { Grupos } from '../../interfaces/grupos';

const GruposScreen: React.FC = () => {
  const [grupos, setGrupos] = useState<Grupos[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const carregarGrupos = async () => {
    try {
      const response = await axios.get<Grupos[]>(enviroment.API_URL + '/grupos');
      const gruposOrdenados = response.data.sort(
        (a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
      );
      setGrupos(gruposOrdenados);
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
        <TouchableOpacity style={styles.headerButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={32} color="#00897B"/>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
      </View>

      {grupos.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="people-circle-outline" size={50} color="#B0BEC5"/>
          <Text style={styles.emptyText}>
            Você ainda não faz parte de nenhum grupo! Que tal criar um?
          </Text>
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
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <CriarGrupo
            onClose={() => setModalVisible(false)}
            onSuccess={carregarGrupos}
          />
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  headerButton: {
    marginRight: 12,
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