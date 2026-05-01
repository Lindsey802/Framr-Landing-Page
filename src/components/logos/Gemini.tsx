import React from 'react';

export function GeminiLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C12 2 12 10 3 12C3 12 12 14 12 22C12 22 12 14 21 12C21 12 12 10 12 2Z" fill="url(#gemini-gradient)" />
      <defs>
        <linearGradient id="gemini-gradient" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4D8CFF" />
          <stop offset="1" stopColor="#87CEFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
