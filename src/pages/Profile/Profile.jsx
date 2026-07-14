import React from 'react';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="placeholder-page fade-in" style={styles.container}>
      <User size={48} color="var(--color-orange)" style={styles.icon} />
      <h1 style={styles.title}>Your Profile</h1>
      <p style={styles.desc}>Manage your account, change goals, and check achievements.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    textAlign: 'center',
    padding: '24px',
  },
  icon: {
    marginBottom: '16px',
    filter: 'drop-shadow(0 0 10px rgba(255, 152, 0, 0.3))',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--color-text-primary)',
    marginBottom: '8px',
  },
  desc: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    maxWidth: '280px',
    lineHeight: '1.4',
  }
};

export default Profile;
