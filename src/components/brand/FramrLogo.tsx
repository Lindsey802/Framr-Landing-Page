type FramrLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export const FramrLogo = ({ className = '', size = 32 }: FramrLogoProps) => (
  <svg
    viewBox="0 0 128 128"
    width={size}
    height={size}
    aria-label="Framr"
    role="img"
    className={className}
  >
    <defs>
      <linearGradient id="framrTop" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#141414" />
        <stop offset="100%" stopColor="#040404" />
      </linearGradient>
      <linearGradient id="framrBottom" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#111111" />
        <stop offset="100%" stopColor="#050505" />
      </linearGradient>
    </defs>

    <polygon points="14,14 114,14 114,56 62,56" fill="url(#framrTop)" />
    <polygon points="14,58 66,58 114,114 62,114" fill="url(#framrBottom)" />
    <line x1="14" y1="14" x2="62" y2="56" stroke="#262626" strokeWidth="1.5" />
    <line x1="66" y1="58" x2="114" y2="114" stroke="#262626" strokeWidth="1.5" />
  </svg>
);
