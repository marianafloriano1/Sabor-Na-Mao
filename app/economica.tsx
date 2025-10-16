import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from "react";
import {
    Animated,
    Image,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

type RootStackParamList = {
    heranca: undefined;
    login: undefined;
    marmitas: undefined;
    lanche_rapido: undefined;
    doces: undefined;
    receitas_rapidas: undefined;
    cafe_manha: undefined;
    almoco: undefined;
    jantar: undefined;
    sobremesa: undefined;
    cha_tarde: undefined;
    lanche_escolar: undefined;
    economica: undefined;
    home: undefined;
    soboro: undefined

};

export default function App() {
    const route = useRoute();
    const nav = useNavigation<NavigationProp<RootStackParamList>>();

    const [selectedCategory, setSelectedCategory] = useState("tudo");
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
        Julius: require("../assets/fonts/JuliusSansOne-Regular.ttf"),
        Chewy: require("../assets/fonts/Chewy-Regular.ttf"),
    });

    useFocusEffect(
        useCallback(() => {
            if (route.name === "home") {
                setSelectedCategory("tudo");
            } else if (route.name === "soboro") {
                setSelectedCategory("soboro");
            } else if (route.name === "economica") {
                setSelectedCategory("economica");
            }
        }, [route.name])
    );

    const names = [
        'Mister Panela',
        'Mestre Cuca',
        'Chef de Plantão',
        'Mastre do Tempero',
        'Panela Quente',
        'Sabor Divino',
    ];
    const profilePics = [
        require('../assets/images/perfil1.png'),
        require('../assets/images/perfil2.png'),
        require('../assets/images/perfil3.png'),
        require('../assets/images/perfil4.png'),
        require('../assets/images/perfil5.png'),
        require('../assets/images/perfil6.png'),
    ];

    const getRandomProfile = () => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomPic = profilePics[Math.floor(Math.random() * profilePics.length)];
        return { name: randomName, pic: randomPic };
    };

    const [userProfile, setUserProfile] = useState(getRandomProfile());


    const items = [
        { title: 'Desjejum', image: require('../assets/images/cafe_manha.png'), route: 'cafe_manha' },
        { title: 'Almoço', image: require('../assets/images/almoco.png'), route: 'almoco' },
        { title: 'Jantar', image: require('../assets/images/jantar.jpg'), route: 'jantar' },

    ];
    const shadowColors = ['#FFE8AF', '#FFAB5C', '#005241', '#229E0C', '#00127A', '#B02652'];

    if (!fontsLoaded) return null;

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeNavigate = (navigateFunc: () => void) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            navigateFunc();
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };
    const [creditsVisible, setCreditsVisible] = useState(false);


    return (
        <View style={styles.container}>
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
                    <View style={styles.fundo}>
                        <Tooltip
                            isVisible={toolTipVisible}
                            content={
                                <View style={styles.tooltipContainer}>
                                    <TouchableOpacity
                                        style={styles.infoButton}
                                        onPress={() => setCreditsVisible(true)}
                                    >
                                        <Text style={{ fontSize: 22 }} >©</Text>
                                    </TouchableOpacity>

                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={creditsVisible}
                                        onRequestClose={() => setCreditsVisible(false)}
                                    >
                                        <View style={styles.modalOverlay}>
                                            <View style={styles.modalContent}>
                                                <Text style={styles.modalTitle}>Créditos</Text>
                                                <Text style={styles.modalText}>
                                                    Ícones e recursos visuais utilizados neste aplicativo foram obtidos em{" "}
                                                    <Text style={{ fontWeight: "bold" }}>Freepik</Text>.
                                                    {"\n"}Mais em: www.freepik.com
                                                </Text>
                                                <TouchableOpacity
                                                    style={styles.closeButton}
                                                    onPress={() => setCreditsVisible(false)}
                                                >
                                                    <Text style={styles.closeText}>Fechar</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <View style={styles.userInfo}>
                                        <View style={styles.userIcon}>
                                            <Image source={userProfile.pic} style={styles.userIconImage} />
                                        </View>
                                        <Text style={styles.userName}>{userProfile.name}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.recipesButton}
                                        onPress={() => {
                                            nav.navigate('heranca');
                                        }}
                                    >
                                        <Text style={styles.recipesText}>Minhas receitas</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.logoutButton}
                                        onPress={() => router.replace('/')}
                                    >
                                        <Text style={styles.logoutText}>Sair</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            placement="bottom"
                            onClose={() => setToolTipVisible(false)}
                            contentStyle={styles.tooltip}
                            backgroundColor="transparent"
                            showChildInTooltip={false}
                            allowChildInteraction={true}
                            arrowSize={{ width: 0, height: 0 }} // seta invisível
                            displayInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        >
                            <TouchableOpacity style={styles.touchable} onPress={() => setToolTipVisible(true)}>
                                <Image source={require('../assets/images/perfil.png')} style={styles.perfil} />
                            </TouchableOpacity>
                        </Tooltip>

                        <View style={styles.categorias2}>
                            <TouchableOpacity
                                style={[
                                    styles.categoria21,
                                    selectedCategory === "tudo" && { backgroundColor: "#385A64" }, // cor do "tudo"
                                    selectedCategory !== "tudo" && { backgroundColor: "#D3D3D3" }, // cinza claro
                                ]}
                                onPress={() => {
                                    setSelectedCategory("tudo");
                                    fadeNavigate(() => nav.navigate("home"));
                                }}
                            >
                                <Text style={styles.texto22}>Tudo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.categoria2,
                                    selectedCategory === "soboro" && { backgroundColor: "#385A64" },
                                    selectedCategory !== "soboro" && { backgroundColor: "#D3D3D3" },
                                ]}
                                onPress={() => {
                                    setSelectedCategory("soboro");
                                    fadeNavigate(() => nav.navigate("soboro"));
                                }}
                            >
                                <Text style={styles.texto2}>Sobras</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.categoria22,
                                    selectedCategory === "economica" && {
                                        backgroundColor: "#385A64",
                                    },
                                    selectedCategory !== "economica" && {
                                        backgroundColor: "#D3D3D3",
                                    },
                                ]}
                                onPress={() => {
                                    setSelectedCategory("economica");
                                    fadeNavigate(() => nav.navigate("economica"));
                                }}
                            >
                                <Text style={styles.texto2}>Econômica</Text>
                            </TouchableOpacity>
                        </View>


                        <Image source={require('../assets/images/img_economica.png')} style={styles.img_home}></Image>

                        <Text style={styles.texto_filtro}>Receitas saudáveis para cada refeições:</Text>

                        <View style={styles.buttonRow}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {items.slice(currentIndex, currentIndex + 6).map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            nav.navigate(item.route as keyof RootStackParamList);
                                        }}
                                        style={[
                                            styles.carouselItem,
                                            {
                                                shadowColor: shadowColors[index % shadowColors.length],
                                                shadowOffset: { width: 0, height: 12 }, // mais deslocada pra baixo
                                                shadowOpacity: 4,                     // mais forte
                                                shadowRadius: 16,                       // mais espalhada
                                                elevation: 20,
                                            },
                                        ]}
                                    >
                                        <Image style={styles.buttonImage} source={item.image} />
                                        <Text style={styles.texto}>{item.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>



                    </View>

                    <Text style={styles.textoo}>Clique e conheça nossas receitas:</Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginTop: 10,
                            marginLeft: -5,
                            padding: 20
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Pressable
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    shadowColor: '#7BAE14',
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 0.3,
                                    elevation: 26,
                                }}
                                onPress={() => nav.navigate('lanche_rapido')}
                            >

                                <Text style={styles.texto_snack}>Lanches Rápidos</Text>
                                <Image style={styles.img_snacks} source={require('../assets/images/lanche_rapido.png')} />


                            </Pressable>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Pressable
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    shadowColor: '#447C9D',
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 0.3,
                                    elevation: 26,

                                }}
                                onPress={() => nav.navigate('marmitas')}
                            >
                                <Text style={styles.texto_sozinho}>Marmitas</Text>
                                <Image style={styles.img_sozinho} source={require('../assets/images/marmita.png')} />
                            </Pressable>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginLeft: -5,
                            padding: 20,
                            top: -20
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Pressable
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    shadowColor: '#E8B931',
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 0.3,
                                    elevation: 26,

                                }}
                                onPress={() => nav.navigate('receitas_rapidas')}
                            >
                                <Text style={styles.texto_aperitivos}>Receitas Rápidas</Text>
                                <Image style={styles.img_aperitivos} source={require('../assets/images/receita_rapida.jpg')} />


                            </Pressable>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Pressable
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    shadowColor: '#965F21',
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 0.3,
                                    elevation: 26,

                                }}
                                onPress={() => nav.navigate('doces')}>
                                <Text style={styles.texto_almoco}>Doces</Text>
                                <Image style={styles.img_almoco} source={require('../assets/images/doce.jpg')} />


                            </Pressable>
                        </View>


                    </View>

                    <TouchableOpacity
                        style={styles.modalButton2}
                        onPress={() => setModalVisible(true)

                        }
                    >
                        <Text style={styles.toggleText2}>Por que não comer ultraprocessados?</Text>
                    </TouchableOpacity>

                    <Modal transparent visible={modalVisible} animationType="fade">
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent2}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.fecharModal2}
                                >
                                    <Feather name="x" size={28} color="red" />
                                </TouchableOpacity>

                                <ScrollView showsVerticalScrollIndicator={true}>
                                    <Text style={styles.modalTitulo2}>
                                        Por Que Evitar Ultraprocessados?
                                    </Text>

                                    <Text style={styles.modalTexto2}>
                                        Você sabia que consumir muitos alimentos ultraprocessados pode fazer mal para a sua saúde?
                                        Esses produtos geralmente contêm muito açúcar, sal, gorduras ruins e aditivos químicos,
                                        que podem causar problemas como obesidade, diabetes, pressão alta e até doenças do coração.{"\n\n"}

                                        Além disso, ultraprocessados não têm os nutrientes naturais dos alimentos frescos,
                                        o que prejudica a sua alimentação equilibrada.{"\n\n"}

                                        Evitar esses alimentos e preferir frutas, legumes e comidas feitas em casa ajuda você a se sentir melhor,
                                        ter mais energia e proteger seu corpo. Também é uma forma de cuidar do meio ambiente,
                                        já que ultraprocessados costumam gerar muito lixo embalado e difícil de reciclar.{"\n\n"}

                                        Que tal dar uma chance para alimentos naturais e mais saudáveis hoje mesmo?
                                        Seu corpo e o planeta agradecem!{"\n\n"}

                                        Acesse o Guia Alimentar para a População Brasileira e entenda mais sobre isso:{" "}
                                        <Text
                                            style={{
                                                color: "blue",
                                                borderBottomColor: "blue",
                                                borderBottomWidth: 1,
                                            }}
                                            onPress={() =>
                                                Linking.openURL(
                                                    "https://www.gov.br/saude/pt-br/assuntos/saude-brasil/eu-quero-me-alimentar-melhor/noticias/2022/por-que-limitar-o-consumo-de-alimentos-processados-e-evitar-alimentos-ultraprocessados"
                                                )
                                            }
                                        >
                                            Guia Alimentar
                                        </Text>
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#ececec',

    },
    fundo: {
        padding: 25
    },

    row: {
        justifyContent: 'center',
        alignItems: 'center',

    },

    img_home: {
        width: 368,
        height: 175,
        right: 10,
        bottom: -3
    },

    quadrado_fundo: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 190,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        top: -100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 26,
    },


    perfil: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginLeft: 'auto',
        left: 5,
        top: 30

    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        marginTop: 15
    },

    carouselItem: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        margin: 10,
        padding: 5,
        alignItems: "center",
        width: 100,
        height: 100,
    },
    buttonImage: {
        width: 70,
        height: 70,
        backgroundColor: "white",
        borderRadius: 7,
    },

    texto: {
        textAlign: "center",
        marginTop: 5,
        fontSize: 16,
        fontFamily: "Imprima",
    },

    textoo: {
        fontSize: 17,
        marginLeft: 35,
        color: "#000",
        top: 10,
        fontFamily: "Imprima"
    },
    texto_filtro: {
        fontSize: 18,
        marginTop: 25,
        color: "#000",
        bottom: -10,
        fontFamily: "Imprima",
        left: 12

    },
    texto1: {
        fontSize: 16,
        color: "#000",
        fontFamily: "Julius",
        textTransform: "uppercase",
    },

    //tooltip

    tooltip: {
        backgroundColor: "white",
        borderRadius: 25,
        padding: 20,
        width: 280,
        position: "absolute",
        left: 30,
        shadowColor: "#565656",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 26,
        height: 180,
        top: 30
    },

    tooltipContainer: {
        borderRadius: 5,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    userIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
        marginRight: 10,
    },
    userIconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    userName: {
        fontSize: 18,
        color: "#000",
        fontFamily: "Imprima"
    },
    recipesButton: {
        marginTop: 10,
        paddingVertical: 11,
        paddingHorizontal: 40,
        backgroundColor: "#F8D12D",
        borderRadius: 9,
        width: 190,
        height: 40,
    },

    recipesText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "Imprima",

    },
    logoutButton: {
        marginTop: 18,
        paddingVertical: 6,
        paddingHorizontal: 21,
        backgroundColor: "rgba(179, 38, 30, 0.5)",
        borderRadius: 9,
        width: 70,
        height: 30,
        left: 175,
    },
    logoutText: {
        color: "black",
        fontSize: 16,
        fontFamily: "Imprima",

    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    texto2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'monospace',

    },

    categoria2: {
        backgroundColor: "#cacaca",
        borderRadius: 25,
        width: 80,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 25,
        margin: 5,
    },

    categoria22: {
        backgroundColor: "#cacaca",
        borderRadius: 25,
        width: 110,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 25,
        margin: 5,
    },

    categorias2: {
        flexDirection: "row", // Organiza os itens em linha
        top: -10,
        left: 5,
        width: 90
    },

    texto22: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        fontFamily: "monospace",
    },
    categoria21: {
        backgroundColor: "#385A64",
        borderRadius: 25,
        width: 65,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 25,
        margin: 5,
        fontFamily: "monospace",
    },


    texto_sozinho: {
        color: '#6CA5C6',
        fontSize: 24,
        left: 10,
        top: 10,
        fontFamily: "Chewy",
    },
    texto_aperitivos: {
        color: '#FFC700',
        fontSize: 24,
        left: 10,
        top: 10,
        fontFamily: "Chewy",
    },
    texto_snack: {
        color: '#B3CD81',
        fontSize: 24,
        left: 10,
        top: 10,
        fontFamily: "Chewy",
    },
    texto_almoco: {
        color: '#965F21',
        fontSize: 24,
        left: 10,
        top: 10,
        fontFamily: "Chewy",
    },
    img_sozinho: {
        width: 100,
        height: 90,
        left: 39,
        top: 30,
    },
    img_snacks: {
        width: 120,
        height: 100,
        left: 40,
        bottom: 12

    },
    img_almoco: {
        width: 120,
        height: 90,
        left: 20,
        top: 29

    },
    img_aperitivos: {
        width: 90,
        height: 85,
        top: 1,
        left: 55

    },
    infoButton: {
        position: "absolute",
        right: -10,
        top: -10,
        padding: 6,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        width: "90%",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,

    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
        fontFamily: "Imprima"
    },
    modalText: {
        fontSize: 17,
        marginBottom: 20,
        fontFamily: "Imprima"
    },
    closeButton: {
        backgroundColor: "rgba(179, 38, 30, 0.5)",
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: "flex-end",
        width: 70,
    },
    closeText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Imprima",
        fontSize: 16
    },
    modalButton2: {
        backgroundColor: "#009E60",
        alignItems: "center",
        marginHorizontal: 20,
        width: "100%",
        resizeMode: "contain",
        marginLeft: "auto",
        height: 40,
        marginTop: 30,
    },
    modalContainer2: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent2: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderRadius: 20,
        padding: 40,
        width: "100%",
        maxWidth: 360,
        height: "90%",

    },
    modalTitulo2: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily: "Chewy",
        color: "#385A64"
    },
    modalTexto2: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: "Imprima",
        top: 20,
        lineHeight: 24
    },
    fecharModal2: {
        left: 270,
        top: -30
    },
    toggleText2: {
        marginTop: 10,
        fontSize: 17,
        color: "#fff",
        fontFamily: "Imprima"
    },
    infoButton2: {
        position: "absolute",
        right: -10,
        top: -10,
        padding: 6,
    },
});
