// app/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  runOnJS,
  withDelay
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function EntryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Estado para controlar se estamos no momento do "respiro" inicial
  const [isSplash, setIsSplash] = useState(true);

  // Valores animados
  const splashOpacity = useSharedValue(0);
  const panelTranslateY = useSharedValue(height / 2); // Começa escondido abaixo da tela
  const panelOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Fade-in suave do logo/texto inicial
    splashOpacity.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) });

    // 2. Aguarda um momento (respiro), faz fade-out do logo e sobe o painel
    setTimeout(() => {
      splashOpacity.value = withTiming(0, { duration: 1000 }, (finished) => {
        if (finished) {
          runOnJS(setIsSplash)(false);
          
          // Animação editorial suave para o painel subir
          panelOpacity.value = withTiming(1, { duration: 600 });
          panelTranslateY.value = withTiming(0, { 
            duration: 800, 
            // Curva de bezier editorial (smooth) definida no design system
            easing: Easing.bezier(0.2, 0.9, 0.4, 1.1) 
          });
        }
      });
    }, 2500);
  }, []);

  // Estilos animados
  const animatedSplashStyle = useAnimatedStyle(() => ({
    opacity: splashOpacity.value,
  }));

  const animatedPanelStyle = useAnimatedStyle(() => ({
    opacity: panelOpacity.value,
    transform: [{ translateY: panelTranslateY.value }],
  }));

  return (
    <View className="flex-1 bg-bg-primary">
      {/* Camada do Splash (Loading Emocional) */}
      {isSplash && (
        <Animated.View 
          className="absolute inset-0 items-center justify-center"
          style={animatedSplashStyle}
        >
          <Text className="font-serif text-4xl text-text-primary tracking-widest">
            NÓS.
          </Text>
        </Animated.View>
      )}

      {/* Camada Interativa (Painel da Imagem) */}
      {!isSplash && (
        <View className="flex-1 justify-end">
          <Animated.View 
            className="w-full bg-core-forest rounded-t-[40px] px-8 pt-10"
            style={[
              animatedPanelStyle,
              { paddingBottom: Math.max(insets.bottom + 24, 48) } // Respeita a safe area do iOS
            ]}
          >
            {/* Botão: entrar */}
            <Pressable 
              onPress={() => router.push('/(auth)/login')}
              className="w-full h-14 bg-bg-primary rounded-full items-center justify-center mb-4 active:opacity-80 transition-opacity"
            >
              <Text className="font-sans font-semibold text-core-forest text-base lowercase">
                entrar
              </Text>
            </Pressable>

            {/* Botão: criar conta */}
            <Pressable 
              onPress={() => router.push('/(auth)/register')}
              className="w-full h-14 bg-bg-primary rounded-full items-center justify-center active:opacity-80 transition-opacity"
            >
              <Text className="font-sans font-semibold text-core-forest text-base lowercase">
                criar conta
              </Text>
            </Pressable>

            {/* Divisor: Mais opções */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-bg-primary/10" />
              <Text className="mx-4 font-sans text-sm text-bg-primary/60">
                Mais opções
              </Text>
              <View className="flex-1 h-[1px] bg-bg-primary/10" />
            </View>

            {/* Botão: central de ajuda */}
            <Pressable 
              className="w-full h-14 border border-bg-primary rounded-full items-center justify-center active:opacity-80 transition-opacity"
            >
              <Text className="font-sans font-semibold text-bg-primary text-base lowercase">
                central de ajuda
              </Text>
            </Pressable>

          </Animated.View>
        </View>
      )}
    </View>
  );
}