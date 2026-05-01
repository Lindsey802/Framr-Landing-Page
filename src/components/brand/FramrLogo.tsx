type FramrLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export const FramrLogo = ({ className = '', size = 32 }: FramrLogoProps) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    aria-label="Framr"
    role="img"
    className={className}
  >
    <path d="M18 18H82V44L56 44L82 82H56L30 44H18Z" fill="#050505" />
    <path d="M18 56H44V82H18Z" fill="#050505" />
  </svg>
);
