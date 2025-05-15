import api from '@/api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Footer from '../../components/Footer';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        senha: senha,      
      });
      console.log("[handleLogin]", response);
      
      if (response.data) {        
        router.push('../../(tabs)/Contatos'); // Redirecionando para a rota correta
      } 
    } catch (error) {
      console.error('Erro na requisição de login:', error);      
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')} 
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.instruction}>
        Preencha os campos abaixo para acessar sua conta.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Text style={styles.showPasswordText}>
              {mostrarSenha ? '🔓' : '🔒'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => router.push('/(tabs)/RecuperaSenha')}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => router.push('/(tabs)/CriarConta')}
        >
          <Text style={styles.createAccountText}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
        >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Renderizando o Footer */}
      <Footer />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 120, 
    height: 120,
    resizeMode: 'contain',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
    color: '#333',
    textAlign: 'center',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginTop: 24,
  },
  input: {
    backgroundColor: '#F5F5F5',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#333',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40, 
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 12, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  showPasswordText: {
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  forgotPasswordButton: {
    flex: 1,
    alignItems: 'flex-start',
  },
  forgotPasswordText: {
    color: '#0095f6',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  createAccountButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  createAccountText: {
    color: '#0095f6',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: 32,
    backgroundColor: '#0D7875',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});