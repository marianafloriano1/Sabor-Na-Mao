import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { validateUser } from '../bancodedados';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
    Julius: require("../assets/fonts/JuliusSansOne-Regular.ttf"),
    Chewy: require("../assets/fonts/Chewy-Regular.ttf"),
  });

  useEffect(() => {
    const checkLoggedUser = async () => {
      const savedUser = await AsyncStorage.getItem('LOGGED_USER');
      if (savedUser) {
        router.replace('/home'); 
      }
    };
    checkLoggedUser();
  }, []);

  const handleLogin = async () => {
  const user = await validateUser(email, senha);
  if (user) {
    await AsyncStorage.setItem('LOGGED_USER', JSON.stringify(user));
    router.replace('/home');
  } else {
    Alert.alert('Erro', 'Email ou senha inválidos');
  }
};
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 45 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.textoTopo}>Sabor Na Mão</Text>
        <Image source={require('../assets/images/login.png')} style={styles.imagem} />

        <View style={styles.card}>
          <Text style={styles.titulo}>Faça o Login</Text>

          <TouchableOpacity onPress={() => router.push('/cadastro')}>
            <Text style={styles.subtitulo}>
              Não tem uma conta? <Text style={styles.linkCadastro}>Cadastre-se!</Text>
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    top: 30,
  },
  textoTopo: {
    color: '#F8D12D',
    fontSize: 46,
    marginTop: 40,
    fontFamily: "Chewy",
  },
  imagem: {
    width: 340,
    height: 340,
    marginTop: 20,
    marginRight: 100,
  },
  card: {
    backgroundColor: '#ececec',
    width: '100%',
    borderTopRightRadius: 80,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: -50,
    height: '60%',
  },
  titulo: {
    fontSize: 22,
    color: '#565656',
    marginBottom: 10,
    fontFamily: "Imprima",
  },
  subtitulo: {
    fontSize: 18,
    color: '#565656',
    marginBottom: 20,
    marginTop: 10,
    fontFamily: "Imprima",
  },
  linkCadastro: {
    color: '#839deb',
    fontFamily: "Imprima",
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1.5,
    borderColor: 'rgba(108, 198, 150, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#565656',
    marginBottom: 16,
    marginTop: 20,
    fontFamily: "Imprima",
  },
  botao: {
    backgroundColor: 'rgba(108, 198, 150, 0.7)',
    borderRadius: 9,
    height: 45,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#565656',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    elevation: 20,
    top: 40,
    left: 100,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 17,
    fontFamily: "Imprima",
  },
});
