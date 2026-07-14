import React from 'react';
import { ClipboardList } from 'lucide-react';

const Log = () => {
  return (
    <div className="placeholder-page fade-in" style={styles.container}>
      <ClipboardList size={48} color="var(--color-purple)" style={styles.icon} />
      <h1 style={styles.title}>Daily Log</h1>
      <p style={styles.desc}>Keep track of your exercises, diet, and habits here.</p>
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
    filter: 'drop-shadow(0 0 10px rgba(123, 31, 162, 0.3))',
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

export default Log;
