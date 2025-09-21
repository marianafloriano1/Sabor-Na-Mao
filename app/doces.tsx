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
            onPress={() => nav.navigate("economica")}
          >
            <Feather name="chevron-left" size={24} color="#242424" />
            <Text style={styles.paragraph}>Doces economicos</Text>{" "}
          </TouchableOpacity>
        </View>
         <View style={[styles.branco, { paddingBottom: 100 }]}>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("gelatina_doce")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_doces.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Gelatina</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/6550713/pexels-photo-6550713.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("empada_doce")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_doces.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Empada doce</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/29538424/pexels-photo-29538424/free-photo-of-deliciosas-tortas-de-creme-caseiras-em-suporte.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => nav.navigate("brigadeiro_doce")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_doces.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Brigadeiro</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/7428532/pexels-photo-7428532.jpeg?auto=compress&cs=tinysrgb&w=600",
                }}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cardD}
              onPress={() => nav.navigate("bolo_doce")}
            >
              <ImageBackground
                source={require("../assets/images/fundo_doces.png")} // Imagem de fundo
                style={styles.backgroundImage}
                resizeMode="cover"
              ></ImageBackground>
              <Text style={styles.texto}>Bolo de caneca</Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/9981717/pexels-photo-9981717.jpeg?auto=compress&cs=tinysrgb&w=600",
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
    top: 20
  },

  paragraph: {
    fontSize: 24,
    color: "#242424",
    textTransform: "uppercase",
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
