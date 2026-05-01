import React from 'react';

export function MetaLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        d="M20.5 16.5C18.5 16.5 16.5 14.5 14.5 12C12.5 9.5 10.5 7.5 8.5 7.5C6.5 7.5 4.5 9.5 4.5 12C4.5 14.5 6.5 16.5 8.5 16.5C10.5 16.5 12.5 14.5 14.5 12C16.5 9.5 18.5 7.5 20.5 7.5C22.5 7.5 24.5 9.5 24.5 12C24.5 14.5 22.5 16.5 20.5 16.5Z" 
        stroke="#0668E1" 
        strokeWidth="1.5" 
      />
    </svg>
  );
}
