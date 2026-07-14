import React from 'react';
import { BarChart2 } from 'lucide-react';

const Progress = () => {
  return (
    <div className="placeholder-page fade-in" style={styles.container}>
      <BarChart2 size={48} color="var(--color-green)" style={styles.icon} />
      <h1 style={styles.title}>Your Progress</h1>
      <p style={styles.desc}>Analyze your performance trends and consistency scores over time.</p>
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
    filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.3))',
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

export default Progress;
