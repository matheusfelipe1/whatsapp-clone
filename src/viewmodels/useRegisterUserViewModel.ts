import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useCreateUserChatMutation } from '../data/queries/useCreateUserCharMutation';

export type RegisterUserRouteProp = NativeStackNavigationProp<RootStackParamList, 'RegisterUser'>;


export function useRegisterUserViewModel() {

    const { data: newChat, mutate: createUserChat } = useCreateUserChatMutation();
    const [userName, setUserName] = useState<string>('');
    const [colorSelect, setColorSelect] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function onChangeText(text: string): void {
        setUserName(text);
    }

    function onChangeColor(color: string): void {
        setColorSelect(color);
    }

    async function onRegisterUser(): Promise<void> {
        setIsLoading(true);

        createUserChat({ userName, avatarColor: colorSelect! });
        
        setIsLoading(false);
    }

    return {
        userName,
        onChangeText,
        colorSelect,
        onChangeColor,
        onRegisterUser,
        isLoading,
    };
}