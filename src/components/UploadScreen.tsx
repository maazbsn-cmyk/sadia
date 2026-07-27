import React, { useState, useRef } from 'react';

interface UploadScreenProps {
  onStartAnalysis: (params: {
    roomType: string;
    style: string;
    budget: string;
    imageBase64?: string;
  }) => void;
  resetKey?: number;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ onStartAnalysis, resetKey }) => {
  const [roomType, setRoomType] = useState('Living Room');
  const [style, setStyle] = useState('Modern');
  const [budget, setBudget] = useState('Low');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (resetKey !== undefined) {
      setSelectedImage(null);
    }
  }, [resetKey]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStart = () => {
    onStartAnalysis({
      roomType,
      style,
      budget,
      imageBase64: selectedImage || undefined,
    });
  };

  return (
    <main className="pt-28 pb-32 px-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-headline text-3xl md:text-4xl font-semibold text-on-surface">
          Analyze Your Space
        </h2>
        <p className="text-on-surface-variant max-w-md mx-auto text-sm md:text-base leading-relaxed">
          Upload a photo of your room and let our AI designer suggest the perfect transformation.
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        <div className="glass-card rounded-[2rem] p-4 md:p-6 shadow-xl">
          <div
            id="upload-dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] transition-all duration-300 ${
              isDragOver
                ? 'border-primary bg-primary/5'
                : 'border-outline-variant hover:border-primary bg-white/50 dark:bg-white/5'
            }`}
          >
            {selectedImage ? (
              <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                <img
                  src={selectedImage}
                  alt="Uploaded room"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    add_a_photo
                  </span>
                </div>
                <h3 className="font-headline text-xl font-semibold text-on-surface mb-1">
                  Upload Room Image
                </h3>
                <p className="text-on-surface-variant font-medium text-sm mb-4">
                  Drag & drop your photo or click to browse
                </p>

                <div className="flex items-center gap-3 my-1">
                  <span className="h-px w-10 bg-outline-variant/50" />
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    OR
                  </span>
                  <span className="h-px w-10 bg-outline-variant/50" />
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-primary font-semibold text-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                  Camera Capture
                </button>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Options Form Section */}
        <div className="glass-card rounded-[2rem] p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Room Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-1">
                Room Type
              </label>
              <div className="relative">
                <select
                  id="select-room-type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full appearance-none bg-white border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer text-sm font-medium pr-10"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Office">Office</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                  expand_more
                </span>
              </div>
            </div>

            {/* Interior Style */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-1">
                Interior Style
              </label>
              <div className="relative">
                <select
                  id="select-interior-style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full appearance-none bg-white border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer text-sm font-medium pr-10"
                >
                  <option value="Modern">Modern</option>
                  <option value="Minimal">Minimal</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Scandinavian">Scandinavian</option>
                  <option value="Boho">Boho</option>
                  <option value="Japandi">Japandi</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                  expand_more
                </span>
              </div>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-1">
                Budget
              </label>
              <div className="relative">
                <select
                  id="select-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full appearance-none bg-white border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer text-sm font-medium pr-10"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Analysis Action */}
          <div className="pt-2">
            <button
              id="upload-analyse-btn"
              onClick={handleStart}
              className="w-full py-4 rounded-xl primary-gradient text-on-primary font-headline text-lg font-semibold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined fill-1">bolt</span>
              Analyse Design
            </button>
            <p className="mt-3 text-center text-xs text-outline font-medium">
              Estimated analysis time: 10-15 seconds
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
