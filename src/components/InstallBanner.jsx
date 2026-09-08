import { useState, useEffect } from 'react';
import { Smartphone, X, QrCode, Share, PlusSquare } from 'lucide-react';

export default function InstallBanner({ deferredPrompt }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showiOSModal, setShowiOSModal] = useState(false);
  
  const isMobileUser = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    // Check if running in standalone display mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    const isDismissed = sessionStorage.getItem('gabaInstallDismissed') === 'true';

    if (!isStandalone && !isDismissed) {
      // Small timeout to not show instantly on load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstallClick = async () => {
    if (isiOS) {
      setShowiOSModal(true);
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsVisible(false);
      }
    } else {
      // Direct redirect to /app if no deferred prompt exists
      window.history.pushState(null, '', '/app');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('gabaInstallDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {isMobileUser ? (
        /* Mobile Install Banner: Fixed full-width bottom bar */
        <div className="fixed bottom-0 left-0 right-0 bg-[#071421] text-white p-4 border-t border-[#F59E0B]/30 shadow-2xl z-[999] flex flex-col gap-3 animate-slide-up">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center text-[#071421] shrink-0 shadow-md">
                <Smartphone size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-[#F59E0B]">📱 Get the GABA App</h4>
                <p className="text-white/70 text-xs mt-0.5 leading-relaxed">
                  Shop hardware, sanitary, building materials and paint faster from your phone.
                </p>
              </div>
            </div>
            <button 
              onClick={handleDismiss} 
              className="text-white/40 hover:text-white p-1"
              aria-label="Close install prompt"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-1 w-full">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-[#F59E0B] text-[#071421] font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-all text-center cursor-pointer shadow-md"
            >
              INSTALL APP
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 bg-white/10 hover:bg-white/15 text-white font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-all text-center cursor-pointer border border-white/10"
            >
              Maybe Later
            </button>
          </div>
        </div>
      ) : (
        /* Desktop Install Banner: Rounded floating card in bottom-left corner */
        <div className="fixed bottom-6 left-6 w-80 bg-[#071421] text-white p-5 rounded-2xl border border-[#F59E0B]/30 shadow-2xl z-[999] flex flex-col gap-4 animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center text-[#071421] shrink-0 shadow-md">
                <Smartphone size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-[#F59E0B]">Get the GABA App</h4>
                <p className="text-white/60 text-xs mt-0.5 leading-relaxed">
                  Scan QR code or click to experience the mobile shopping app.
                </p>
              </div>
            </div>
            <button 
              onClick={handleDismiss} 
              className="text-white/40 hover:text-white p-1"
              aria-label="Close install prompt"
            >
              <X size={18} />
            </button>
          </div>

          {/* MOCK QR CODE PANEL */}
          <div className="flex items-center gap-4 bg-[#0c1a2b] p-3 rounded-xl border border-white/5">
            <div className="p-1 bg-white rounded-lg shadow-sm shrink-0">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://gababuildingmaterial.com/app&color=071421&bgcolor=ffffff" 
                alt="App QR Code" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-[#F59E0B] font-bold">App Access</p>
              <p className="text-[11px] text-white/80 leading-relaxed mt-0.5">
                Scan with your phone to shop on mobile web‑app.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-[#F59E0B] text-[#071421] font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-all text-center cursor-pointer shadow-md"
            >
              LAUNCH APP
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 bg-white/10 hover:bg-white/15 text-white font-bold text-xs py-2.5 rounded-lg active:scale-95 transition-all text-center cursor-pointer border border-white/10"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Instruction Modal */}
      {showiOSModal && (
        <div 
          className="fixed inset-0 bg-black/85 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowiOSModal(false)}
        >
          <div 
            className="bg-[#071421] text-white rounded-2xl p-6 max-w-sm w-full border border-[#F59E0B]/30 shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowiOSModal(false)} 
              className="absolute top-4 right-4 text-white/50 hover:text-white"
              aria-label="Close instructions"
            >
              <X size={20} />
            </button>

            <Smartphone size={40} className="text-[#F59E0B] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#F59E0B] mb-2">Install GABA App</h3>
            <p className="text-white/70 text-xs mb-6 leading-relaxed">
              Install the GABA Trading Company app on your iPhone using Safari:
            </p>

            <ol className="text-left space-y-4 text-xs max-w-xs mx-auto mb-6">
              <li className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#071421] font-bold flex items-center justify-center shrink-0">1</span>
                <span className="flex items-center gap-1.5">
                  Tap the <Share size={14} className="text-[#F59E0B]" /> Share button below.
                </span>
              </li>
              <li className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#071421] font-bold flex items-center justify-center shrink-0">2</span>
                <span className="flex items-center gap-1.5">
                  Scroll down and tap <PlusSquare size={14} className="text-[#F59E0B]" /> 'Add to Home Screen'.
                </span>
              </li>
              <li className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#071421] font-bold flex items-center justify-center shrink-0">3</span>
                <span>
                  Tap 'Add' in the top-right corner.
                </span>
              </li>
            </ol>

            <button
              onClick={() => setShowiOSModal(false)}
              className="w-full bg-[#F59E0B] text-[#071421] font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all cursor-pointer shadow-md"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
