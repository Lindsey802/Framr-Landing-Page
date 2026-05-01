type LogoProps = {
  size?: number;
  variant?: 'black' | 'white';
  className?: string;
  alt?: string;
  priority?: boolean;
};

export const Logo = ({ size = 24, variant = 'black', className = '', alt = 'Framr' }: LogoProps) => {
  const src = variant === 'white' ? '/logo-white.png' : '/logo.png';

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={alt}
      className={`object-contain ${className}`}
      style={{ imageRendering: 'auto' }}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );
};
