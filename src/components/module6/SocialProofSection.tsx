import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SocialProofData } from '../../types/module6';

interface SocialProofSectionProps {
  socialProof?: SocialProofData;
  text?: string;
  avatars?: any[];
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  socialProof,
  text,
  avatars,
}) => {
  const displayText = text || socialProof?.text || 'The choice of millions of learners worldwide.';
  const displayAvatars = avatars || socialProof?.avatars || [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  ];

  return (
    <View style={styles.container}>
      {/* Cụm avatar người dùng xếp chồng */}
      <View style={styles.avatarsRow}>
        {displayAvatars.map((item, idx) => {
          const source = typeof item === 'string' ? { uri: item } : (item.uri ? { uri: item.uri } : item);
          return (
            <Image
              key={idx}
              source={source}
              style={[styles.avatarImg, { marginLeft: idx > 0 ? -10 : 0 }]}
            />
          );
        })}
        <View style={[styles.avatarMore, { marginLeft: -10 }]}>
          <Text style={styles.avatarMoreText}>+2M</Text>
        </View>
      </View>

      {/* Dòng chữ Social proof */}
      <View style={styles.textContainer}>
        <Text style={styles.socialText}>{displayText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginTop: 24,
    gap: 12,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#CBD5E1',
  },
  avatarMore: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMoreText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  textContainer: {
    flex: 1,
  },
  socialText: {
    color: '#475569',
    fontSize: 13.5,
    fontWeight: '600',
    lineHeight: 18,
  },
});
