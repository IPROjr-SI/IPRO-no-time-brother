import React, { useState } from 'react';
import {
    StyleSheet,
    Button, TextInput,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native';
import { Formik, Field } from 'formik';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function TaskForm(props) {

    // Titulo da atividade
    const [title, setTitle] = useState("")
    // Tipo de atividade
    const [typeActivity, setTypeActivity] = useState();

    // Data atual, outra data
    let data = new Date();
    const todaysDate = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    const [selectedDate, setSelectedDate] = useState(todaysDate);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // DUração
    const [time, setTime] = useState("00:00");

    // O.K.R
    const [okr, setOkr] = useState();

    // Modal de observação =================================
    // 
    // Mostrar e esconder
    const [modalVisible, setModalVisible] = useState(false);
    // Dados de observação
    const [observation, setObservation] = useState("");
    // =====================================================

    const onChange = (event, selectedDateTime) => {
        const currentDate = selectedDateTime || date;
        setShow(Platform.OS === 'ios');
        let auxTime = currentDate.toLocaleTimeString([], { timeStyle: 'short' });
        auxTime = auxTime.slice(0, 4 + 1);
        console.log('A data: ' + auxTime);
        setDate(currentDate);
        setTime(auxTime);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    function enviarDados(){
        let object = {
            title: title,
            typeActivity: typeActivity,
            selectedDate: selectedDate,
            time: time,
            okr: okr,
            observation: observation
        }
        console.log(object)
    }
    return (
        <Formik
            initialValues={{ email: '' }}
            onSubmit={enviarDados}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.formContainer}>
                    <Text style={styles.textInputTitle}>Atividade</Text>
                    <TextInput
                        onChangeText={(title) => setTitle(title)}
                        value={title}
                        style={styles.textInput}
                    />
                    <Text style={styles.textInputTitle}>Tipo de Atividade</Text>
                    <Picker style={styles.pickerField}
                        selectedValue={typeActivity}
                        onValueChange={(itemValue, itemIndex) =>
                            setTypeActivity(itemValue)
                        }>
                        <Picker.Item label="Funções do cargo" value="Funções do cargo" />
                        <Picker.Item label="Reuniões do setor/coordenadoria" value="Reuniões do setor/coordenadoria" />
                        <Picker.Item label="Reuniões fora do escopo" value="Reuniões fora do escopo" />
                        <Picker.Item label="RA e RG" value="RA e RG" />
                        <Picker.Item label="AGO" value="AGO" />
                        <Picker.Item label="Propsecção Ativa" value="Propsecção Ativa" />
                        <Picker.Item label="Execução de projetos" value="Execução de projetosa" />
                        <Picker.Item label="Palestras e/ou capacitações" value="Palestras e/ou capacitações" />
                        <Picker.Item label="Processo seletivo" value="Processo seletivo" />
                        <Picker.Item label="Interações MEJ" value="Interações MEJ" />
                    </Picker>

                    <View style={styles.dateAndDurationContainer}>
                        <View style={styles.dateAndDurationContainerChild}>
                            <Text style={styles.textInputTitle}>Data</Text>
                            <DatePicker
                                style={styles.dateInputField}
                                date={selectedDate}
                                mode="date"
                                placeholder="select date"
                                format="DD/MM/YYYY"
                                minDate="1/10/2021"
                                maxDate="31/12/2050"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none',
                                        position: 'absolute',
                                        left: 0,
                                        marginLeft: 0,
                                    }, dateInput: {
                                        borderWidth: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },

                                }}
                                onDateChange={(date) => { setSelectedDate(date) }}
                            />
                        </View>
                        <View style={styles.dateAndDurationContainerChild}>
                            <Text style={styles.textInputTitle}>Duração</Text>
                            <TouchableOpacity onPress={showTimepicker} >
                                <TextInput
                                    editable={false}
                                    value={time}
                                    style={styles.timeTextInput}
                                />
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="clock"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>


                    <View style={styles.observationAndOkrContainer}>
                        <View style={styles.observationAndOkrContainerChild}>
                            <View style={styles.dateAndOkrContainerChild}>
                                <Text style={styles.textInputTitle}>O.K.R</Text>
                                <Picker style={styles.pickerFieldOkr}
                                    selectedValue={okr}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setOkr(itemValue)
                                    }>
                                    <Picker.Item label="1.2 - Funções do cargo" value="Funções do cargo" />
                                    <Picker.Item label="1.3 -Reuniões do setor/coordenadoria" value="Reuniões do setor/coordenadoria" />
                                    <Picker.Item label="1.1 - Reuniões fora do escopo" value="Reuniões fora do escopo" />
                                    <Picker.Item label="2.1 - RA e RG" value="RA e RG" />
                                    <Picker.Item label="3.1 - AGO" value="AGO" />
                                    <Picker.Item label="3.2 - Propsecção Ativa" value="Propsecção Ativa" />
                                    <Picker.Item label="3.3 - Execução de projetos" value="Execução de projetosa" />
                                    <Picker.Item label="4.1 - Palestras e/ou capacitações" value="Palestras e/ou capacitações" />
                                    <Picker.Item label="4.2 - Processo seletivo" value="Processo seletivo" />
                                    <Picker.Item label="4.3 - Interações MEJ" value="Interações MEJ" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.observationAndOkrContainerChild}>
                            <Pressable
                                style={[styles.openerModalButton]}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={styles.textStyle}>Observação</Text>
                            </Pressable>
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Hello World!</Text>
                                        <TextInput
                                            multiline
                                            onChangeText={(observation) => setObservation(observation)}
                                            onBlur={handleBlur('observation')}
                                            value={observation}
                                            style={styles.textInputInsideModal}
                                        />
                                        <Pressable
                                            style={[styles.buttonInsideModal]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                    </View>
                    <Pressable onPress={handleSubmit} style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? '#bb460b'
                                : '#fa570a'
                        },
                        styles.submitButton
                    ]}>
                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 24,
                            textAlign: 'center'
                        }}>Submit</Text>
                    </Pressable>
                </View>
            )}
        </Formik>

    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        width: screenWidth * 0.9,
        alignSelf: 'center',
    },
    textInputTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        color: '#000a4c',
    },
    textInput: {
        backgroundColor: '#fff',
        height: 50,
        fontSize: 24,
        width: "100%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
    },
    pickerField: {
        backgroundColor: '#fff',
        height: 50,
        width: "100%",
        borderRadius: 12,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
        color: '#000a4c',
    },
    dateInputField: {
        backgroundColor: '#fff',
        height: 50,
        fontSize: 24,
        borderRadius: 6,
        padding: 5,
        elevation: 1,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    timeTextInput: {
        backgroundColor: '#fff',
        color: "#000",
        height: 50,
        fontSize: 24,
        width: "100%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
    },
    dateAndDurationContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-evenly'
    },
    dateAndDurationContainerChild: {
        flex: 1,
    },
    observationAndOkrContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-evenly'
    },
    observationAndOkrContainerChild: {
        flex: 1,
    },
    pickerFieldOkr: {
        backgroundColor: '#fff',
        height: 50,
        width: "90%",
        borderRadius: 12,
        padding: 8,
        elevation: 1,
        marginBottom: 10,
        color: '#000a4c',
    },



    modalView: {
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

    },
    openerModalButton: {
        borderRadius: 6,
        padding: 5,
        elevation: 2,
        backgroundColor: "#000a4c",
        flex: 1,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonInsideModal: {
        borderRadius: 6,
        padding: 5,
        elevation: 2,
        backgroundColor: "#000a4c",
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textInputInsideModal: {
        backgroundColor: '#fff',
        borderColor: "#000a4c",
        borderWidth: 1,
        fontSize: 20,
        width: "100%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,

        marginBottom: 10,
    },

    submitButton: {
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    }
});


