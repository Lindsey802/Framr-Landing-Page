type FramrLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export const FramrLogo = ({ className = '', size = 32 }: FramrLogoProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    aria-label="Framr"
    role="img"
    className={className}
  >
    <path d="M5 3h14v3H8v5h9v3H8v7H5z" fill="currentColor" />
  </svg>
);
