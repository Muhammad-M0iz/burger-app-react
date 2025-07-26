
interface LogoProps {
  className?: string;
  alt?: string;
}

function Logo({ className = "w-12 h-12 md:w-14 md:h-14", alt = "BurgerCraft Logo" }: LogoProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      <img 
        src="/icon.png" 
        alt={alt}
        className={`${className} relative z-10 filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 group-hover:scale-110`}
      />
    </div>
  );
}

export default Logo;