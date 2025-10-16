import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { anunciobola } from "./anunciobola";
import { recompensa } from "./recompensa";

type CheckedItems = {
  [key: string]: boolean;
};

export default function soArForno() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: "1/2 cebola picada",
    item2: "2 dentes de alho picados",
    item3: "Azeite ou óleo pra refogar",
    item4: "Cheiro-verde a gosto",
    item5: "Sal e pimenta a gosto",
    item6: "1 cenoura picada em cubinhos",
    item7: "1 batata picada em cubinhos",
    item8: "1 chuchu ou abobrinha picado (opcional)",
    item9: "1 tomate picado (ou 2 colheres de molho de tomate)",
    item10: "2 xícaras de macarrão cozido (parafuso, espaguete, o que tiver)",
    item11: "1 colher de chá de colorau ou cúrcuma (opcional, só pra dar cor)",
    item12: "Frango desfiado ou carne moída (opcional)",
  };

  const stepsMap: { [key: string]: string } = {
    step1:
      "Em uma panela grande, refogue a cebola e o alho no azeite. Se for usar carne ou frango, coloque agora.",
    step2:
      "Junte a cenoura, batata, chuchu/abobrinha e o tomate. Mexa bem e deixe refogar por uns 5 min.",
    step3:
      "Adicione a água (ou caldo), tempere com sal, pimenta e colorau. Tampe e cozinhe até os legumes ficarem macios (cerca de 15–20 min).",
    step4:
      "Quando os legumes estiverem cozidos, adicione o macarrão já cozido. Mexa e cozinhe por mais 3–5 min só pra aquecer e incorporar.",
  };

  const toggleCheckWithAd = (key: string) => {
    const updatedCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updatedCheckedItems);

    setTimeout(() => {
      const allKeys = [...Object.keys(itemsMap), ...Object.keys(stepsMap)];
      const allChecked = allKeys.every((k) => updatedCheckedItems[k]);

      if (allChecked && !adShown) {
        setAdShown(true);
        anunciobola(() => console.log("Anúncio fechado."));
      }
    }, 100);
  };

  // Salva lista de compras dos itens não marcados
  const salvarListaDeCompras = async () => {
    const naoSelecionados = Object.keys(itemsMap)
      .filter((key) => !checkedItems[key])
      .map((key) => `- ${itemsMap[key]}`)
      .join("\n");

    if (!naoSelecionados) {
      Alert.alert("Tudo certo!", "Todos os ingredientes foram marcados.");
      return;
    }

    const fileUri =
      FileSystem.documentDirectory + "lista_de_compras_sopa_macarrao.txt";

    try {
      await FileSystem.writeAsStringAsync(fileUri, naoSelecionados, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Arquivo salvo", `Lista salva em:\n${fileUri}`);
      }
    } catch (err) {
      Alert.alert("Erro ao salvar", "Não foi possível criar o arquivo.");
      console.error(err);
    }
  };
  const [adShown, setAdShown] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/imgSopaM.jpg")} // Certifique-se de que o caminho está correto
            style={styles.decorativeImage}
            resizeMode="contain"
          />

          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={styles.touchTitulo}
              onPress={() => nav.navigate("soboroMacarao")}
            >
              <Feather name="chevron-left" size={28} color="#000" />

              <Text style={styles.paragraph}>Sopa de Macarrão com Legumes</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.ingredientes}>INGREDIENTES</Text>
          <View style={styles.ingredientesContainer}>
            <View>
              {Object.entries(itemsMap).map(([key, label]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => toggleCheckWithAd(key)}
                >
                  <Text style={styles.topicos}>
                    {checkedItems[key] ? (
                      <Text style={styles.check}>✓ </Text>
                    ) : (
                      <Text style={styles.bolinha}>◯ </Text>
                    )}
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.ingredientes}>MODO DE PREPARO</Text>
          {Object.entries(stepsMap).map(([key, step]) => (
            <TouchableOpacity key={key} onPress={() => toggleCheckWithAd(key)}>
              <Text style={styles.topicos}>
                {checkedItems[key] ? (
                  <Text style={styles.check}>✓ </Text>
                ) : (
                  <Text style={styles.bolinha}>◯ </Text>
                )}
                {step}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>{" "}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoVerde}
          onPress={() => setModalVisible(true)}
        >
          <Feather
            name="refresh-cw"
            size={20}
            color="#fff"
            style={styles.iconeBotao}
          />
          <Text style={styles.textoBotao}>Descarte correto</Text>

          <Modal transparent visible={modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitulo}>
                  O Que Fazer com Comida Estragada?
                </Text>
                <Text style={styles.modalTexto}>
                  <Text style={{ fontWeight: "bold" }}>Restos de comida:</Text>{" "}
                  cascas, sobras e restos podem ir para o lixo orgânico.{" "}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    Plásticos e embalagens:
                  </Text>{" "}
                  potes, sacos, tampas e garrafas devem ser limpos e colocados
                  no lixo reciclável. Não precisa lavar tudo com sabão, só tirar
                  o grosso da sujeira já ajuda bastante.{"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>Vidros:</Text> potes de
                  conservas, garrafas e frascos podem ser reciclados. Se
                  estiverem quebrados, embale bem em jornal ou outro material
                  para evitar acidentes.{"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>Papéis:</Text> caixas de
                  alimentos, papel toalha (se seco e limpo), embalagens de papel
                  e papelão vão para a reciclagem. Se estiver engordurado ou
                  muito sujo, jogue no lixo comum.{"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    Óleo de cozinha usado:
                  </Text>{" "}
                  nunca descarte no ralo ou na pia. Guarde em uma garrafa
                  plástica e leve até um ponto de coleta.{"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>Latas:</Text> latas de
                  alimentos e bebidas devem ser enxaguadas e colocadas no lixo
                  reciclável.{"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>Dica final:</Text> Acesse
                  um manual completo sobre compostagem aqui:{" "}
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() =>
                      Linking.openURL(
                        "https://semil.sp.gov.br/educacaoambiental/prateleira-ambiental/manual-de-compostagem/"
                      )
                    }
                  >
                    Manual de Compostagem
                  </Text>
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.textoFechar}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCinza}
          onPress={() => recompensa(() => salvarListaDeCompras())}
        >
          <Feather
            name="download"
            size={20}
            color="#FFCC00"
            style={styles.iconeBotao}
          />
          <Text style={styles.textoBotao}>Baixar lista de compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "50%",
    backgroundColor: "#ECECEC",
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 90,
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 22,
    color: "#242424",
    textTransform: "uppercase",
    marginLeft: 5,
    width: 240,
  },
  ingredientes: {
    marginTop: 100,
    fontSize: 18,
    marginBottom: 20,
    paddingVertical: 5,
    left: 44,
  },
  ingredientesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicos: {
    marginBottom: 10,
    lineHeight: 24,
    left: 44,
    width: 290,
  },
  check: {
    color: "#32CD32",
    fontSize: 20,
    marginRight: 5,
  },
  bolinha: {
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
  },
  botaoVerde: {
    flex: 1,
    backgroundColor: "#009B4D",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  botaoCinza: {
    flex: 1,
    backgroundColor: "#2F4B54",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconeBotao: {
    marginRight: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
  },
  decorativeImage: {
    position: "absolute",
    left: 135,
    top: 0,
    right: 0,
    width: 350,
    height: 500,
    zIndex: 0,
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 350,
  },
  modalTitulo: {
    fontSize: 18,
    marginBottom: 30,
    color: "green",
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 20,
  },
  textoFechar: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    marginTop: 10,
    fontSize: 14,
    color: "#fff",
    textTransform: "uppercase",
  },
  touchTitulo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%", // ocupa toda a largura do container
    paddingVertical: 10, // aumenta a área de toque vertical
    paddingHorizontal: 10, // aumenta a área de toque horizontal
  },
});
