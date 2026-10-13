import React, { useState } from 'react';
import { Sparkles, Palette, Check, Sun, Moon, Zap, Flame, Compass } from 'lucide-react';

export type BackgroundTheme = 'nebula' | 'cyber' | 'solaris' | 'emerald';

interface BackgroundDecorationsProps {
  theme: BackgroundTheme;
  onThemeChange: (theme: BackgroundTheme) => void;
}

export const THEME_OPTIONS: {
  id: BackgroundTheme;
  name: string;
  subtitle: string;
  accentColors: [string, string, string];
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'nebula',
    name: 'Nebula Violet',
    subtitle: 'Deep Cosmic Indigo & Electric Purple',
    accentColors: ['#7C4DFF', '#9D7BFF', '#FF7A1A'],
    icon: Sparkles
  },
  {
    id: 'cyber',
    name: 'Cyber Neon',
    subtitle: 'Ultraviolet, Hot Pink & Electric Cyan',
    accentColors: ['#00F5D4', '#F72585', '#7209B7'],
    icon: Zap
  },
  {
    id: 'solaris',
    name: 'Solaris Sunset',
    subtitle: 'Warm Amber, Sunset Coral & Royal Velvet',
    accentColors: ['#FF9E00', '#FF4D6D', '#7B2CBF'],
    icon: Flame
  },
  {
    id: 'emerald',
    name: 'Emerald Aurora',
    subtitle: 'Bioluminescent Jade & Deep Oceanic Teal',
    accentColors: ['#10B981', '#06B6D4', '#0F172A'],
    icon: Compass
  }
];

export const BackgroundDecorations: React.FC<BackgroundDecorationsProps> = ({
  theme,
  onThemeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentThemeConfig = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <>
      {/* 1. Fixed Atmospheric Canvas (Zero Interaction blocking) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
        {/* Top subtle light ray beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C4DFF]/60 via-[#9D7BFF]/80 to-transparent" />

        {/* Ambient Grid Matrix with Radial Fade */}
        <div className="absolute inset-0 bg-grid-pattern opacity-70" />

        {/* Subtle Starlight Dot Lattice */}
        <div className="absolute inset-0 bg-dots-pattern opacity-35" />

        {/* Theme-Specific Ambient Light Orbs */}
        {theme === 'nebula' && (
          <>
            {/* Top Center Electric Purple Nebula */}
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full bg-gradient-to-b from-[#7C4DFF]/28 via-[#9D7BFF]/20 to-transparent blur-[140px] animate-float-slow" />

            {/* Top Right Warm Amber/Orange Spark */}
            <div className="absolute top-[80px] right-[-100px] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#FF7A1A]/22 via-[#FF5500]/14 to-transparent blur-[130px] animate-float-reverse" />

            {/* Bottom Left Deep Sapphire Flare */}
            <div className="absolute bottom-[5%] left-[-120px] w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-[#3A0CA3]/28 via-[#4361EE]/18 to-transparent blur-[150px] animate-pulse-glow" />

            {/* Mid-right Magenta Particle Cloud */}
            <div className="absolute top-[45%] right-[10%] w-[420px] h-[420px] rounded-full bg-[#C77DFF]/15 blur-[120px] animate-float-slow" />
          </>
        )}

        {theme === 'cyber' && (
          <>
            {/* Top Center Electric Cyan Beam */}
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full bg-gradient-to-b from-[#00F5D4]/24 via-[#00BBF9]/18 to-transparent blur-[140px] animate-float-slow" />

            {/* Top Right Hot Neon Pink Glow */}
            <div className="absolute top-[60px] right-[-80px] w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-[#F72585]/24 via-[#B5179E]/16 to-transparent blur-[130px] animate-float-reverse" />

            {/* Bottom Left Deep Ultraviolet Cloud */}
            <div className="absolute bottom-[5%] left-[-100px] w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-[#7209B7]/30 via-[#3F37C9]/20 to-transparent blur-[150px] animate-pulse-glow" />

            {/* Floating Electric Blue Core */}
            <div className="absolute top-[50%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#4CC9F0]/16 blur-[110px] animate-float-reverse" />
          </>
        )}

        {theme === 'solaris' && (
          <>
            {/* Top Center Radiant Amber Solaris */}
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full bg-gradient-to-b from-[#FF9E00]/26 via-[#FF6000]/18 to-transparent blur-[140px] animate-float-slow" />

            {/* Top Right Sunset Coral / Rose Flame */}
            <div className="absolute top-[60px] right-[-80px] w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-[#FF4D6D]/25 via-[#C9184A]/18 to-transparent blur-[130px] animate-float-reverse" />

            {/* Bottom Left Royal Plum Twilight */}
            <div className="absolute bottom-[5%] left-[-100px] w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-[#590D22]/32 via-[#7B2CBF]/20 to-transparent blur-[150px] animate-pulse-glow" />

            {/* Floating Golden Radiance */}
            <div className="absolute top-[48%] right-[15%] w-[420px] h-[420px] rounded-full bg-[#FFD166]/16 blur-[120px] animate-float-slow" />
          </>
        )}

        {theme === 'emerald' && (
          <>
            {/* Top Center Bioluminescent Jade Aurora */}
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full bg-gradient-to-b from-[#10B981]/25 via-[#059669]/18 to-transparent blur-[140px] animate-float-slow" />

            {/* Top Right Electric Cyan Teal Spark */}
            <div className="absolute top-[60px] right-[-80px] w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-[#06B6D4]/25 via-[#0284C7]/16 to-transparent blur-[130px] animate-float-reverse" />

            {/* Bottom Left Deep Abyssal Oceanic Glow */}
            <div className="absolute bottom-[5%] left-[-100px] w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-[#0F172A]/40 via-[#0E7490]/22 to-transparent blur-[150px] animate-pulse-glow" />

            {/* Floating Mint Starlight Core */}
            <div className="absolute top-[45%] left-[12%] w-[420px] h-[420px] rounded-full bg-[#34D399]/16 blur-[120px] animate-float-slow" />
          </>
        )}
      </div>

      {/* 2. Interactive Background Theme Switcher Control (Floating Bottom-Right Pill) */}
      <div className="fixed bottom-5 right-5 z-40">
        <div className="relative">
          {/* Main Floating Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#120E29]/90 hover:bg-[#1C1640] border border-[#7C4DFF]/40 text-white text-xs font-semibold shadow-xl shadow-black/50 backdrop-blur-md hover:border-[#9D7BFF] transition-all hover:scale-105 active:scale-95 group"
            title="Change background color atmosphere"
          >
            <div className="flex items-center -space-x-1">
              <span
                className="w-2.5 h-2.5 rounded-full ring-1 ring-black shadow-sm"
                style={{ backgroundColor: currentThemeConfig.accentColors[0] }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full ring-1 ring-black shadow-sm"
                style={{ backgroundColor: currentThemeConfig.accentColors[1] }}
              />
            </div>
            <span className="hidden sm:inline font-bold">Atmosphere:</span>
            <span className="text-[#9D7BFF] font-semibold">{currentThemeConfig.name}</span>
            <Palette className="w-3.5 h-3.5 text-[#FF7A1A] group-hover:rotate-45 transition-transform" />
          </button>

          {/* Theme Selector Popover Menu */}
          {isOpen && (
            <div className="absolute bottom-12 right-0 w-72 p-3 rounded-2xl bg-[#0F0B24]/95 border border-[#7C4DFF]/40 shadow-2xl shadow-black/80 backdrop-blur-xl space-y-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#2A2453]/60 px-1">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  Background Atmosphere
                </span>
                <span className="text-[10px] text-[#B9B3D0]">4 Palettes</span>
              </div>

              <div className="space-y-1.5">
                {THEME_OPTIONS.map((opt) => {
                  const isSelected = theme === opt.id;
                  const IconComp = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onThemeChange(opt.id);
                        setIsOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#7C4DFF]/30 to-[#9D7BFF]/20 border border-[#7C4DFF]'
                          : 'bg-[#17132E]/70 hover:bg-[#201A40] border border-[#2A2453]/60 hover:border-[#7C4DFF]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Tri-color Preview Dots */}
                        <div className="flex items-center -space-x-1 shrink-0">
                          <span
                            className="w-3 h-3 rounded-full shadow-sm ring-1 ring-black"
                            style={{ backgroundColor: opt.accentColors[0] }}
                          />
                          <span
                            className="w-3 h-3 rounded-full shadow-sm ring-1 ring-black"
                            style={{ backgroundColor: opt.accentColors[1] }}
                          />
                          <span
                            className="w-3 h-3 rounded-full shadow-sm ring-1 ring-black"
                            style={{ backgroundColor: opt.accentColors[2] }}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white flex items-center gap-1">
                            <span>{opt.name}</span>
                          </div>
                          <p className="text-[10px] text-[#B9B3D0] truncate mt-0.2">
                            {opt.subtitle}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="w-4 h-4 text-[#00E5FF] shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#2A2453]/60 px-1 text-[10px] text-[#B9B3D0]/70 flex items-center justify-between">
                <span>Ambient Mesh & Glows</span>
                <span className="text-[#FF7A1A]">Live Preview</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
