import React, { useState } from 'react';
import { Sparkles, User, Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackType?: 'avatar' | 'portfolio' | 'banner';
  categoryLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackType = 'portfolio',
  categoryLabel,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    if (fallbackType === 'avatar') {
      return (
        <div
          className={`flex items-center justify-center bg-gradient-to-tr from-[#7C4DFF]/30 to-[#9D7BFF]/20 text-white font-bold select-none ${className}`}
          title={alt}
        >
          {alt ? (
            <span className="text-xs uppercase">{alt.slice(0, 2)}</span>
          ) : (
            <User className="w-1/2 h-1/2 text-[#B9B3D0]" />
          )}
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#17132E] via-[#0B081D] to-[#17132E] border border-[#2A2453] p-4 text-center select-none relative overflow-hidden ${className}`}
      >
        <div className="w-10 h-10 rounded-xl bg-[#7C4DFF]/15 border border-[#7C4DFF]/30 flex items-center justify-center mb-1.5">
          <ImageIcon className="w-5 h-5 text-[#9D7BFF]" />
        </div>
        <span className="text-[11px] font-semibold text-white/90 truncate max-w-[90%]">
          {categoryLabel || alt || 'AI Creative Asset'}
        </span>
        <span className="text-[9px] text-[#B9B3D0] uppercase tracking-wider mt-0.5">
          Verified AI Deliverable
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#17132E] animate-pulse flex items-center justify-center z-10">
          <Sparkles className="w-4 h-4 text-[#7C4DFF]/40 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
