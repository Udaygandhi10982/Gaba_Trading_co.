import { useState, useRef } from 'react';
import { Shield, Truck, Tag, Users, Play, X, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

const highlights = [
  { icon: Shield, label: 'Quality Products' },
  { icon: Truck, label: 'Best Price' },
  { icon: Tag, label: 'Wide Range' },
  { icon: Users, label: 'Customer Service' },
];

const videosList = [
  {
    id: 1,
    src: '/videos/gaba-video-1.mp4',
    title: 'Faucets & Taps',
    desc: 'Stylish & durable taps',
  },
  {
    id: 2,
    src: '/videos/gaba-video-2.mp4',
    title: 'Bathroom Collections',
    desc: 'Modern sanitary designs',
  },
  {
    id: 3,
    src: '/videos/gaba-video-3.mp4',
    title: 'Visit Our Showroom',
    desc: 'See quality before you buy',
  },
  {
    id: 4,
    src: '/videos/gaba-video-4.mp4',
    title: 'Premium Quality',
    desc: 'Unmatched durability',
  },
  {
    id: 5,
    src: '/videos/gaba-video-5.mp4',
    title: 'Wide Range',
    desc: 'Explore our latest catalog',
  },
];

export default function AboutSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  const totalPages = Math.ceil(videosList.length / 3);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

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

  // Get only the 3 videos corresponding to the active page
  const activeVideos = videosList.slice(currentPage * 3, currentPage * 3 + 3);

  return (
    <section id="about" className="bg-[#F7F7F5] py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">

        {/* ── Left Column: Content (Takes 5 cols on lg) ── */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <p className="text-[#F59E0B] text-xs font-black uppercase tracking-widest mb-1.5">
            WHO WE ARE
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight mb-4">
            Sanitary Solutions
            <br />
            <span className="text-[#F59E0B]">You Can Rely On</span>
          </h2>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-8 max-w-lg">
            GABA Sanitary Specialist is your trusted destination for quality bathroom fittings and sanitary products. We bring together modern designs, reliable products, and attractive prices for every bathroom.
          </p>

          {/* 4 Icon Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center text-[#F59E0B] shrink-0 border border-[#F59E0B]/25">
                  <Icon size={18} />
                </div>
                <span className="text-sm font-bold text-[#111827]">{label}</span>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#071421] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#112538] transition-all duration-200 text-xs shadow-md"
            >
              Explore Our Collection &rarr;
            </button>
          </div>
        </div>

        {/* ── Right Column: Paginated Video Grid with non-overlapping arrows (Takes 7 cols on lg) ── */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full px-12">
            
            {/* Left Page Arrow Button (Positioned at edge, no overlap) */}
            <button
              onClick={handlePrevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-[#F59E0B] hover:text-[#071421] rounded-full border border-gray-200 flex items-center justify-center text-[#071421] shadow-lg transition-all active:scale-90"
              aria-label="Previous 3 videos"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Grid Container containing exactly 3 items at a time */}
            <div key={currentPage} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full animate-fade-in">
              {activeVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => openVideo(vid)}
                  className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group cursor-pointer w-full h-[340px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Silent Loop Video Preview as Thumbnail */}
                  <video
                    src={vid.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                  
                  {/* Overlay details */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-200 flex flex-col justify-between p-4">
                    {/* Top tag */}
                    <span className="self-start bg-black/45 backdrop-blur-md text-[10px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                      GABA Reel
                    </span>

                    {/* Middle Play Button */}
                    <div className="self-center w-12 h-12 bg-white/20 hover:bg-white/35 backdrop-blur-sm rounded-full border-2 border-white flex items-center justify-center transition-all duration-200 shadow-md group-hover:scale-110">
                      <Play size={18} className="text-white fill-white translate-x-0.5" />
                    </div>

                    {/* Bottom Text */}
                    <div className="bg-black/55 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                      <p className="text-white font-bold text-xs leading-tight mb-0.5">
                        {vid.title}
                      </p>
                      <p className="text-white/70 text-[9px] leading-tight">
                        {vid.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Page Arrow Button (Positioned at edge, no overlap) */}
            <button
              onClick={handleNextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-[#F59E0B] hover:text-[#071421] rounded-full border border-gray-200 flex items-center justify-center text-[#071421] shadow-lg transition-all active:scale-90"
              aria-label="Next 3 videos"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator Section below cards */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  i === currentPage ? 'bg-[#F59E0B] w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* Centered Caption Text below dots */}
          <p className="text-gray-400 text-xs mt-3 select-none">
            Swipe or use arrows to explore more videos
          </p>
        </div>

      </div>

      {/* ── Premium Lightbox Video Modal ── */}
      {modalVideo && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={closeVideo}
        >
          <div
            className="relative bg-black rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{ aspectRatio: '9/16', maxHeight: '85vh' }}
          >
            <video
              ref={videoRef}
              src={modalVideo.src}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />

            {/* Mute/Unmute Overlay Toggle */}
            <button
              onClick={toggleMute}
              className="absolute bottom-16 right-4 bg-black/60 backdrop-blur-md rounded-full p-2.5 text-white hover:bg-[#F59E0B] transition-colors"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
              <p className="text-white font-bold text-sm">{modalVideo.title}</p>
              <p className="text-white/70 text-xs mt-0.5">{modalVideo.desc}</p>
            </div>

            {/* Close Button */}
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
