import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, colorsArray } from '../../theme/colors';
import { RouteProp, useRoute } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRegisterUserViewModel } from '../../viewmodels/useRegisterUserViewModel';


export function RegisterUser(): React.JSX.Element {

    const { userName, onChangeText, colorSelect, onChangeColor, onRegisterUser, isLoading } = useRegisterUserViewModel();


    return <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <Text style={styles.title}>Informe o nome do contato:</Text>
        <TextInput
            value={userName}
            onChangeText={onChangeText}
            placeholder="Ex.: John Doe"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            multiline
        />
        <Text style={styles.title}>Escolha a cor do contato:</Text>
        <FlatList
            data={Array.from(colorsArray)}
            keyExtractor={(item) => item}
            numColumns={4} // Define a quantidade de colunas do grid
            columnWrapperStyle={{ gap: 10, marginBottom: 10 }} // Espaçamento entre colunas e linhas
            contentContainerStyle={{ padding: 16 }} // Padding ao redor de todo o grid
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onChangeColor(item)}>
                    <View
                        style={{
                            flex: 1, // Faz os itens dividirem a largura da tela igualmente
                            backgroundColor: item,
                            height: 60,
                            borderRadius: 8,
                            borderWidth: 2,
                            borderColor: colorSelect === item ? colors.primary : 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <Text style={{
                            color: '#FFF', fontWeight: 'bold', shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 5,
                        }}>{item}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
        <TouchableOpacity onPress={onRegisterUser}>

            <View style={styles.registerButton}>
                {isLoading ? (
                    <ActivityIndicator color={colors.bubbleIncoming} />
                ) : (
                    <Text style={styles.title2}>Cadastrar</Text>
                )}
            </View>
        </TouchableOpacity>
    </SafeAreaView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
        paddingBottom: 16,
    },
    input: {
        flex: 1,
        maxHeight: 40,
        minHeight: 40,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: colors.textPrimary,
        marginHorizontal: 16,
        marginVertical: 16,
        borderColor: colors.primary,
        borderWidth: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
        flexShrink: 1,
        marginHorizontal: 16,
        marginTop: 16,
    },
    registerButton: {
        backgroundColor: colors.primary,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 16,
    },
    title2: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.bubbleIncoming,
        flexShrink: 1,
        marginHorizontal: 16,
    },
});