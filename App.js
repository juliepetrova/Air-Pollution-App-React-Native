import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, Platform, ImageBackground, Text, View, Modal, TouchableHighlight, Alert } from 'react-native';
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import t from 'tcomb-form-native';

const Form = t.form.Form;

const City = t.struct({
    country: t.String,
    state: t.String,
    city: t.String,
});
const options = {
    fields: {
        country: {
            label: 'Select a country',
        },
        state: {
            label: 'Select a state'
        },
        city: {
            label: 'Select a city'
        }
    },
};
// t.form.Form.stylesheet.textbox.normal.color = '#00FF00';

export default class App extends Component {
    weatherData = "data";

    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            dataSource: null,
            modalVisible: false
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    findCity = () => {
        this.state.modalVisible = false;
        const value = this._form.getValue(); 
        return fetch("http://api.airvisual.com/v2/city?city=" + value.city + "&state= "+ value.state+"&country="+ value.country +"&key=db6bfeba-acff-42a0-b705-eb7e1ad034da")
            .then(response => response.json()).catch(err => { console.log(err) })
            .then(responseJson => {
                if(responseJson.status === "fail"){
                    Alert.alert("City not found!", "Please check if all information has been inputted correctly.")
                }else {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data,
                    })
                }

            })
            .catch(err => { console.log(err);
            });
    }

    componentDidMount() {

        return fetch("http://api.airvisual.com/v2/nearest_city?key=db6bfeba-acff-42a0-b705-eb7e1ad034da")
            .then(response => response.json())
            .then(responseJson => {
                if(responseJson) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.data,
                    })
                }
            })
            .catch(err => { console.log(err);
            });
    }

    render() {
        const { modalVisible } = this.state.modalVisible;
        if(this.state.isLoading) {
            return (<View><Text>Is Loading</Text></View> )
        }else {
            let weatherData = this.state.dataSource;

            return (
                <SafeAreaView style={styles.container}>
                    <ImageBackground style={styles.container} source={require('./assets/image.png')}>
                        <Header value={weatherData}/>
                        <Content value= {weatherData}/>
                        {/*Modal*/}
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(false);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Find cities</Text>
                                        <Form ref={c => this._form = c} // assign a ref
                                            type={City}
                                              options={options} // pass the options via props
                                            />
                                        <TouchableHighlight
                                            style={{ ...styles.submitBtn }}
                                            onPress={this.findCity}
                                        >
                                            <Text style={styles.textStyle}>Find city</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                        </View>

                        <Footer value={weatherData}/>
                        <TouchableHighlight
                            style={styles.findButton}
                            onPress={() => {
                                this.setModalVisible(true);
                            }}
                        >
                            <Text style={styles.textStyle}>Search for a city</Text>
                        </TouchableHighlight>

                        {/*<Footer weather= {weatherData}/>*/}
                    </ImageBackground>

                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
    findButton: {
        marginBottom:15,
        margin:30,
        justifyContent: 'center',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor: "#8c5808",
        borderRadius: 30,
        width: '80%',
        height:60,
        opacity:0.5,
        fontFamily: 'Manrope_300Light',
        elevation: 2
    },
//    Modal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    modalView: {
        // margin: 20,
        backgroundColor: "#faebdc",
        opacity:0.95,
        borderRadius: 20,
        paddingVertical:25,
        paddingHorizontal: 45,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        // fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
    },
    submitBtn: {
        justifyContent: 'center',
        alignSelf:'center',
        alignItems:'center',
        backgroundColor: "#9c6410",
        borderRadius: 30,
        width: '100%',
        paddingHorizontal:30,
        height:40,
        opacity:0.9,
        fontFamily: 'Manrope_300Light',
        elevation: 2
    },
    ...Form.stylesheet = {
      controlLabel: {
          // normal: {
              fontSize: 12,
          // }
      }
    }
});
