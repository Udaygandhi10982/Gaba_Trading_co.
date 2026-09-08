import { useState, useRef } from 'react';
import { Play, X, Volume2, VolumeX, ChevronRight } from 'lucide-react';

const galleryVideos = [
  {
    id: 1,
    src: '/videos/gaba-video-1.mp4',
    title: 'Faucets & Taps',
    subtitle: 'Premium bathroom fittings',
  },
  {
    id: 2,
    src: '/videos/gaba-video-2.mp4',
    title: 'Bathroom Collections',
    subtitle: 'Modern sanitary designs',
  },
  {
    id: 3,
    src: '/videos/gaba-video-3.mp4',
    title: 'Sanitary Showroom',
    subtitle: 'Explore our latest products',
  },
];

export default function GABAInAction() {
  const [modalVideo, setModalVideo] = useState(null);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  const openVideo = (video) => {
    setModalVideo(video);
  };

  const closeVideo = () => {
    setModalVideo(null);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section id="gaba-in-action" className="bg-[#071421] py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
        
        {/* ── Left side text and action button (Takes 4 cols on lg) ── */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <p className="text-[#F59E0B] text-xs font-black uppercase tracking-widest mb-1.5">
            OUR GALLERY
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            See GABA
            <br />
            <span className="text-[#F59E0B]">Sanitary in Action</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
            Take a look at our sanitary products, collections, and showroom through real video clips.
          </p>
          <div>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#F59E0B] text-[#071421] font-bold px-6 py-3 rounded-xl hover:bg-[#FFB21A] transition-all duration-200 text-xs shadow-lg shadow-[#F59E0B]/20"
            >
              View Sanitary Catalog
            </button>
          </div>
        </div>

        {/* ── Right side landscape video cards row (Takes 8 cols on lg) ── */}
        <div className="lg:col-span-8 relative flex items-center">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full pr-12">
            {galleryVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => openVideo(vid)}
                className="relative rounded-2xl overflow-hidden bg-[#0d2035] border border-white/5 group cursor-pointer flex-1 min-w-[280px] h-[180px] transition-all duration-300 hover:border-[#F59E0B] hover:-translate-y-1"
              >
                {/* Silent Loop Video Preview */}
                <video
                  src={vid.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-200 flex flex-col justify-between p-4">
                  {/* Top tag */}
                  <span className="self-start bg-black/40 backdrop-blur-md text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    GABA Video {vid.id}
                  </span>

                  {/* Play button overlay */}
                  <div className="self-center w-11 h-11 bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-full border-2 border-white flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-md">
                    <Play size={16} className="text-white fill-white translate-x-0.5" />
                  </div>

                  {/* Bottom Text label */}
                  <div>
                    <p className="text-white font-bold text-xs leading-none mb-0.5">
                      {vid.title}
                    </p>
                    <p className="text-white/70 text-[9px] leading-tight">
                      {vid.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Right Arrow on the edge */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0d2035] border border-white/10 rounded-full flex items-center justify-center text-[#F59E0B] shadow-2xl z-10 cursor-pointer hover:bg-[#F59E0B] hover:text-[#071421] transition-all">
            <ChevronRight size={20} />
          </div>
        </div>

      </div>

      {/* ── Premium Landscape Video Lightbox Modal ── */}
      {modalVideo && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={closeVideo}
        >
          <div
            className="relative bg-black rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{ aspectRatio: '16/9' }}
          >
            <video
              ref={videoRef}
              src={modalVideo.src}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />

            {/* Mute toggle overlay */}
            <button
              onClick={toggleMute}
              className="absolute bottom-16 right-4 bg-black/60 backdrop-blur-md rounded-full p-2.5 text-white hover:bg-[#F59E0B] transition-colors"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Labels overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <p className="text-white font-bold text-sm">{modalVideo.title}</p>
              <p className="text-white/70 text-xs mt-0.5">{modalVideo.subtitle}</p>
            </div>

            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-red-500 hover:text-white backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close video player"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
