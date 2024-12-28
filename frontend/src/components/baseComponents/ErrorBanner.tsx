import React from 'react';

interface ErrorBannerProps {
  message: string | null;
}

const ErrorBanner = ({ message }: ErrorBannerProps) => {
  if (!message) return null;

  return (
    <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>
      {message}
    </div>
  );
};

export default ErrorBanner;
