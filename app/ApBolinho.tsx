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

// Funções de anúncio
import { anunciobola } from "./anunciobola";
import { recompensa } from "./recompensa";

type CheckedItems = {
  [key: string]: boolean;
};

export default function App() {
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
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  const [adShown, setAdShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const itemsMap: { [key: string]: string } = {
    item1: "1 ovo",
    item2: "Óleo para fritar",
    item3: "100g de bacon picado",
    item4: "Salsinha picada (opcional)",
    item5: "1 xícara de farinha de rosca",
    item6: "1/2 xícara de farinha de trigo",
    item7: "Pimenta-do-reino e orégano a gosto",
    item8: "2 colheres (sopa) de requeijão (ou cream cheese)",
    item9: "200g de muçarela ralada (ou outro queijo de sua preferência)",
  };

  // Alternar check + verificar anúncio
  const toggleCheckWithAd = (key: string) => {
    const updatedCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updatedCheckedItems);

    setTimeout(() => {
      const allKeys = [
        ...Object.keys(itemsMap),
        "step1",
        "step2",
        "step3",
        "step4",
        "step5",
      ];
      const allChecked = allKeys.every((k) => updatedCheckedItems[k]);

      if (allChecked && !adShown) {
        setAdShown(true);
        anunciobola(() => console.log("Anúncio intersticial fechado."));
      }
    }, 100);
  };

  // Salvar lista de compras
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
      FileSystem.documentDirectory + "lista_de_compras_bolinho_queijo.txt";

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

  // Botão salvar lista com anúncio de recompensa
  const handleDownloadPress = () => {
    recompensa(() => {
      salvarListaDeCompras();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/fundo_bolinho2.png")}
            style={styles.decorativeImage}
            resizeMode="contain"
          />

          {/* Título */}
          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={styles.touchTitulo}
              onPress={() => nav.navigate("aperitivos")}
            >
              <Feather name="chevron-left" size={28} color="#000" />
              <Text style={styles.paragraph}>Bolinha de Queijo com Bacon</Text>
            </TouchableOpacity>
          </View>

          {/* Ingredientes */}
          <Text style={styles.ingredientes}>INGREDIENTES</Text>
          <View style={styles.ingredientesContainer}>
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

          {/* Modo de preparo */}
          <Text style={styles.ingredientes}>MODO DE PREPARO</Text>
          {["step1", "step2", "step3", "step4", "step5"].map((stepKey) => {
            const stepText: { [key: string]: string } = {
              step1:
                "Frite o bacon até ficar dourado e crocante. Escorra o excesso de gordura e deixe esfriar.",
              step2:
                "Em uma tigela, misture o queijo, o bacon frito, o requeijão, pimenta, orégano e salsinha. Vá adicionando a farinha de trigo aos poucos até formar uma massa que dê para moldar.",
              step3: "Com as mãos, modele pequenas bolinhas com a massa.",
              step4:
                "Passe cada bolinha no ovo batido e depois na farinha de rosca. Se quiser mais crocância, repita o processo (ovo + farinha de rosca).",
              step5:
                "Aqueça o óleo e frite as bolinhas em fogo médio até dourarem. Retire e escorra em papel-toalha.",
            };
            return (
              <TouchableOpacity
                key={stepKey}
                onPress={() => toggleCheckWithAd(stepKey)}
              >
                <Text style={styles.topicos}>
                  {checkedItems[stepKey] ? (
                    <Text style={styles.check}>✓ </Text>
                  ) : (
                    <Text style={styles.bolinha}>◯ </Text>
                  )}
                  {stepText[stepKey]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Botões */}
      <View style={styles.botoesContainer}>
        {/* Modal descarte */}
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
        </TouchableOpacity>

        {/* Baixar lista com anúncio */}
        <TouchableOpacity
          style={styles.botaoCinza}
          onPress={handleDownloadPress}
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

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>
              O Que Fazer com Comida Estragada?
            </Text>
            <Text style={styles.modalTexto}>
              <Text style={{ fontWeight: "bold" }}>Restos de comida:</Text>{" "}
              cascas, sobras e restos vão para o lixo orgânico.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>
                Plásticos e embalagens:
              </Text>{" "}
              potes, sacos, tampas e garrafas limpos vão para o lixo reciclável.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Vidros:</Text> potes de
              conservas, garrafas e frascos podem ser reciclados. Se estiverem
              quebrados, embale bem em jornal ou outro material.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Papéis:</Text> caixas de
              alimentos, papel toalha seco e limpo, papelão vão para a
              reciclagem. Se estiver engordurado ou muito sujo, jogue no lixo
              comum.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>
                Óleo de cozinha usado:
              </Text>{" "}
              guarde em garrafa e leve até um ponto de coleta.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Dica final:</Text> veja o{" "}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
    width: 250,
  },
  ingredientes: {
    marginTop: 40,
    fontSize: 18,
    marginBottom: 20,
    paddingVertical: 5,
    left: 44,
  },
  ingredientesContainer: {
    flexDirection: "column",
    marginBottom: 20,
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
    width: 350,
    height: 500,
    zIndex: 0,
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
    width: "90%",
    maxWidth: 350,
  },
  modalTitulo: {
    fontSize: 18,
    marginBottom: 20,
    color: "green",
    fontWeight: "bold",
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
  touchTitulo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
