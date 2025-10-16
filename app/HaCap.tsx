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
    item10: false,
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  const [adShown, setAdShown] = useState(false);

  // Ingredientes
const itemsMap: { [key: string]: string } = {
  item1: "2 ovos",
  item2: "1 pitada de sal",
  item3: "1/2 xícara de óleo vegetal",
  item4: "3/4 xícara de açúcar mascavo",
  item5: "1/4 xícara de açúcar refinado",
  item6: "1 e 1/2 xícara de farinha de trigo",
  item7: "1 colher (chá) de fermento em pó",
  item8: "1/2 colher (chá) de bicarbonato de sódio",
  item9: "1 colher (chá) de canela em pó",
  item10: "1/2 colher (chá) de noz-moscada",
  item11: "1 xícara de purê de abóbora cozida e amassada",
};

const stepsMap: { [key: string]: string } = {
  step1:
    "Preaqueça o forno a 180 °C e prepare forminhas de cupcake em uma assadeira.",
  step2:
    "Em uma tigela grande, misture os ovos, o óleo vegetal, o açúcar mascavo e o açúcar refinado até obter um creme homogêneo.",
  step3:
    "Adicione o purê de abóbora à mistura líquida e mexa bem até incorporar.",
  step4:
    "Em outra tigela, peneire a farinha de trigo, o fermento, o bicarbonato, a canela, a noz-moscada e o sal.",
  step5:
    "Junte os ingredientes secos aos molhados, misturando delicadamente até formar uma massa uniforme.",
  step6:
    "Distribua a massa nas forminhas, enchendo até 2/3 da altura, e leve ao forno por 20–25 minutos, ou até que um palito saia limpo.",
  step7:
    "Deixe os cupcakes esfriarem completamente antes de decorar.",
  step8:
    "Se desejar, prepare uma cobertura de manteiga com açúcar de confeiteiro e essência de baunilha na batedeira, tingindo de laranja para o tema de abóbora.",
  step9:
    "Finalize decorando com mini abóboras de fondant ou confeitos temáticos sobre a cobertura.",
};

  // Toggle com anúncio
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

  // Salvar lista
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
      FileSystem.documentDirectory + "lista_de_compras_cupcake.txt";

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/fundo_cupcake.png")}
            style={styles.decorativeImage}
            resizeMode="contain"
          />
          <View style={styles.tituloContainer}>
            <TouchableOpacity
              style={styles.touchTitulo}
              onPress={() => nav.navigate("hallow")}
            >
              <Feather name="chevron-left" size={28} color="#000" />
              <Text style={styles.paragraph}>
                Cupcake de abóbora envenenada
              </Text>
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

        <Modal transparent visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>
                O Que Fazer com Comida Estragada?
              </Text>
              <Text style={styles.modalTexto}>
                <Text style={{ fontWeight: "bold" }}>Restos de comida:</Text>{" "}
                cascas, sobras e restos podem ir para o lixo orgânico. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Plásticos e embalagens:
                </Text>{" "}
                potes, sacos, tampas e garrafas devem ser limpos e colocados no
                lixo reciclável. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>Vidros:</Text> potes de
                conservas, garrafas e frascos podem ser reciclados. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>Papéis:</Text> caixas de
                alimentos, papel toalha (se seco e limpo), embalagens de papel e
                papelão vão para a reciclagem. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>
                  Óleo de cozinha usado:
                </Text>{" "}
                nunca descarte no ralo ou na pia. Guarde em uma garrafa plástica
                e leve até um ponto de coleta. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>Latas:</Text> latas de
                alimentos e bebidas devem ser enxaguadas e recicladas. {"\n\n"}
                <Text style={{ fontWeight: "bold" }}>Dica final:</Text> Acesse
                um manual completo aqui:{" "}
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
    backgroundColor: "#ECECEC",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
