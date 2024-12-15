import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { produto } = route.params; // Recebe os dados do produto passado como parâmetro

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `http://192.168.1.182:3000/${produto.foto}` }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{produto.nome}</Text>
      <Text>{produto.descricao}</Text>
      <Text>Quantidade: {produto.quantidade}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, alignItems: 'center' },
  productImage: { width: 200, height: 200, marginBottom: 10 },
  productName: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default ProductDetailScreen;
