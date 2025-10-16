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

// importando suas funções de anúncio
import { anunciobola } from "./anunciobola";
import { recompensa } from "./recompensa";

type CheckedItems = {
  [key: string]: boolean;
};

export default function App() {
  const nav = useNavigation<NavigationProp<any>>();

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [adShown, setAdShown] = useState(false);

  // Ingredientes
  const itemsMap: { [key: string]: string } = {
    item1: "Palitos de churrasco",
    item4: "1/2 abacaxi cortado\n em cubos",
    item8: "4 colheres (sopa) de\n açúcar mascavo ou demerara",
    item2: "2 colheres (sopa) de manteiga",
    item7: "Morangos inteiros (sem folhas)",
    item3: "1 manga firme cortada em cubos",
    item5: "1 colher (chá) de canela (opcional)",
    item6: "2 bananas cortadas em rodelas grossas",
  };

  // Modo de preparo
  const stepsMap: { [key: string]: string } = {
    step1:
      "Intercale os pedaços de frutas nos palitos (ex: abacaxi → banana → morango → manga).",
    step2:
      "Em uma frigideira grande, derreta a manteiga, acrescente o açúcar e a canela, mexa até formar um caramelo leve. Adicione os espetinhos e vá virando até dourar.",
    step3:
      "Pincele os espetinhos com a calda de açúcar.",
    step4: "Sirva com sorvete, iogurte gelado ou puro como sobremesa.",
  };

  // Alternar check + verificar anúncio
  const toggleCheckWithAd = (key: string) => {
    const updatedCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updatedCheckedItems);

    setTimeout(() => {
      const allKeys = [...Object.keys(itemsMap), ...Object.keys(stepsMap)];
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
      FileSystem.documentDirectory + "lista_de_compras_espetinho_tropical.txt";

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
            source={require("../assets/images/fundo_tropical.png")}
            style={styles.decorativeImage}
            resizeMode="contain"
          />

          {/* Título */}
          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={styles.touchTitulo}
              onPress={() => nav.navigate("ano_novo")}
            >
              <Feather name="chevron-left" size={28} color="#000" />
              <Text style={styles.paragraph}>
                Espetinhos Tropicais Caramelizados
              </Text>
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

          {/* Modo de Preparo */}
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
              cascas e sobras vão para o lixo orgânico.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Plásticos:</Text> limpos e
              recicláveis.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Vidros:</Text> recicláveis,
              mas se quebrados devem ser embalados.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Papéis:</Text> limpos para
              reciclagem, engordurados no lixo comum.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Óleo de cozinha:</Text>{" "}
              guarde em garrafa e leve a ponto de coleta.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Dica:</Text> veja o{" "}
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
    paddingBottom: 80,
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 90,
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 20,
    color: "#242424",
    textTransform: "uppercase",
    marginLeft: 5,
  },
  ingredientes: {
    marginTop: 40,
    fontSize: 18,
    marginBottom: 20,
    left: 44,
  },
  ingredientesContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  topicos: {
    marginBottom: 10,
    lineHeight: 22,
    left: 44,
    width: 300,
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
    height: 60,
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
    fontSize: 14,
    fontWeight: "600",
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
    fontSize: 15,
    marginBottom: 20,
    color: "#333",
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
