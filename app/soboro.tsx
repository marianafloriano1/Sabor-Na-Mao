import { Feather } from "@expo/vector-icons";
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Image,
  Linking,
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
  soboroArroz: undefined;
  soboroMacarao: undefined;
  soboroCarne: undefined;
  soboroLegu: undefined;
  soboroChoco: undefined;
  soboroBebi: undefined;
  soboroFruta: undefined;
  soboroAir: undefined;
};

export default function App() {
  const route = useRoute();
  const nav = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedCategory, setSelectedCategory] = useState("tudo");
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (route.name === "home") {
        setSelectedCategory("tudo");
      } else if (route.name === "soboro") {
        setSelectedCategory("soboro");
      } else if (route.name === "economica") {
        setSelectedCategory("economica");
      }
    }, [route.name])
  );

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
        <ScrollView>
          <View style={styles.fundo}>
            <Tooltip
              isVisible={toolTipVisible}
              content={
                <View style={styles.tooltipContainer}>
                  <TouchableOpacity
                    style={styles.infoButton}
                    onPress={() => setCreditsVisible(true)}
                  >
                    <Text style={{ fontSize: 22 }} >©</Text>
                  </TouchableOpacity>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={creditsVisible}
                    onRequestClose={() => setCreditsVisible(false)}
                  >
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContent2}>
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
                    onPress={() => router.replace("/")}
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
              allowChildInteraction={true}
              arrowSize={{ width: 0, height: 0 }} // seta invisível
              displayInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}

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
              source={require("../assets/images/imgCarrosel.png")}
              style={styles.img_home}
            ></Image>

            <Text style={styles.texto_filtro}>O que mais sobrou?</Text>
            <View style={styles.categorias}>
              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("soboroArroz");
                }}
              >
                <Text style={styles.texto1}>ARROZ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("soboroMacarao");
                }}
              >
                <Text style={styles.texto1}>Macarrão</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("soboroCarne");
                }}
              >
                <Text style={styles.texto1}>Carne</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("soboroLegu");
                }}
              >
                <Text style={styles.texto1}>Legumes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("soboroChoco");
                }}
              >
                <Text style={styles.texto1}>Chocolate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoria}
                onPress={() => {
                  nav.navigate("soboroBebi");
                }}
              >
                <Text style={styles.texto1}>Bebida</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.textoo}>Clique e conheça outras opções:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
              marginLeft: -5,
              padding: 20
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  width: 160,
                  height: 160,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginBottom: 10,
                  shadowColor: "#1D192B",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.8,
                  shadowRadius: 0.3,
                  elevation: 26,

                }}
                onPress={() => nav.navigate("soboroFruta")}
              >
                <Text style={styles.texto_fruta}>Receitas com Frutas</Text>
                <Image
                  style={styles.img_fruta}
                  source={require("../assets/images/melancia.jpg")}
                />
              </Pressable>
            </View>

            <View style={{ alignItems: "center" }}>
              <Pressable
                style={{
                  width: 160,
                  height: 160,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginBottom: 10,
                  shadowColor: "#7F7F7F",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.8,
                  shadowRadius: 0.3,
                  elevation: 26,

                }}
                onPress={() => nav.navigate("soboroAir")}
              >
                <Text style={styles.texto_sozinho}>Receitas para Airfryer</Text>
                <Image
                  style={styles.img_sozinho}
                  source={require("../assets/images/airfryer.jpg")}
                />
              </Pressable>
            </View>
          </View>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(true)

            }
          >
            <Text style={styles.toggleText}>Estragou, e agora? </Text>
          </TouchableOpacity>

          {/* Modal */}
          <Modal transparent visible={modalVisible} animationType="fade">
            <View style={styles.modalContainer}>

              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.fecharModal}>
                  <Feather name="x" size={28} color="red" />
                </TouchableOpacity>
                <Text style={styles.modalTitulo}>
                  O Que Fazer com Comida Estragada?
                </Text>
                <Text style={styles.modalTexto}>
                  Todo mundo já jogou fora alguma comida estragada, né? Mas você
                  sabia que isso pode prejudicar o meio ambiente? Quando vai pro
                  lixo comum, esses restos ajudam a formar mais lixo nos aterros e
                  ainda liberam gases que poluem o ar. {"\n\n"}A boa notícia é que
                  dá pra reaproveitar! Restos de frutas, legumes e até alimentos
                  passados podem virar adubo por meio da compostagem. Isso vira
                  uma terra rica, perfeita pra plantar! Dá até pra usar sementes
                  de frutas como limão ou abacate e começar sua própria horta em
                  casa. Além de ajudar a natureza, você ainda economiza e aprende
                  a cuidar melhor do que come. Que tal começar hoje?{"\n\n"}
                  Acesse um manual completo sobre compostagem aqui:{" "}
                  <Text
                    style={{
                      color: "blue",
                      borderBottomColor: "blue",
                      borderBottomWidth: 1, // ajuste aqui para deixar mais fino
                    }}
                    onPress={() =>
                      Linking.openURL(
                        "https://semil.sp.gov.br/educacaoambiental/prateleira-ambiental/manual-de-compostagem/"
                      )
                    }
                  >
                    Manual de Compostagem
                  </Text>



                </Text>

              </View>
            </View>
          </Modal>
        </ScrollView>

      </Animated.View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ececec",
  },
  fundo: {
    padding: 20,
  },

  row: {
    justifyContent: "center",
    alignItems: "center",
  },

  img_home: {
    width: 390,
    height: 190,
    right: 10,
    bottom: -3
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
    left: 5,
    top: 30,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
    marginTop: 30,
  },

  carouselItem: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: "center",
    width: 100,
    height: 130,
  },
  buttonImage: {
    width: 90,
    height: 90,
    marginBottom: 5,
    backgroundColor: "white",
    borderRadius: 7,
  },

  texto: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 13,
    fontFamily: "monospace",
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
    fontSize: 18,
    marginTop: 10,
    color: "#000",
    bottom: -10,
    fontFamily: "Imprima",
    left: 35,

  },
  texto_filtro: {
    fontSize: 18,
    marginTop: 15,
    color: "#000",
    bottom: -10,
    fontFamily: "Imprima",
    left: 12
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
    top: 30
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
    fontFamily: "Imprima"
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
    width: 90
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
    color: "#868585",
    fontSize: 24,
    left: 10,
    top: 10,
    fontFamily: "Chewy"

  },
  texto_fruta: {
    color: "#5714AE",
    fontSize: 24,
    left: 10,
    top: 10,
    fontFamily: "Chewy"

  },
  img_sozinho: {
    width: 60,
    height: 80,
    left: 80,
    top: 10,
  },
  img_fruta: {
    width: 70,
    height: 70,
    left: 80,
    top: 15,
  },
  modalButton: {
    backgroundColor: "#009E60",
    alignItems: "center",
    marginHorizontal: 20,
    width: "100%",
    resizeMode: "contain",
    marginLeft: "auto",
    height: 40,
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 20,
    padding: 40,
    width: "100%",
    maxWidth: 360,
    height: "90%",

  },
  modalTitulo: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "Chewy",
    color: "#385A64"
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Imprima",
    top: 20,
    lineHeight: 24
  },
  fecharModal: {
    left: 270,
    top: -30
  },
  toggleText: {
    marginTop: 10,
    fontSize: 17,
    color: "#fff",
    fontFamily: "Imprima"
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
  modalContent2: {
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
