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

// importa suas funções de anúncio
import { anunciobola } from "./anunciobola";
import { recompensa } from "./recompensa";

type CheckedItems = {
  [key: string]: boolean;
};

export default function SaladaDeLentilha() {
  const nav = useNavigation<NavigationProp<any>>();

  // controle dos checkboxes
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [adShown, setAdShown] = useState(false); // controla se já exibiu anúncio

  // ingredientes
  const itemsMap: { [key: string]: string } = {
    item1: "1 xícara de lentilha crua",
    item2: "1/2 pimentão vermelho picado",
    item3: "1/2 pepino em cubos pequenos",
    item4: "2 colheres (sopa) de azeite de oliva",
    item5: "1/2 cebola roxa picada em cubinhos",
    item6: "10 tomates-cereja cortados ao meio",
    item7: "Sal e pimenta-do-reino a gosto",
    item8: "Salsinha ou coentro picado a gosto",
    item9: "Suco de 1 limão ou 2 colheres (sopa) de vinagre",
  };

  // modo de preparo
  const stepsMap: { [key: string]: string } = {
    step1:
      "Lave bem e cozinhe em água com sal por cerca de 20 minutos, até que fique macia mas firme. Escorra e deixe esfriar.",
    step2: "Corte todos os ingredientes em cubinhos ou tiras pequenas.",
    step3: "Em uma tigela grande, junte a lentilha fria com os vegetais e ervas.",
    step4: "Adicione o limão (ou vinagre), azeite, sal e pimenta. Misture bem.",
    step5: "Leve à geladeira por 30 minutos para que os sabores se integrem melhor.",
  };

  // alternar check/uncheck + verificação de anúncio
  const toggleCheckWithAd = (key: string) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [key]: !checkedItems[key],
    };

    setCheckedItems(updatedCheckedItems);

    setTimeout(() => {
      const allKeys = [...Object.keys(itemsMap), ...Object.keys(stepsMap)];
      const allChecked = allKeys.every((k) => updatedCheckedItems[k]);

      if (allChecked && !adShown) {
        setAdShown(true);
        anunciobola(() => {
          console.log("Anúncio intersticial fechado.");
        });
      }
    }, 100);
  };

  // salvar lista (somente não marcados) com anúncio de recompensa
  const salvarListaDeCompras = async () => {
    const naoSelecionados = Object.keys(itemsMap)
      .filter((key) => !checkedItems[key])
      .map((key) => `- ${itemsMap[key]}`)
      .join("\n");

    if (!naoSelecionados) {
      Alert.alert("Tudo certo!", "Todos os ingredientes foram marcados.");
      return;
    }

    const fileUri = FileSystem.documentDirectory + "lista_de_compras.txt";

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

  // botão salvar lista -> anúncio de recompensa antes
  const handleDownloadPress = () => {
    recompensa(() => {
      salvarListaDeCompras();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* imagem decorativa */}
          <Image
            source={require("../assets/images/fundo_lentilha.png")}
            style={styles.decorativeImage}
            resizeMode="contain"
          />

          {/* título com botão voltar */}
          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => nav.navigate("ano_novo")}
            >
              <Feather name="chevron-left" size={28} color="#000" />
              <Text style={styles.paragraph}>Salada de Lentilha</Text>
            </TouchableOpacity>
          </View>

          {/* ingredientes */}
          <Text style={styles.ingredientes}>INGREDIENTES</Text>
          <View style={styles.ingredientesContainer}>
            {Object.entries(itemsMap).map(([key, label]) => (
              <TouchableOpacity key={key} onPress={() => toggleCheckWithAd(key)}>
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

          {/* modo de preparo */}
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

      {/* botões inferiores */}
      <View style={styles.botoesContainer}>
        {/* botão modal */}
        <TouchableOpacity
          style={styles.botaoVerde}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="refresh-cw" size={20} color="#fff" style={styles.iconeBotao} />
          <Text style={styles.textoBotao}>Forma correta descarte</Text>
        </TouchableOpacity>

        {/* botão salvar lista com anúncio */}
        <TouchableOpacity style={styles.botaoCinza} onPress={handleDownloadPress}>
          <Feather name="download" size={20} color="#FFCC00" style={styles.iconeBotao} />
          <Text style={styles.textoBotao}>Baixar lista de compra</Text>
        </TouchableOpacity>
      </View>

      {/* modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>O Que Fazer com Comida Estragada?</Text>
            <Text style={styles.modalTexto}>
              <Text style={{ fontWeight: "bold" }}>Restos de comida:</Text> cascas, sobras
              e restos podem ir para o lixo orgânico.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Plásticos e embalagens:</Text> potes,
              sacos, tampas e garrafas devem ser limpos e reciclados.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Vidros:</Text> potes de conservas,
              garrafas e frascos podem ser reciclados.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Papéis:</Text> caixas de alimentos e
              papelão limpos vão para a reciclagem.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Óleo de cozinha usado:</Text> nunca
              jogue no ralo. Guarde em garrafa plástica e leve até um ponto de coleta.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Latas:</Text> enxágue e coloque no lixo
              reciclável.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Dica final:</Text> Veja um manual
              completo sobre compostagem em:{" "}
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

// estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ECECEC",
    paddingBottom: 20,
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
    marginLeft: 10,
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
    lineHeight: 22,
    left: 44,
    width: 290,
  },
  check: {
    color: "#32CD32",
    fontSize: 18,
  },
  bolinha: {
    fontSize: 16,
  },
  botoesContainer: {
    flexDirection: "row",
    width: "100%",
    height: 55,
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
    marginRight: 8,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 15,
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
    textAlign: "center",
  },
  modalTexto: {
    fontSize: 15,
    marginBottom: 20,
  },
  textoFechar: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
