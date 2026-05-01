import React from 'react';

export function DeepSeekLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="#3B82F6" />
      <path d="M13.2 8.4h-3v7.2h3c2 0 3.6-1.6 3.6-3.6s-1.6-3.6-3.6-3.6zm-1.2 5.4h-0.6V10.2h0.6c1 0 1.8 0.8 1.8 1.8s-0.8 1.8-1.8 1.8z" fill="white" />
    </svg>
  );
}
