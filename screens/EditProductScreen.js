import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const EditProductScreen = ({ route, navigation }) => {
  const { produto } = route.params; // Recebe o produto a ser editado
  const [nome, setNome] = useState(produto.nome);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [quantidade, setQuantidade] = useState(String(produto.quantidade));
  const [foto, setFoto] = useState(produto.foto ? `http://192.168.1.182:3000/${produto.foto}` : null);
  const [novaFoto, setNovaFoto] = useState(null); // Armazena uma nova foto, se adicionada

  const pickImage = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
      Alert.alert('Erro', 'É necessário permitir o acesso à câmera e galeria.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNovaFoto(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('quantidade', quantidade);

    if (novaFoto) {
      formData.append('foto', {
        uri: novaFoto,
        type: 'image/jpeg',
        name: 'produto-editado.jpg',
      });
    }

    try {
      await axios.put(`http://192.168.1.182:3000/produtos/${produto.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      navigation.navigate('Home'); // Retorna à tela inicial
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o produto. Tente novamente.');
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
      {novaFoto ? (
        <Image source={{ uri: novaFoto }} style={styles.image} />
      ) : (
        foto && <Image source={{ uri: foto }} style={styles.image} />
      )}
      <Button title="Tirar Nova Foto" onPress={pickImage} />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  image: { width: 100, height: 100, marginBottom: 10 },
});

export default EditProductScreen;
