type FramrLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export const FramrLogo = ({ className = '', size = 32 }: FramrLogoProps) => (
  <img
    src="/logo/framr-logo.png"
    alt="Framr"
    width={size}
    height={size}
    className={`object-contain ${className}`}
    style={{ imageRendering: 'auto' }}
    loading="eager"
    decoding="async"
    draggable={false}
  />
);
