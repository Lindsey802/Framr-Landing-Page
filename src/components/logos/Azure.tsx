import React from 'react';

export function AzureLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 3L2 19H7.5L12 11.5L16.5 19H22L12 3Z" fill="#0078D4" />
    </svg>
  );
}
