import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, Modal } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AddProductScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false); // Modal para erro de preenchimento

  const pickImage = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!cameraPermission.granted) {
      alert('É necessário permitir o acesso à câmera!');
      return;
    }

    if (!mediaLibraryPermission.granted) {
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
    if (!nome || !descricao || !quantidade) {
      setErrorModalVisible(true); // Exibe modal de erro
      return;
    }

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
      await axios.post('http://192.168.1.182:3000/produtos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Mostrar modal de sucesso
      setSuccessModalVisible(true);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      setErrorModalVisible(true); // Exibe modal de erro caso falhe
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Home');
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>
      <TextInput
        placeholder="Nome do Produto"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#aaa"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        placeholderTextColor="#aaa"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />
      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>Tirar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      {/* Modal para exibir alerta de sucesso */}
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sucesso!</Text>
            <Text style={styles.modalMessage}>Produto cadastrado com sucesso!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeSuccessModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para exibir alerta de erro (campo vazio) */}
      <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeErrorModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.errorTitle}>Erro!</Text>
            <Text style={styles.modalMessage}>Por favor, preencha todos os campos</Text>
            <TouchableOpacity style={styles.errorButton} onPress={closeErrorModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  photoButton: {
    backgroundColor: '#6666ff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#00cc66',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00cc66',
    marginBottom: 10,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff3333', // Cor para título de erro
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6666ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  errorButton: {
    backgroundColor: '#ff3333', // Botão de erro em vermelho
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default AddProductScreen;
