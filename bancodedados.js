import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS';

// Salvar usuário cadastrado
export async function saveUser(email, senha) {
  const users = await getUsers();
  const exists = users.find(user => user.email === email);

  if (exists) {
    throw new Error('Este email já está cadastrado');
  }

  users.push({ email, senha });
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Pegar todos os usuários
export async function getUsers() {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// Validar usuário no login
export async function validateUser(email, senha) {
  const users = await getUsers();
  return users.find(user => user.email === email && user.senha === senha);
}
