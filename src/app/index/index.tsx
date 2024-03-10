import { View, Text, ScrollView, Alert } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { Ingredient } from '@/components/Ingredient';
import { Selected } from '@/components/Selected';
import { router } from 'expo-router';
import { services } from '@/services';
import { Loading } from '@/components/Loading';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }
    setSelected((state) => [...state, value]);
  }

  function handleClearSelected() {
    Alert.alert('Limpar', 'Deseja limpar tudo?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          setSelected([]);
        },
      },
    ]);
  }

  function handleSearch() {
    router.navigate('/recipes/' + selected);
  }

  useEffect(() => {
    services.ingredients
      .findAll()
      .then(setIngredients)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {'\n'}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>Descubra receitas baseadas nos produtos que você escolheu.</Text>

      <ScrollView contentContainerStyle={styles.ingredients} showsVerticalScrollIndicator={false}>
        {ingredients.map((ingredient) => (
          <Ingredient
            name={ingredient.name}
            image={`${services.storage.imagePath}/${ingredient.image}`}
            onPress={() => handleToggleSelected(ingredient.id)}
            selected={selected.includes(ingredient.id)}
            key={ingredient.id}
          />
        ))}
      </ScrollView>
      {selected.length > 0 && <Selected onClear={handleClearSelected} onSearch={handleSearch} quantity={selected.length} />}
    </View>
  );
}
