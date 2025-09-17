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

type CheckedItems = { [key: string]: boolean };

export default function Feijoada() {
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
    item9: false,
    item10: false,
    item11: false,
    item12: false,
    item13: false,
    item14: false,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
  });

  const itemsMap: { [key: string]: string } = {
    item1: "2 paios",
    item2: "3 dentes de alho picados",
    item3: "1 kg de feijão preto",
    item4: "1/4 kg de toucinho defumado",
    item5: "1 rabo de porco salgado",
    item6: "1/2 kg de lombo de porco salgado",
    item7: "1/2 kg de costelinha de porco salgada",
    item8: "1/2 kg de linguiça calabresa defumada",
    item9: "1/2 xícara de óleo ou banha de porco",
    item10: "2 pés de porco salgados",
    item11: "2 orelhas de porco salgadas",
    item12: "2 línguas defumadas ou salgadas",
    item13: "Água o quanto baste",
    item14: "Pimenta malagueta amassada (opcional)",
  };

  const stepsMap: { [key: string]: string } = {
    step1: "Coloque o feijão para cozinhar com água em panela de pressão.",
    step2: "Dessalgue as carnes salgadas com antecedência.",
    step3: "Ferva as carnes separadamente para tirar o excesso de sal.",
    step4: "Refogue o alho e a cebola em uma panela grande.",
    step5: "Adicione as carnes ao refogado e misture bem.",
    step6: "Junte o feijão cozido às carnes e deixe ferver.",
    step7: "Cozinhe tudo junto até que as carnes fiquem bem macias.",
    step8: "Sirva com arroz, couve e farofa.",
  };

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

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
      FileSystem.documentDirectory + "lista_de_compras_feijoada.txt";

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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <Image
            source={require("../assets/images/fundo_feijoada.png")}
            style={styles.decorativeImage}
            resizeMode="contain"
          />

          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={styles.touchTitulo}
              onPress={() => nav.navigate("almoco_domingo")}
            >
              <Feather name="chevron-left" size={28} color="#000" />
              <Text style={styles.paragraph}>FEIJOADA</Text>{" "}
            </TouchableOpacity>
          </View>

          <Text style={styles.ingredientes}>INGREDIENTES</Text>
          <View style={styles.ingredientesContainer}>
            <View>
              {Object.entries(itemsMap).map(([key, label]) => (
                <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
                  <Text style={styles.topicos}>
                    {checkedItems[key] ? (
                      <Text style={styles.check}>✓ </Text>
                    ) : (
                      <Text style={styles.bolinha}>◯  </Text>
                    )}
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.ingredientes}>MODO DE PREPARO</Text>
          {Object.entries(stepsMap).map(([key, label]) => (
            <TouchableOpacity key={key} onPress={() => toggleCheck(key)}>
              <Text style={styles.topicos}>
                {checkedItems[key] ? (
                  <Text style={styles.check}>✓ </Text>
                ) : (
                  <Text style={styles.bolinha}>◯  </Text>
                )}
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
          <Text style={styles.textoBotao}>Forma correta descarte</Text>

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
          onPress={salvarListaDeCompras}
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
  decorativeImage: {
    position: "absolute",
    left: 135,
    top: 0,
    right: 0,
    width: 350,
    height: 500,
    zIndex: 0,
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
