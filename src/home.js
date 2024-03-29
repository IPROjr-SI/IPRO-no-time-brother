import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeHorizontalList from './home-horizontal-list/homeHorizontalList'
import HomeMainButtons from './home-main-buttons/homeMainButtons';
import NewTask from './pages/new-task/NewTask';
import History from './pages/history/History';
import { UserContext } from '../App';
import 'firebase/firestore';
import firebase from './config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProgressBarDay from './components/user-progress-bar/userProgressBarDay';
import UserProgressBarWeek from './components/user-progress-bar/userProgressBarWeek';
import ConfigOkr from './pages/settings/config-okr/ConfigOkr'
import { Bugs, FeedBack } from './pages/project-forms/ProjectForms';
import ChangePassword from './pages/settings/change-password/ChangePassword'
import NeedToConfigOkr from './screens/NeedToConfigOkr';
import ChangeUsername from './pages/settings/change-username/ChangeUsername';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window')


function SecondHome({ navigation }) {
  
  const storeUserId = async (value) => {
    try {
      await AsyncStorage.setItem('idUser', value)
    } catch (e) {
      // saving error
    }
  }
  const { idUser, setIdUser } = useContext(UserContext);
  const [ userData, setUserData ] = useState({});
  var db = firebase.firestore();
  useEffect(()=>{
    var docRef = db.collection("users").doc(idUser);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setUserData(doc.data());
        storeUserId(idUser);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, []);
  
  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.homeTitle}>Olá, {userData.name}</Text>
      <StatusBar style="auto" />
      <View>
        <UserProgressBarDay/>
        <UserProgressBarWeek/>
      </View>
      <View style={styles.mainButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('NewTask', {idUser: idUser})}>
          <HomeMainButtons buttonType="add-alarm" buttonTitle="Nova Tarefa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <HomeMainButtons buttonType="history" buttonTitle="Histórico" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FeedBack', {idUser: idUser})}>
          <HomeMainButtons buttonType="chat-bubble" buttonTitle="FeedBack!" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Bugs')}>
          <HomeMainButtons buttonType="bug-report" buttonTitle="Reportar Bug" />
        </TouchableOpacity>
      </View>
     
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();
export default function Home() {
  
  const { idUser, setIdUser } = useContext(UserContext);
  const [ userData, setUserData ] = useState({});
  var db = firebase.firestore();
  
  
  useEffect(()=>{
    var docRef = db.collection("users").doc(idUser);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setUserData(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, []);
  

  return (
    <Stack.Navigator>
      <Stack.Screen name="SecondHome" component={SecondHome} options={{ headerShown: false }}/>
      <Stack.Screen name="NewTask" component={NewTask} options={{ headerShown: false }} />
      <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
      <Stack.Screen name="ConfigOkr" component={ConfigOkr} options={{ headerShown: false }} />
      <Stack.Screen name="Bugs" component={Bugs} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="FeedBack" component={FeedBack} options={{ headerShown: false }} />
      <Stack.Screen name="NeedToConfigOkr" component={NeedToConfigOkr} options={{ headerShown: false }} />
      <Stack.Screen name="ChangeUsername" component={ChangeUsername} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#e9ebef',
  },
  homeTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#000a4c',
    marginTop: 20,
    marginLeft: 20
  },
  mainButtonsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap:'wrap',
    flex:1,
    alignItems:'center',
    alignContent:'center'
  },
  todayActivityTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#000a4c',
    marginLeft: 20,
    marginBottom: width * 0.05,
  }
});
