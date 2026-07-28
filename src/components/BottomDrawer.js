import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Box,
  Bot,
  Zap,
  Globe,
  Circle,
  Triangle,
  Hexagon,
  User,
  Shield,
  Cpu,
  Heart,
  Flame,
  Feather,
  Armchair,
} from 'lucide-react-native';
import { CATEGORIES, OBJECT_LIBRARY } from '../constants/objectLibrary';
import { COLORS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

const ICON_MAP = {
  Armchair,
  Box,
  Globe,
  Circle,
  Triangle,
  Hexagon,
  Bot,
  User,
  Shield,
  Cpu,
  Flame,
  Heart,
  Zap,
  Feather,
};

export default function BottomDrawer({ selectedObjId, onSelectObject }) {
  const [activeCategory, setActiveCategory] = useState('animals');

  const filteredObjects = OBJECT_LIBRARY.filter(
    (item) => item.category === activeCategory
  );

  const handleCategoryPress = (catId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveCategory(catId);
  };

  const handleObjectPress = (obj) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelectObject(obj);
  };

  return (
    <View style={styles.container}>
      {/* Category Tabs: Animals | Aerospace | Robotics | Architecture */}
      <View style={styles.tabBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
          nestedScrollEnabled={true}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const CatIcon = ICON_MAP[cat.icon] || Box;

            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.tabButton,
                  isActive && styles.tabButtonActive,
                ]}
                onPress={() => handleCategoryPress(cat.id)}
                activeOpacity={0.8}
              >
                <CatIcon
                  size={16}
                  color={isActive ? COLORS.primary : COLORS.textSecondary}
                />
                <Text
                  style={[
                    styles.tabText,
                    isActive && styles.tabTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Object Library Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        {filteredObjects.map((item) => {
          const isSelected = selectedObjId === item.id;
          const ItemIcon = ICON_MAP[item.icon] || Box;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                isSelected && styles.cardSelected,
              ]}
              onPress={() => handleObjectPress(item)}
              activeOpacity={0.8}
            >
              {/* Glowing Icon Container */}
              <View
                style={[
                  styles.iconBox,
                  { borderColor: item.color || COLORS.primary },
                  isSelected && {
                    backgroundColor: 'rgba(0, 240, 255, 0.2)',
                  },
                ]}
              >
                <ItemIcon
                  size={26}
                  color={isSelected ? COLORS.primary : item.color || COLORS.white}
                />
              </View>

              <Text
                style={[
                  styles.cardTitle,
                  isSelected && styles.cardTitleSelected,
                ]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const BOTTOM_SAFE_PADDING = Platform.OS === 'ios' ? 28 : 16;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 15, 30, 0.85)',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
    paddingTop: 14,
    paddingBottom: BOTTOM_SAFE_PADDING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
    zIndex: 100,
  },
  tabBarWrapper: {
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(0, 240, 255, 0.2)',
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 4,
  },
  card: {
    width: 104,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardSelected: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    marginBottom: 8,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  cardTitleSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
