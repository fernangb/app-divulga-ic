import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, AvatarImage } from './styles';

interface AvatarProps {
  avatar_url: string;
}

const CardAvatar: React.FC<AvatarProps> = ({ avatar_url }) => {
  if (!avatar_url) {
    return (
      <Container>
        <Icon name="account-circle" size={48} color="#f76769" />
      </Container>
    );
  }

  return (
    <Container>
      <AvatarImage
        source={{
          uri: avatar_url,
        }}
      />
    </Container>
  );
};

export default CardAvatar;
