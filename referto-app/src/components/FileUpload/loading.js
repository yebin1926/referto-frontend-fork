import React from 'react';
import { FadeLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div style={styles.overlay}>
      <FadeLoader color="#ffffff" />
      <div style={styles.text}>
        <h3>pdf를 분석하고 있어요</h3>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  text: {
    marginTop: '20px',
    color: '#fff',
    fontWeight: '700',
  },
};

export default Loading;
