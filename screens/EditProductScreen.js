import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text, Modal } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const EditProductScreen = ({ route, navigation }) => {
  const { produto } = route.params; // Recebe o produto a ser editado
  const [nome, setNome] = useState(produto.nome);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [quantidade, setQuantidade] = useState(String(produto.quantidade));
  const [foto, setFoto] = useState(produto.foto ? `http://192.168.1.182:3000/${produto.foto}` : null);
  const [novaFoto, setNovaFoto] = useState(null); // Armazena uma nova foto, se adicionada
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const pickImage = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
      alert('É necessário permitir o acesso à câmera e galeria!');
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

      // Mostrar modal de sucesso
      setSuccessModalVisible(true);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar o produto. Tente novamente.');
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar</Text>
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
      {novaFoto ? (
        <Image source={{ uri: novaFoto }} style={styles.image} />
      ) : (
        foto && <Image source={{ uri: foto }} style={styles.image} />
      )}
      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>Tirar Nova Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
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
            <Text style={styles.modalMessage}>Produto atualizado com sucesso!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeSuccessModal}>
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
  saveButton: {
    backgroundColor: '#00cc66',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  saveButtonText: {
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
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default EditProductScreen;
