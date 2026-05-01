import React, { useState } from 'react';

type LogoProps = {
  className?: string;
  height?: number;
  href?: string;
  invert?: boolean;
};

export const Logo = ({ className = "", height = 32, href = "/", invert = false }: LogoProps) => {
  const [failed, setFailed] = useState(false);

  const img = failed ? (
    <span className={`text-xl font-bold tracking-tight ${invert ? 'text-white' : 'text-black'} ${className}`}>
      Framr
    </span>
  ) : (
    <img
      src="/framr-logo.png"
      alt="Framr"
      style={{ height: `${height}px`, width: "auto" }}
      className={`object-contain select-none ${invert ? 'brightness-0 invert' : ''} ${className}`}
      onError={() => setFailed(true)}
      draggable={false}
      referrerPolicy="no-referrer"
    />
  );
  
  if (href) {
    return (
      <a href={href} className="flex items-center">
        {img}
      </a>
    );
  }
  
  return img;
};
