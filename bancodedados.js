import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "USERS";
const LOGGED_USER_KEY = "LOGGED_USER";

// 🔹 Salvar usuário cadastrado
export async function saveUser(email, senha) {
  const users = await getUsers();

  const exists = users.find((user) => user.email === email);
  if (exists) {
    throw new Error("Este email já está cadastrado");
  }

  users.push({ email, senha });
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Já loga o usuário após cadastrar
  await AsyncStorage.setItem(LOGGED_USER_KEY, JSON.stringify({ email }));
}

// 🔹 Pegar todos os usuários
export async function getUsers() {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// 🔹 Validar usuário no login
export async function validateUser(email, senha) {
  const users = await getUsers();
  const user = users.find((user) => user.email === email && user.senha === senha);

  if (user) {
    // Se encontrou, salva no "usuário logado"
    await AsyncStorage.setItem(LOGGED_USER_KEY, JSON.stringify({ email }));
  }

  return user;
}

// 🔹 Pegar usuário logado
export async function getLoggedUser() {
  const data = await AsyncStorage.getItem(LOGGED_USER_KEY);
  return data ? JSON.parse(data) : null;
}

// 🔹 Deslogar usuário
export async function logout() {
  await AsyncStorage.removeItem(LOGGED_USER_KEY);
}
