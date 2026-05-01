import { useState } from "react";

type FramrLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

const FALLBACKS = ['/logo/framr-logo.png', '/framr-logo.png', '/logo.png'];

export const FramrLogo = ({ className = '', size = 32 }: FramrLogoProps) => {
  const [idx, setIdx] = useState(0);

  return (
    <img
      src={FALLBACKS[idx]}
      alt="Framr"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ imageRendering: 'auto' }}
      loading="eager"
      decoding="async"
      draggable={false}
      onError={() => setIdx((v) => Math.min(v + 1, FALLBACKS.length - 1))}
    />
  );
};
