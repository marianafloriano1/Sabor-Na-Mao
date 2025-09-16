import { Feather } from "@expo/vector-icons";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AnoNovo() {
  const nav = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.touchTitulo}
            onPress={() => nav.navigate("soboro")}
          >
            <Feather
              name="chevron-left"
              size={24}
              color="#242424"
              style={styles.seta}
            />

            <Text style={styles.paragraph}> Receitas com sobra de legumes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.branco}>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("soRefoga")}
            >
              <ImageBackground
                source={require("../assets/images/soboroLegu.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Refogado de Legumes com Ovo</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/4193454/pexels-photo-4193454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("soPanq")}
            >
              <ImageBackground
                source={require("../assets/images/soboroLegu.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}> Panqueca de Sobras</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/6947180/pexels-photo-6947180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("soSalada")}
            >
              <ImageBackground
                source={require("../assets/images/soboroLegu.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}> Salada de Legumes</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/27626309/pexels-photo-27626309/free-photo-of-legumes-vegetais-textura-jantar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("soTortaLegu")}
            >
              <ImageBackground
                source={require("../assets/images/soboroLegu.jpg")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>
                Torta de Legumes de Liquidificador
              </Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/6072216/pexels-photo-6072216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 ",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ececec",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 12, // espaço entre a seta e o texto
  },

  paragraph: {
    fontSize: 24,
    color: "#242424",
    textTransform: "uppercase",
    top: 20,
  },
  seta: {
    top: 7,
  },

  branco: {
    backgroundColor: "white",
    position: "relative",
    zIndex: -1,
    flex: 1,
    minHeight: 300, // 👈 adicione isso ou outro valor
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    top: 40,
    padding: 15,
  },

  card: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: "flex-start",
    marginBottom: 16,
    marginTop: 16,
  },
  texto: {
    position: "absolute",
    top: 20,
    left: 12,
    color: "#000",
    fontSize: 14,
    textTransform: "uppercase",
    zIndex: 2,
  },

  cardD: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
  },

  cardImage: {
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 8,
    right: 8,
    zIndex: 2,
    borderRadius: 40,
  },
  touchTitulo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%", // ocupa toda a largura do container
    paddingVertical: 10, // aumenta a área de toque vertical
    paddingHorizontal: 10, // aumenta a área de toque horizontal
  },
});
