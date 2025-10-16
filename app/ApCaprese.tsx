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
    step6: false,
    step7: false,
    step8: false,
    step9: false,
    step10: false,
    step11: false,
  });

  const [adShown, setAdShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const itemsMap: { [key: string]: string } = {
    item1: "12 tomates-cereja",
    item2: "Azeite de oliva extra virgem",
    item3: "Sal e pimenta-do-reino a gosto",
    item4: "Morangos inteiros (sem folhas)",
    item5: "Vinagre balsâmico (opcional)",
    item6: "Palitos de dente ou palitos de bambu",
    item7: "Folhas de manjericão frescas (1 por palito)",
    item8: "12 bolinhas de mussarela de búfala (ou cubos pequenos)",
  };

  const passosPreparo: { [key: string]: string } = {
    step1:
      "Em cada palito, espete um tomate-cereja, uma folha de manjericão dobrada e uma bolinha de mussarela.",
    step2:
      "Disponha os palitos em um prato ou tábua. Regue com azeite, sal e pimenta. Adicione vinagre balsâmico se quiser.",
    step3: "Sirva imediatamente ou mantenha refrigerado até a hora de servir.",
    step4:
      "Pode acompanhar sorvete, iogurte gelado ou ser servido puro como sobremesa.",
  };

  // Alterna check e verifica se todos os itens e passos estão marcados
  const toggleCheckWithAd = (key: string) => {
    const updatedCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updatedCheckedItems);

    setTimeout(() => {
      const allKeys = [...Object.keys(itemsMap), ...Object.keys(passosPreparo)];
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
      FileSystem.documentDirectory + "lista_de_compras_caprese.txt";

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
            source={require("../assets/images/fundo_caprese.png")}
            style={styles.decorativeImage}
            resizeMode="contain"
          />
          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={styles.touchTitulo}
              onPress={() => nav.navigate("aperitivos")}
            >
              <Feather name="chevron-left" size={28} color="#000" />
              <Text style={styles.paragraph}>Caprese no Palito</Text>
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
          {Object.entries(passosPreparo).map(([key, text]) => (
            <TouchableOpacity key={key} onPress={() => toggleCheckWithAd(key)}>
              <Text style={styles.topicos}>
                {checkedItems[key] ? (
                  <Text style={styles.check}>✓ </Text>
                ) : (
                  <Text style={styles.bolinha}>◯ </Text>
                )}
                {text}
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
          <Text style={styles.textoBotao}>Descarte correto</Text>
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

      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>
              O Que Fazer com Comida Estragada?
            </Text>
            <Text style={styles.modalTexto}>
              <Text style={{ fontWeight: "bold" }}>Restos de comida:</Text>{" "}
              cascas, sobras e restos podem ir para o lixo orgânico.{"\n\n"}
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
  touchTitulo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
