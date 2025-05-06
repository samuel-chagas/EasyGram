import React, { useReducer } from "react";
import {
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    SafeAreaView
} from "react-native";

type Action = 
    | { type: 'SET_INPUT'; field: string; value: string; }
    | { type: 'SUBMIT'; }
    | { type: 'SUCCESS'; }
    | { type: 'RESET'; };

const initialState: FormState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
    isSubmitted: false,
    showPassword: false
};

type FormState = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    isLoading: boolean;
    isSubmitted: boolean;
    showPassword: boolean;
};

function formReducer(state: FormState, action: Action) {
    switch (action.type) {
        case 'SET_INPUT':
            return { ...state, [action.field]: action.value };
        case 'SUBMIT':
            return { ...state, isLoading: true };
        case 'SUCCESS':
            return { ...state, isSubmitted: true, isLoading: false };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const CreateAccountScreen: React.FC = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, fieldName: string) => {
        dispatch({
            type: 'SET_INPUT',
            field: fieldName,
            value: event.nativeEvent.text
        });
    };

    const validateForm = () => {
        if (!state.name || !state.email || !state.password || !state.confirmPassword) {
            alert("Todos os campos são obrigatórios.");
            return false;
        }
        if (state.password !== state.confirmPassword) {
            alert("As senhas não coincidem.");
            return false;
        }
        return true;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/logo.png')} // Ajuste o caminho conforme necessário
                    style={styles.logoImage}
                />
            </View>

            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.instruction}>
                Preencha os campos abaixo para criar sua conta.
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={state.email}
                    onChange={(event) => handleChange(event, 'email')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    value={state.name}
                    onChange={(event) => handleChange(event, 'name')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    value={state.password}
                    onChange={(event) => handleChange(event, 'password')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    value={state.confirmPassword}
                    onChange={(event) => handleChange(event, 'confirmPassword')}
                />
                {state.isLoading && <ActivityIndicator size="large" color="#0D7875" />}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (validateForm()) {
                            dispatch({ type: 'SUBMIT' });
                            setTimeout(() => dispatch({ type: 'SUCCESS' }), 2000);
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 48,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    logoImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 30,
        color: '#333',
        textAlign: 'center',
    },
    instruction: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    inputContainer: {
        marginTop: 24,
    },
    input: {
        backgroundColor: '#F5F5F5',
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        marginBottom: 16,
        color: '#333',
    },
    button: {
        marginTop: 32,
        backgroundColor: '#0D7875',
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CreateAccountScreen;