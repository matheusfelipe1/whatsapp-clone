import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ChatListScreen } from '../screens/ChatListScreen/ChatListScreen';
import { ConversationScreen } from '../screens/ConversationScreen/ConversationScreen';
import { colors } from '../theme/colors';
import type { RootStackParamList } from './types';
import { RegisterUser } from '../screens/RegisterUser/RegisterUser';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.headerText,
        }}
      >
    <Stack.Screen 
        name="ChatList" 
        component={ChatListScreen} 
        options={({ navigation }) => ({ 
            title: 'Chats',
            headerRight: () => (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('RegisterUser');
                }}
            >
                <Text style={{ color: colors.headerText, fontSize: 32 }}>+</Text>
            </TouchableOpacity>
            ),
        })} 
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={({ route }) => ({ 
            title: route.params.chatName
           })}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{ title: 'Register User' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}