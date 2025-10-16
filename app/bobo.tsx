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

export default function BoboDeCamarao() {
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
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    step9: false,
  });

  const [adShown, setAdShown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
const itemsMap: { [key: string]: string } = {
  item1: "1 kg de camarão fresco limpo",
  item2: "Suco de 1 limão",
  item3: "Sal e pimenta-do-reino a gosto",
  item4: "3 dentes de alho picados",
  item5: "1 cebola média picada",
  item6: "1 kg de mandioca (aipim) descascada e cortada em pedaços",
  item7: "2 colheres (sopa) de azeite de dendê",
  item8: "2 colheres (sopa) de azeite de oliva",
  item9: "2 pimentões (1 verde e 1 vermelho) picados",
  item10: "2 tomates sem pele picados ou 1 lata de molho pronto",
  item11: "2 vidros de leite de coco",
  item12: "1 maço de cheiro-verde picado",
  item13: "1 folha de louro",
};

const stepsMap: { [key: string]: string } = {
  step1: "Tempere o camarão com sal, pimenta, alho e suco de limão. Deixe marinar por 15 minutos.",
  step2: "Cozinhe a mandioca com o louro até ficar bem macia. Retire o louro e reserve um pouco da água do cozimento.",
  step3: "Bata a mandioca cozida no liquidificador com o leite de coco e um pouco da água do cozimento até formar um creme homogêneo.",
  step4: "Em uma panela grande, aqueça o azeite de oliva e refogue a cebola e os pimentões até murcharem.",
  step5: "Acrescente os tomates picados (ou o molho) e cozinhe até formar um molho encorpado.",
  step6: "Adicione o camarão marinado e refogue por alguns minutos, até começarem a ficar rosados.",
  step7: "Junte o creme de mandioca à panela e misture bem em fogo baixo.",
  step8: "Adicione o azeite de dendê e mexa até ficar bem incorporado.",
  step9: "Ajuste o sal e, se necessário, acrescente um pouco da água do cozimento para ajustar a consistência.",
  step10: "Finalize com cheiro-verde picado e sirva quente.",
};


  // Alterna bolinha ✓/◯ e exibe anúncio se todos forem marcados
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

  // Salva lista de compras com ingredientes não marcados
  const salvarListaDeCompras = async () => {
    const naoSelecionados = Object.keys(itemsMap)
      .filter((key) => !checkedItems[key])
      .map((key) => `- ${itemsMap[key].replace(/\n/g, " ")}`)
      .join("\n");

    if (!naoSelecionados) {
      Alert.alert("Tudo certo!", "Todos os ingredientes foram marcados.");
      return;
    }

    const fileUri =
      FileSystem.documentDirectory + "lista_de_compras_bobo_de_camarao.txt";

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/fundo_bobo.png")}
            style={styles.decorativeImage}
            resizeMode="contain"
          />

          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={styles.touchTitulo}
              onPress={() => nav.navigate("pascoa")}
            >
              <Feather name="chevron-left" size={28} color="#000" />
              <Text style={styles.paragraph}>BOBÓ DE CAMARÃO</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.ingredientes}>INGREDIENTES</Text>
          <View style={styles.ingredientesContainer}>
            <View>
              {Object.entries(itemsMap).map(([key, item]) => (
                <TouchableOpacity key={key} onPress={() => toggleCheckWithAd(key)}>
                  <Text style={styles.topicos}>
                    {checkedItems[key] ? (
                      <Text style={styles.check}>✓ </Text>
                    ) : (
                      <Text style={styles.bolinha}>◯ </Text>
                    )}
                    {item}
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
      </ScrollView>

      {/* BOTÕES */}
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

      {/* MODAL */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>O Que Fazer com Comida Estragada?</Text>
            <Text style={styles.modalTexto}>
              <Text style={{ fontWeight: "bold" }}>Restos de comida:</Text> cascas,
              sobras e restos podem ir para o lixo orgânico.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Plásticos e embalagens:</Text>{" "}
              potes, sacos, tampas e garrafas devem ser limpos e colocados no lixo
              reciclável.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Vidros:</Text> potes de conservas,
              garrafas e frascos podem ser reciclados.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Papéis:</Text> caixas de alimentos,
              papel toalha (se seco e limpo), embalagens de papel e papelão vão para
              a reciclagem.{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Óleo de cozinha usado:</Text> guarde
              em garrafa e leve até um ponto de coleta.{"\n\n"}
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
