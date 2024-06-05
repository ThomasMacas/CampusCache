import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from "../../firebase";
import { doc, setDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const EditCache = () => {
  const [title, setTitle] = useState('');
  const [hint, setHint] = useState('');
  const [hints, setHints] = useState([]);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [difficulty, setDifficulty] = useState(null);

  const handleHintAdd = () => {
    if (hint !== '') {
      setHints([...hints, hint]);
      setHint('');
    }
  }
    const handleSubmit = async () => {
        handleHintAdd;
        await setDoc(doc(db,'publicCache',title),{
            title: title,
            hints: hints,
            longitude: longitude,
            latitude: latitude,
            difficulty: difficulty,
            active: false,
        });
        setTitle('');
        setHint('');
        setHints([]);
        setLongitude('');
        setLatitude('');
        setDifficulty(null);
    }

  return (
    <ScrollView style = {styles.scroller}> 
        <View style={styles.container}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
        />
        <Text style={styles.label}>Hint:</Text>
        <View style={{ flexDirection: 'row' , paddingHorizontal: 40}}> 
            <TextInput
            style={[styles.input, { flex: 1 }]}
            value={hint}
            onChangeText={setHint}
            />
            <TouchableOpacity style={styles.hintAdd} onPress={handleHintAdd}>
                <Text style={styles.hintAddText}>+</Text>
            </TouchableOpacity>
        </View>
        {hints.map((h, i) => (
            <Text key={i} style={styles.hint}>Hint {i + 1}: {h}</Text>
        ))}
        <Text style={styles.label}>Longitude:</Text>
        <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={setLongitude}
        />
        <Text style={styles.label}>Latitude:</Text>
        <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={setLatitude}
        />
        <Text style={styles.label}>Difficulty (1-5):</Text>
            <TextInput
            style={styles.input}
            value={difficulty !== null ? difficulty.toString() : ''}
            keyboardType="numeric"
            onChangeText={(d) => {
                const num = parseInt(d);
                if (d === '' || (num >= 1 && num <= 5)) {
                setDifficulty(d === '' ? null : num);
                }
            }}
            />
            <View style={[styles.submit, { marginTop: 20 }]}>
                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit Form</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scroller: {
        marginBottom: 20,
    },

    container: {
      flex: 1,
      alignItems: 'center',
    },
    
    label: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 5,
      textAlign: 'center',
    },

    input: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      fontSize: 18,
      textAlign: 'center',
      borderRadius: 20,
    },
  
    hint: {
        fontSize: 16,
        fontStyle: 'italic',
        marginVertical: 5,
        marginStart: 15,
        marginEnd: 15,
        width: '20%'
      },
  
    submit: {
      backgroundColor: '#44bd5a',
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    
    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
    },
  
    hintAdd: {
      backgroundColor: '#44bd5a',
      borderRadius: 20,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
    },
  
    hintAddText: {
      color: 'white',
      fontSize: 24,
    },
  
  });  

export default EditCache;
