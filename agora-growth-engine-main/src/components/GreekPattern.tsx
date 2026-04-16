import React from 'react';

interface GreekPatternProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  color?: string;
  opacity?: number;
}

const GreekPattern: React.FC<GreekPatternProps> = ({ 
  className = "", 
  variant = 'horizontal', 
  color = "currentColor", 
  opacity = 0.2 
}) => {
  return (
    <div 
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg 
        width="100%" 
        height={variant === 'horizontal' ? "12" : "100%"} 
        viewBox={variant === 'horizontal' ? "0 0 100 12" : "0 0 12 100"}
        preserveAspectRatio="none"
      >
        <pattern 
          id="greek-meander" 
          x="0" 
          y="0" 
          width={variant === 'horizontal' ? "24" : "100%"} 
          height={variant === 'horizontal' ? "100%" : "24"} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d={variant === 'horizontal' 
              ? "M0 6h4v-4h4v8h-8v-2h6v-4h-4v2" 
              : "M6 0v4h-4v4h8v-8h-2v6h-4v-4h2"
            }
            fill="none" 
            stroke={color} 
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#greek-meander)" />
      </svg>
    </div>
  );
};

export default GreekPattern;
