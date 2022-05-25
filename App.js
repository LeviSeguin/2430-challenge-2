'use strict';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


class Portfolio {
  constructor(firstName, lastName, about) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.about = about;
  }
}
const portfolioArr = [];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <View style={{ paddingBottom: 20 }}>
        <Text style={styles.headerText}>Portfolio Builder</Text>
      </View>
      <View style={{ width: '90%', }}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Saved Portfolios')}
        >
          <Text style={styles.buttonText}>Saved Portfolios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('New Portfolio')}
        >
          <Text style={styles.buttonText}>New Portfolio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PortfolioScreen({ route, navigation}) {
  const {firstName, lastName, about} = route.params;
  return (
    <View style={styles.portfolioContainer}>

        <View>
          <Text style={styles.nameText}>{firstName} {lastName}</Text>
        </View>
        

      <Text style = {styles.aboutText}>{about}</Text>
    </View>
  )
}

function SavedScreen({ navigation }) {

  const [state, setState] = useState(false);

  const deleteSelectedElement = (id) => {
    portfolioArr.splice(id, 1);
    setState(!state);
  }

  const RenderItem = ({ id, fName, lName, about }) => (
    <View style={{ padding: 10 }}>
      <Text style={styles.listItem}
        onLongPress={() => deleteSelectedElement(id)} 
        onPress={() => navigation.navigate('Portfolio', {firstName: fName, lastName: lName, about: about,})}
      >
        {fName} {lName}
      </Text>
    </View>
  );

  return (
    <View style={styles.savedContainer}>
      <View>
        <FlatList
          data={portfolioArr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <RenderItem id={index} fName={item.firstName} lName={item.lastName} about={item.about}/>} 

          extraData={state}
        />

      </View>
    </View>
  );
}

function NewPortfolioScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [about, setAbout] = useState('');

  return (
    <View style={styles.newContainer}>
      <View style={{flexDirection: "row", justifyContent: "space-evenly",}}>
        <TextInput 
          style={styles.input} 
          placeholder="First Name" 
          onChangeText={newText => setFirstName(newText)}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Last Name" 
          onChangeText={newText => setLastName(newText)}
          />
      </View>

      <TextInput 
        style={styles.bigInput} 
        placeholder="Write about yourself" 
        onChangeText={newText => setAbout(newText)}
        multiline={true} 
        />
      <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            if (firstName !== '' && lastName !== '' && about !== '') {
              var portfolio = new Portfolio(firstName, lastName, about);
              portfolioArr.push(portfolio);
              Alert.alert("Success", "Portfolio successfully added.")
            }
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Saved Portfolios" component={SavedScreen} />
        <Stack.Screen name="New Portfolio" component={NewPortfolioScreen} />
        <Stack.Screen name="Portfolio" component={PortfolioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  portfolioContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  savedContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: "stretch"
  },

  newContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: "center"
  },

  headerText: {
    fontSize: 40,
    padding: 10,
  },

  buttonText: {
    fontSize: 20,
  },

  homeButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 30,
    margin: 10,
  },

  listItem: {
    backgroundColor: "gray",
    fontSize: 20,
    color: "white",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  },

  input: {
    padding:3,
    margin: 10,
    borderColor: "#000",
    borderWidth: 1,
    width: 140
  },

  bigInput: {
    padding:3,
    borderColor: "#000",
    borderWidth: 1,
    height: 100,
    width: 300
  },

  nameText: {
    fontSize: 50,
  },

  aboutText: {
    fontSize: 30
  }

});
