import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/Button';
import { theme, getTheme } from '@/constants/theme';
import Icon from '@/assets/icons';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useTheme } from '@/context/ThemeContext';

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const { theme, isDark, setTheme } = useTheme();
  const currentTheme = getTheme(isDark);

  const handleThemeChange = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const getThemeText = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      default:
        return 'System Theme';
    }
  };

  if (loading || !user) {
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: currentTheme.colors.primary }]}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: `https://ui-avatars.com/api/?name=${user.name}&background=random` }}
              style={styles.avatar}
            />
          </View>
          <Text style={[styles.name, { color: currentTheme.colors.textDark }]}>{user.name}</Text>
          <Text style={[styles.email, { color: currentTheme.colors.textDark }]}>{user.email}</Text>
        </View>

        <View style={[styles.section, { borderBottomColor: currentTheme.colors.gray }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>Account Settings</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="mail" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="lock" size={24} color={currentTheme.colors.text} />
            <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { borderBottomColor: currentTheme.colors.gray }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.text }]}>App Settings</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleThemeChange}
          >
            <Icon 
              name={isDark ? "moon" : "sun"} 
              size={24} 
              color={currentTheme.colors.text}
            />
            <View style={styles.themeTextContainer}>
              <Text style={[styles.menuText, { color: currentTheme.colors.text }]}>Theme</Text>
              <Text style={[styles.themeSubtext, { color: currentTheme.colors.textLight }]}>
                {getThemeText()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Button 
          title="Logout" 
          onPress={logout}
          style={styles.logoutButton}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
  },
  themeTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  themeSubtext: {
    fontSize: 14,
    marginTop: 2,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
}); 