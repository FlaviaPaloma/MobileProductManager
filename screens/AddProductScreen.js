import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AddProductScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState(null);

  const pickImage = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraPermission.granted === false) {
      alert('É necessário permitir o acesso à câmera!');
      return;
    }

    if (mediaLibraryPermission.granted === false) {
      alert('É necessário permitir o acesso à galeria de mídia!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('quantidade', quantidade);
    if (foto) {
      formData.append('foto', {
        uri: foto,
        type: 'image/jpeg',
        name: 'produto.jpg',
      });
    }

    try {
      const response = await axios.post('http://192.168.1.182:3000/produtos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Exibir alerta de sucesso
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');

      // Passar o novo produto para a HomeScreen
      navigation.navigate('Home', { newProduct: response.data });

    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o produto. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        keyboardType="numeric"
      />
      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <Button title="Tirar Foto" onPress={pickImage} />
      <Button title="Adicionar Produto" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  image: { width: 100, height: 100, marginBottom: 10 },
});

export default AddProductScreen;
