import { FramrLogo } from './brand/FramrLogo';

type LogoProps = {
  size?: number;
  variant?: 'black' | 'white';
  className?: string;
  alt?: string;
  priority?: boolean;
};

export const Logo = ({ size = 24, variant = 'black', className = '', alt = 'Framr' }: LogoProps) => (
  <span className={`inline-flex items-center justify-center ${variant === 'white' ? 'text-white' : 'text-black'} ${className}`} aria-label={alt}>
    <FramrLogo size={size} className={variant === 'white' ? '[&>path]:fill-white' : '[&>path]:fill-black'} />
  </span>
);
