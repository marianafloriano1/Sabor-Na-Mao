import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { logout } from '../bancodedados';

import {
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

type RootStackParamList = {
  heranca: undefined;
  login: undefined;
  ceia_natal: undefined;
  pascoa: undefined;
  festa_junina: undefined;
  halloween: undefined;
  ano_novo: undefined;
  festa: undefined;
  bebidas: undefined;
  kids: undefined;
  dietas: undefined;
  restricoes: undefined;
  noite_garotas: undefined;
  morando_sozinho: undefined;
  almoco_domingo: undefined;
  vegano: undefined;
  vegetariano: undefined;
  aniversario: undefined;
  snack: undefined;
  aperitivos: undefined;
  economica: undefined;
  home: undefined;
  soboro: undefined;
};

export default function App() {
  const nav = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState<
    "tudo" | "soboro" | "economica"
  >("tudo");

  const [fontsLoaded] = useFonts({
    Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
    Julius: require("../assets/fonts/JuliusSansOne-Regular.ttf"),
    Chewy: require("../assets/fonts/Chewy-Regular.ttf"),
  });

  const names = [
    "Mister Panela",
    "Mestre Cuca",
    "Chef de Plantão",
    "Mastre do Tempero",
    "Panela Quente",
    "Sabor Divino",
  ];
  const profilePics = [
    require("../assets/images/perfil1.png"),
    require("../assets/images/perfil2.png"),
    require("../assets/images/perfil3.png"),
    require("../assets/images/perfil4.png"),
    require("../assets/images/perfil5.png"),
    require("../assets/images/perfil6.png"),
  ];

  const getRandomProfile = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomPic =
      profilePics[Math.floor(Math.random() * profilePics.length)];
    return { name: randomName, pic: randomPic };
  };

  const [userProfile, setUserProfile] = useState(getRandomProfile());

  const [toolTipVisible, setToolTipVisible] = useState(false);

  const items = [
    {
      title: "Natal",
      image: require("../assets/images/natal.png"),
      route: "natal",
    },
    {
      title: "Páscoa",
      image: require("../assets/images/pascoa.png"),
      route: "pascoa",
    },
    {
      title: "Arraiá",
      image: require("../assets/images/junina.png"),
      route: "arraia",
    },
    {
      title: "Halloween",
      image: require("../assets/images/hallowen.png"),
      route: "hallow",
    },
    {
      title: "Ano Novo",
      image: require("../assets/images/anonovo.png"),
      route: "ano_novo",
    },
    {
      title: "Festas",
      image: require("../assets/images/festas.png"),
      route: "niver",
    },
  ];
  const shadowColors = [
    "#852221",
    "#6750A4",
    "#633B48",
    "#229E0C",
    "#00127A",
    "#B02652",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!fontsLoaded) return null;

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeNavigate = (navigateFunc: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      navigateFunc();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const [creditsVisible, setCreditsVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.fundo}>
            <Tooltip
              isVisible={toolTipVisible}
              content={
                <View style={styles.tooltipContainer}>
                   <TouchableOpacity
                    style={styles.infoButton}
                    onPress={() => setCreditsVisible(true)}
                  >
                    <Feather name="info" size={22} color="#333" />
                  </TouchableOpacity>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={creditsVisible}
                    onRequestClose={() => setCreditsVisible(false)}
                  >
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Créditos</Text>
                        <Text style={styles.modalText}>
                          Ícones e recursos visuais utilizados neste aplicativo foram obtidos em{" "}
                          <Text style={{ fontWeight: "bold" }}>Freepik</Text>.
                          {"\n"}Mais em: www.freepik.com
                        </Text>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => setCreditsVisible(false)}
                        >
                          <Text style={styles.closeText}>Fechar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                  <View style={styles.userInfo}>
                    <View style={styles.userIcon}>
                      <Image
                        source={userProfile.pic}
                        style={styles.userIconImage}
                      />
                    </View>
                    <Text style={styles.userName}>{userProfile.name}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.recipesButton}
                    onPress={() => {
                      nav.navigate("heranca");
                    }}
                  >
                    <Text style={styles.recipesText}>Minhas receitas</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                      try {
                        await logout(); // limpa o usuário logado
                        router.replace("/"); // navega para a tela de login
                      } catch (error) {
                        console.log("Erro ao sair:", error);
                      }
                    }}
                  >
                    <Text style={styles.logoutText}>Sair</Text>
                  </TouchableOpacity>
                 

                </View>
              }
              placement="bottom"
              onClose={() => setToolTipVisible(false)}
              contentStyle={styles.tooltip}
              backgroundColor="transparent"
              showChildInTooltip={false}
              arrowStyle={{
                borderTopWidth: 0,
              }}
            >
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => setToolTipVisible(true)}
              >
                <Image
                  source={require("../assets/images/perfil.png")}
                  style={styles.perfil}
                />
              </TouchableOpacity>
            </Tooltip>

            <View style={styles.categorias2}>
              <TouchableOpacity
                style={[
                  styles.categoria21,
                  selectedCategory === "tudo" && { backgroundColor: "#385A64" }, // cor do "tudo"
                  selectedCategory !== "tudo" && { backgroundColor: "#D3D3D3" }, // cinza claro
                ]}
                onPress={() => {
                  setSelectedCategory("tudo");
                  fadeNavigate(() => nav.navigate("home"));
                }}
              >
                <Text style={styles.texto22}>Tudo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.categoria2,
                  selectedCategory === "soboro" && { backgroundColor: "#385A64" },
                  selectedCategory !== "soboro" && { backgroundColor: "#D3D3D3" },
                ]}
                onPress={() => {
                  setSelectedCategory("soboro");
                  fadeNavigate(() => nav.navigate("soboro"));
                }}
              >
                <Text style={styles.texto2}>Soboro</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.categoria22,
                  selectedCategory === "economica" && {
                    backgroundColor: "#385A64",
                  },
                  selectedCategory !== "economica" && {
                    backgroundColor: "#D3D3D3",
                  },
                ]}
                onPress={() => {
                  setSelectedCategory("economica");
                  fadeNavigate(() => nav.navigate("economica"));
                }}
              >
                <Text style={styles.texto2}>Econômica</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={require("../assets/images/home2.png")}
              style={styles.img_home}
            ></Image>

            <View style={styles.buttonRow}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ height: 140 }}
              >
                {items
                  .slice(currentIndex, currentIndex + 6)
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        nav.navigate(item.route as keyof RootStackParamList);
                      }}
                      style={[
                        styles.carouselItem,
                        {
                          shadowColor: shadowColors[index % shadowColors.length],
                          shadowOffset: { width: 0, height: 12 }, // mais deslocada pra baixo
                          shadowOpacity: 4,                     // mais forte
                          shadowRadius: 16,                       // mais espalhada
                          elevation: 20,                          // Android mais intenso

                        },
                      ]}
                    >
                      <Image style={styles.buttonImage} source={item.image} />
                      <Text style={styles.texto}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            <Text style={styles.texto_filtro}>Filtros:</Text>
            <View style={styles.categorias}>
              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("bebidas");
                }}
              >
                <Text style={styles.texto1}>Bebidas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("kids");
                }}
              >
                <Text style={styles.texto1}>Kids</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("dietas");
                }}
              >
                <Text style={styles.texto1}>Dietas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("restricoes");
                }}
              >
                <Text style={styles.texto1}>Restrições</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.textoo}>Clique e conheça nossas receitas:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
              marginLeft: -5,
              padding: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginBottom: 10,
                  shadowColor: "#1D192B",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.8,
                  shadowRadius: 0.3,
                  elevation: 26,
                }}
                onPress={() => nav.navigate("snack")}
              >
                <Text style={styles.texto_snack}>Noite de {"\n"}Snacks</Text>
                <Image
                  style={styles.img_snacks}
                  source={require("../assets/images/snacks.jpg")}
                />
              </Pressable>
            </View>

            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginBottom: 10,
                  shadowColor: "#14AE5C",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.8,
                  shadowRadius: 0.3,
                  elevation: 26,
                }}
                onPress={() => nav.navigate("morando_sozinho")}
              >
                <Text style={styles.texto_sozinho}>Para comer sozinho</Text>
                <Image
                  style={styles.img_sozinho}
                  source={require("../assets/images/morando_sozinho.png")}
                />
              </Pressable>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginLeft: -5,
              padding: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  shadowColor: "#003856",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.8,
                  shadowRadius: 0.3,
                  elevation: 26,
                  bottom: 16,
                }}
                onPress={() => nav.navigate("aperitivos")}
              >
                <Text style={styles.texto_aperitivos}>
                  Aperitivos para festas
                </Text>
                <Image
                  style={styles.img_aperitivos}
                  source={require("../assets/images/aperitivos.jpg")}
                />
              </Pressable>
            </View>

            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "white",
                  borderRadius: 10,
                  shadowColor: "#B3261E",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.8,
                  shadowRadius: 0.3,
                  elevation: 26,
                  bottom: 16,
                }}
                onPress={() => nav.navigate("almoco_domingo")}
              >
                <Text style={styles.texto_almoco}>Almoços em família</Text>
                <Image
                  style={styles.img_almoco}
                  source={require("../assets/images/almoco_domingo.png")}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ececec",
  },
  fundo: {
    padding: 25,
  },

  row: {
    justifyContent: "center",
    alignItems: "center",
  },

  img_home: {
    width: 370,
    height: 175,
    right: 10,
    bottom: -3,
  },

  quadrado_fundo: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 190,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    top: -100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
  },

  perfil: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: "auto",
    right: 5,
    top: 30,
    zIndex: 999,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
    marginTop: 40,
  },

  carouselItem: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 10,
    padding: 5,
    alignItems: "center",
    width: 100,
    height: 100,
  },
  buttonImage: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 7,
  },

  texto: {
    textAlign: "center",
    marginTop: 3,
    fontSize: 16,
    fontFamily: "Imprima",
  },

  categorias: {
    flexDirection: "row", // Organiza os itens em linha
    flexWrap: "wrap", // Permite que os itens quebrem linha
    justifyContent: "space-between", // Distribui os itens em duas colunas
    margin: 5,
    top: 20,
  },

  categoria: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "48%", // Cada item ocupa metade da linha (2 colunas)
    height: 55,
    shadowColor: "#565656",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  textoo: {
    fontSize: 17,
    marginLeft: 35,
    color: "#000",
    top: 10,
    fontFamily: "Imprima",
  },
  texto_filtro: {
    fontSize: 18,
    marginTop: 15,
    color: "#000",
    bottom: -10,
    fontFamily: "Imprima",
    left: 12,
  },
  texto1: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Julius",
    textTransform: "uppercase",
  },

  //tooltip

  tooltip: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    width: 280,
    position: "absolute",
    left: 30,
    shadowColor: "#565656",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
    height: 180,
    top: 30,
  },

  tooltipContainer: {
    borderRadius: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  userIconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userName: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Imprima",
  },
  recipesButton: {
    marginTop: 10,
    paddingVertical: 11,
    paddingHorizontal: 40,
    backgroundColor: "#F8D12D",
    borderRadius: 9,
    width: 190,
    height: 40,
  },

  recipesText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Imprima",
  },
  logoutButton: {
    marginTop: 18,
    paddingVertical: 6,
    paddingHorizontal: 21,
    backgroundColor: "rgba(179, 38, 30, 0.5)",
    borderRadius: 9,
    width: 70,
    height: 30,
    left: 175,
  },
  logoutText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Imprima",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },

  texto2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },

  categoria2: {
    backgroundColor: "#cacaca",
    borderRadius: 25,
    width: 80,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    margin: 5,
  },

  categoria22: {
    backgroundColor: "#cacaca",
    borderRadius: 25,
    width: 110,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    margin: 5,
  },

  categorias2: {
    flexDirection: "row", // Organiza os itens em linha
    top: -10,
    left: 5,
    width: 90,
  },

  texto22: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },
  categoria21: {
    backgroundColor: "#385A64",
    borderRadius: 25,
    width: 65,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    margin: 5,
    fontFamily: "monospace",
  },

  texto_sozinho: {
    color: "#6CC696",
    fontSize: 24,
    left: 10,
    top: 10,
    fontFamily: "Chewy",
  },
  texto_aperitivos: {
    color: "#003856",
    fontSize: 24,
    left: 10,
    width: 140,
    top: 10,
    fontFamily: "Chewy",
  },
  texto_snack: {
    color: "#868585",
    fontSize: 24,
    left: 10,
    top: 10,
    fontFamily: "Chewy",
  },
  texto_almoco: {
    color: "#CA7671",
    fontSize: 24,
    left: 10,
    top: 10,
    fontFamily: "Chewy",
  },
  img_sozinho: {
    width: 80,
    height: 120,
    left: 70,
    bottom: 23,
  },
  img_snacks: {
    width: 147,
    height: 70,
    left: 2,
    top: 18,
    borderRadius: 10,
  },
  img_almoco: {
    width: 147,
    height: 80,
    left: 2,
    top: 7,
    borderRadius: 10,
  },
  img_aperitivos: {
    width: 147,
    height: 70,
    left: 2,
    top: 18,
    borderRadius: 10,
  },
  infoButton: {
    position: "absolute",
    right: -10, 
    top: -10,
    padding: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,

  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Imprima"
  },
  modalText: {
    fontSize: 17,
    marginBottom: 20,
    fontFamily: "Imprima"
  },
  closeButton: {
    backgroundColor: "rgba(179, 38, 30, 0.5)",
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
    width: 70,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Imprima",
    fontSize: 16
  },

});
