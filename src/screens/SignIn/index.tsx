import { useState } from 'react';
import { ActivityIndicator, Alert, Platform, Button } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const { signInWithGoogle, signInWithApple } = useAuth();

    const theme = useTheme();

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true);

            return await signInWithGoogle();

        } catch (error) {

            Alert.alert('Não foi possível conectar a conta Google');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSignInWithApple() {

        try {
            setIsLoading(true);

            return await signInWithApple();

        } catch (error) {

            Alert.alert('Não foi possível conectar a conta Apple');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                    <SignInTitle>
                        Faça seu login com {'\n'}
                        uma das contas abaixo
                    </SignInTitle>
                </TitleWrapper>
            </Header>

            <Footer>
                <FooterWrapper>
                    <Button title="Google" onPress={handleSignInWithGoogle} />
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {Platform.OS === 'ios' &&
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    }
                </FooterWrapper>

                {isLoading &&
                    <ActivityIndicator
                        color={theme.colors.shape}
                        style={{ marginTop: 18 }}
                    />
                }
            </Footer>
        </Container>
    );
}