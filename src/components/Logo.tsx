import Image from 'next/image';

type LogoProps = {
  size?: number;
  variant?: 'black' | 'white';
  className?: string;
  alt?: string;
  priority?: boolean;
};

export const Logo = ({ size = 24, variant = 'black', className = '', alt = 'Framr', priority = false }: LogoProps) => {
  const src = variant === 'white' ? '/logo-white.png' : '/logo.png';

  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={alt}
      priority={priority}
      className={`object-contain ${className}`}
      style={{ imageRendering: 'auto' }}
    />
  );
};
