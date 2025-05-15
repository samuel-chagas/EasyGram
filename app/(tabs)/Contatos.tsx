import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CriarContato from '../../components/CriarContato';
import Footer from '../../components/Footer';
import { enviroment } from '../../env/enviroment';

// Definição do tipo Contato
interface Contato {
  id: string; // Substitua por campos reais do seu backend
  nome: string;
  numero: string;
}

const ContatosScreen: React.FC = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const carregarContatos = async () => {
    try {
      const response = await axios.get<Contato[]>(enviroment.API_URL + '/contatos');
      setContatos(response.data);
    } catch (err) {
      console.error('Erro ao carregar contatos:', err);
    }
  };

  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contatos</Text>
        {/* <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        /> */}
        <TouchableOpacity style={styles.avatar} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={16} color="#fff" />          
        </TouchableOpacity>

      </View>

      {contatos.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={50} color="#B0BEC5" />
          <Text style={styles.emptyText}>
            Você ainda não possui nenhum contato cadastrado! Que tal começar cadastrando um?
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Novo contato</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={contatos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contactCard}>
              <View style={styles.contactRow}>
                {/* Avatar */}
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatar}>
                    <Text style={styles.contactInitialName}>{item.nome.charAt(0)}</Text>
                    
                  </View>
                  <View style={styles.statusIndicator}></View>
                </View>

                {/* Nome e Telefone */}
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{item.nome}</Text>
                  <Text style={styles.contactPhone}>{item.numero}</Text>                  
                </View>

                {/* Ícone de ações */}
                <TouchableOpacity style={styles.actions}>
                  <Text style={styles.dots}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <CriarContato
          onClose={() => setModalVisible(false)}
          onSuccess={() => {
            setModalVisible(false);
            carregarContatos();
          }}
        />
      </Modal>
       {/* Renderizando o Footer */}
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
    display: 'flex',    
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    backgroundColor: '#0d7875',
    width: 40,
    height: 40,
    borderRadius: 32,      
    alignItems: 'center',
    justifyContent: 'center'
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
  contactContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBFCF3',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 24,
    borderBottomColor: '#E3E8EF',
    borderBottomWidth: 1,
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5CECDD',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    bottom: 4,
    right: 4,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contactInitialName: {
    color: '#fff'
  },
  contactName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#001D22',
  },
  contactPhone: {
    fontSize: 16,
    color: '#97A3B6',
  },
  actions: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    fontSize: 18,
    color: '#060606',
  },
});

// const styles = StyleSheet.create({
//   contactCard: {
//     backgroundColor: '#FFFFFF',
//     borderColor: '#CBFCF3',
//     borderWidth: 1,
//     borderRadius: 16,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     gap: 24,
//     borderBottomColor: '#E3E8EF',
//     borderBottomWidth: 1,
//   },
//   avatarWrapper: {
//     width: 64,
//     height: 64,
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: '#0d7875',
//   },
//   statusIndicator: {
//     position: 'absolute',
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#5CECDD',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//     bottom: 4,
//     right: 4,
//   },
//   contactInfo: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   contactName: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: '#001D22',
//   },
//   contactPhone: {
//     fontSize: 16,
//     color: '#97A3B6',
//   },
//   actions: {
//     width: 38,
//     height: 38,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dots: {
//     fontSize: 18,
//     color: '#060606',
//   },
// });


export default ContatosScreen;