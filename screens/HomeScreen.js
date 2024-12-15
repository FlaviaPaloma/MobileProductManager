import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://192.168.1.182:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const deleteProduto = async (id) => {
    try {
      await axios.delete(`http://192.168.1.182:3000/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim, excluir", onPress: () => deleteProduto(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: `http://192.168.1.182:3000/${item.foto}` }} style={styles.productImage} />
      <Text style={styles.productName}>{item.nome}</Text>
      <Text>{item.descricao}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => navigation.navigate('EditProduct', { produto: item })} />
        <Button title="Deletar" color="red" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct')} />
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  productContainer: { padding: 10, borderBottomWidth: 1 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productImage: { width: 100, height: 100, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default HomeScreen;
