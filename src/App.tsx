import { useState, useRef } from 'react';
import { MapPin, Heart, Sparkles, Camera, Instagram, Twitter, Music, Music2, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; duration: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgress((current / total) * 100);
      setCurrentTime(current);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleFollow = () => {
    // Generate new hearts
    const newHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100, // random start horizontal position
      size: Math.random() * 2 + 0.5, // 0.5x to 2.5x size
      duration: Math.random() * 2 + 2, // 2s to 4s
    }));
    
    setHearts(prev => [...prev, ...newHearts]);

    // Cleanup after animation finishes
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-fuchsia-500 selection:text-white overflow-hidden relative">

      {/* Heart Particles Layer */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ y: '100vh', x: 0, opacity: 1, scale: 0 }}
              animate={{ 
                y: '-20vh', 
                x: (Math.random() - 0.5) * 200, 
                opacity: 0, 
                scale: heart.size 
              }}
              transition={{ duration: heart.duration, ease: "easeOut" }}
              className="absolute text-pink-500"
              style={{ left: `${heart.left}%` }}
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-[500px] w-full overflow-hidden bg-black bg-contain bg-center bg-no-repeat mt-12 md:mt-0"
        style={{ backgroundImage: 'url("/banner.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-white/10 animate-pulse">
          <Sparkles size={48} />
        </div>
        <div className="absolute bottom-20 right-20 text-white/5">
          <Heart size={64} />
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900/90 backdrop-blur-xl p-8 shadow-2xl shadow-fuchsia-900/20 ring-1 ring-neutral-800 sm:p-12">
          
          {/* Interactive Marquee Banner (Behind Info) */}
          <div className="absolute top-1/3 left-0 w-full -translate-y-1/2 -rotate-3 transform z-0 select-none opacity-20 hover:opacity-100 transition-opacity duration-500 flex whitespace-nowrap">
            <div className="animate-marquee flex gap-8">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="text-8xl font-black text-fuchsia-900 uppercase tracking-tighter">
                  TRUE NEY
                </span>
              ))}
            </div>
          </div>

          {/* Profile Header */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative h-48 w-48 rounded-full bg-gradient-to-tr from-fuchsia-600 to-pink-500 p-1 shadow-lg shadow-pink-900/50 flex items-center justify-center mb-6">
              <img 
                src="/Artur.png" 
                alt="Artur Durães" 
                className="h-full w-full rounded-full object-cover border-4 border-neutral-900"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Artur+Durães&background=831843&color=fbcfe8&size=200";
                }}
              />
              <div className="absolute bottom-2 right-2 rounded-full bg-pink-600 p-2 text-white shadow-sm ring-2 ring-neutral-900 z-10">
                <Sparkles size={16} />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Artur Durães
            </h1>
            
            <p className="mt-4 text-xl font-medium text-fuchsia-400 tracking-wide uppercase">
              O Sissificado do Rio de Janeiro
            </p>
            
            <div className="mt-4 flex items-center gap-2 text-neutral-400">
              <MapPin size={18} className="text-pink-500" />
              <span>Rio de Janeiro, RJ</span>
            </div>

            <div className="mt-8 flex gap-4">
              <a 
                href="https://onlyfans.com/onebuffboi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFollow}
                className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-blue-400 active:scale-95 shadow-lg shadow-blue-500/30"
              >
                <Sparkles size={18} fill="currentColor" />
                <span>OnlyFans</span>
              </a>
            </div>
          </div>

          <hr className="relative z-10 my-12 border-neutral-800" />

          {/* About Section */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white">Sobre Mim</h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
              Bem-vindo ao espaço oficial do ícone carioca. Trazendo charme, delicadeza 
              e uma atitude inconfundível para as ruas do Rio de Janeiro. Aqui celebramos 
              a liberdade de ser exatamente quem você é, com um toque de glamour e muita ousadia.
            </p>
            
            <div className="mt-8 mx-auto w-full max-w-sm rounded-3xl bg-neutral-900/60 p-6 border border-fuchsia-900/30 shadow-[0_0_30px_-5px_rgba(192,38,211,0.15)] backdrop-blur-md">
              <p className="text-sm text-fuchsia-400 mb-5 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Music size={16} /> Música Tema
              </p>
              
              <audio 
                ref={audioRef} 
                src="/Bilada Circulation - RubemJRalt (youtube).mp3" 
                loop 
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              />
              
              <div className="flex items-center gap-5">
                <button 
                  onClick={togglePlay}
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-fuchsia-600/30"
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
                
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                    <div 
                      className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 transition-all duration-100 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs font-semibold text-neutral-400 flex justify-between items-center">
                    <span className="text-fuchsia-300 w-10">{formatTime(currentTime)}</span>
                    <span className="truncate px-2 text-neutral-300">Bilada Circulation</span>
                    <span className="text-neutral-500 w-10 text-right">3:16</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="relative z-10 mt-12 flex justify-center gap-6">
            <a 
              href="https://www.instagram.com/hetero.sigilo24/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-full bg-neutral-800 p-4 text-neutral-400 transition-colors hover:bg-pink-900/50 hover:text-pink-400"
            >
              <span className="sr-only">Instagram</span>
              <Instagram size={24} />
            </a>
            <a 
              href="https://x.com/herrozoado3" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-full bg-neutral-800 p-4 text-neutral-400 transition-colors hover:bg-pink-900/50 hover:text-pink-400"
            >
              <span className="sr-only">Twitter</span>
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
