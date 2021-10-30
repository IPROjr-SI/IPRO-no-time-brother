import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import firebase from '../../config/firebase';
//import auth from '@react-native-firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'firebase/firestore';

function loginFirebase(email, password) {
   /* firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} 
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            navigation.navigate("MyTabs")
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });*/

        console.log("Email: "+email+"\nSenha: "+password);
}
export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    //var provider = new firebase.auth.GoogleAuthProvider();

    useEffect(() => {

    }, [])

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.loginScreenTitle}>No Time Brother</Text>

            <TextInput
                style={styles.credentialInput}
                placeholder="Digite o seu e-mail"
                type="text"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.credentialInput}
                secureTextEntry={true}
                placeholder="Digite sua senha"
                type="text"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            {errorLogin === true
                ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>Email ou senha inválidos</Text>
                </View>
                :
                null
            }
            {email === "" || password === ""
                ?
                <TouchableOpacity
                    disabled={true}
                    style={styles.buttonLogin}
                >
                    <Text style={styles.textButtonLogin}>Login</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={loginFirebase(email, password)}
                >
                    <Text style={styles.textButtonLogin}>Login</Text>
                </TouchableOpacity>
            }
            <Text style={styles.registration}>
                Não tem uma conta?
                <Text
                    style={styles.linkSubscribe}
                    onPress={() => navigation.navigate("NewUser")}
                > Registre-se</Text>
            </Text>
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>


    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#e9ebef',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    loginScreenTitle: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#000a4c',
        marginTop: 40,
        marginBottom: 10,
    },
    credentialInput: {
        width: 300,
        marginTop: 10,
        padding: 10,
        height: 50,
        borderColor: "#000a4c",
        borderWidth: 1,
        borderRadius: 8,
        //borderBottomWidth:1,
        //borderBottomColor:'#000a4c',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#000a4c',
    },
    buttonLogin: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000a4c',
        borderRadius: 8,
        marginTop: 30,
    },
    textButtonLogin: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningAlert: {
        paddingLeft: 10,
        color: "#bdbdbd",
        fontSize: 16,
    },
    registration: {
        marginTop: 20,
        color: "#334079",
        fontWeight: 'bold',
    },
    linkSubscribe: {
        color: "#fa570a",
        fontSize: 16,
    }
});