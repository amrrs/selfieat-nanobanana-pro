import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, MapPin, Loader2, Download, X, Sparkles, Plus, Trash2, AlertCircle } from 'lucide-react';

interface GeneratorProps {
  onBack: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const GENERATION_TIMEOUT = 300000; // 5 minutes (increased for multiple image generation)

export default function Generator({ onBack }: GeneratorProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>(['']); 
  const [samplesPerLocation, setSamplesPerLocation] = useState<number>(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Array<{ url: string; location: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.file.size > MAX_FILE_SIZE) {
        setError('Image must be less than 10MB');
      } else {
        setError('Invalid file type. Please upload JPG, PNG, or WEBP');
      }
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      // Additional size check
      if (file.size > MAX_FILE_SIZE) {
        setError('Image must be less than 10MB');
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResults([]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false
  });

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    setImagePreview(null);
    setResults([]);
    setError(null);
  };

  const addLocation = () => {
    if (locations.length < 2) {
      setLocations([...locations, '']);
    }
  };

  const removeLocation = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations.length ? newLocations : ['']);
  };

  const updateLocation = (index: number, value: string) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const handleGenerate = async () => {
    const validLocations = locations.filter(l => l.trim().length > 0);
    
    if (!image || validLocations.length === 0) return;

    setIsProcessing(true);
    setResults([]);
    setError(null);

    // Timeout handler
    const timeoutId = setTimeout(() => {
      setIsProcessing(false);
      setError('Request timed out. The AI is busy. Please try again in a moment.');
    }, GENERATION_TIMEOUT);

    try {
      const reader = new FileReader();
      const imageDataUrl = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read image file'));
        reader.readAsDataURL(image);
      });

      console.log('🚀 Sending request to backend...', { locations: validLocations });
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageFile: imageDataUrl,
          locations: validLocations,
          samplesPerLocation,
        }),
      });

      clearTimeout(timeoutId);
      
      console.log('📡 Backend response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Backend error:', errorData);
        
        // More specific error messages
        if (response.status === 400) {
          throw new Error('Invalid request. Please check your image and location.');
        } else if (response.status === 500) {
          throw new Error(errorData.details || 'Server error. The AI model may be unavailable. Please try again.');
        } else if (response.status === 401 || response.status === 403) {
          throw new Error('Authentication error. Please contact support.');
        } else {
          throw new Error('Failed to generate images. Please try again.');
        }
      }

      const data = await response.json();
      console.log('✨ Received data:', data);
      
      if (!data.images || data.images.length === 0) {
        throw new Error('No images were generated. Please try again.');
      }

      setResults(data.images);

    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Error generating images:", error);
      
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const expectedImageCount = locations.filter(l => l.trim()).length * samplesPerLocation;
  const canGenerate = image && locations.some(l => l.trim());

  return (
    <div className="min-h-screen bg-background text-white selection:bg-[#3E8AEA]/30">
      {/* Header */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-gradient-to-tr from-[#3E8AEA] to-[#64AE87] rounded-md flex items-center justify-center shadow-lg shadow-[#3E8AEA]/20">
             <Sparkles className="w-3.5 h-3.5 text-white" />
           </div>
          <span className="font-semibold tracking-tight">SelfieAt</span>
        </div>
        <div className="w-16" />
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Panel - Input */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-300 font-medium mb-1">Generation Failed</p>
                    <p className="text-xs text-red-400/80">{error}</p>
                  </div>
                  <button 
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Step 1: Upload */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold">1</span>
                  Upload Selfie
                </h2>
                {image && (
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    {(image.size / 1024 / 1024).toFixed(1)}MB
                  </span>
                )}
              </div>
              
              <div
                {...getRootProps()}
                className={`relative group border border-dashed rounded-2xl transition-all cursor-pointer overflow-hidden ${
                  isDragActive
                    ? 'border-[#3E8AEA] bg-[#3E8AEA]/5'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                } ${imagePreview ? 'aspect-[3/4]' : 'aspect-video'}`}
              >
                <input {...getInputProps()} />

                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Enhanced Laser Scanning Animation */}
                    {isProcessing && (
                      <div className="absolute inset-0 pointer-events-none bg-black/30">
                        <div className="laser-scan absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3E8AEA] to-transparent shadow-[0_0_30px_rgba(62,138,234,1),0_0_60px_rgba(62,138,234,0.8)]"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(62,138,234,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(62,138,234,0.25)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <div className="absolute top-4 left-4 w-10 h-10 border-t-[3px] border-l-[3px] border-[#3E8AEA] shadow-[0_0_15px_rgba(62,138,234,0.8)]"></div>
                        <div className="absolute top-4 right-4 w-10 h-10 border-t-[3px] border-r-[3px] border-[#3E8AEA] shadow-[0_0_15px_rgba(62,138,234,0.8)]"></div>
                        <div className="absolute bottom-4 left-4 w-10 h-10 border-b-[3px] border-l-[3px] border-[#3E8AEA] shadow-[0_0_15px_rgba(62,138,234,0.8)]"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-[3px] border-r-[3px] border-[#3E8AEA] shadow-[0_0_15px_rgba(62,138,234,0.8)]"></div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#3E8AEA]/90 rounded-full border-2 border-[#3E8AEA] backdrop-blur-md shadow-[0_0_20px_rgba(62,138,234,0.8)]">
                          <span className="text-sm font-semibold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                            ANALYZING IMAGE
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {!isProcessing && (
                      <>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <p className="text-sm font-medium">Change Image</p>
                        </div>
                        <button
                          onClick={clearImage}
                          className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors backdrop-blur-md border border-white/10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">Drag & drop or click to upload</p>
                    <p className="text-xs text-secondary">JPG, PNG, WEBP • Max 10MB</p>
                  </div>
                )}
              </div>
            </section>

            {/* Step 2: Locations */}
            <section>
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold">2</span>
                  Choose Destinations
                </h2>
                <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                    {locations.filter(l => l.trim()).length}/{locations.length} Filled
                </span>
              </div>

              <div className="space-y-3">
                {locations.map((loc, index) => (
                  <div key={index} className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-[#64AE87] transition-colors" />
                    <input
                      type="text"
                      value={loc}
                      onChange={(e) => updateLocation(index, e.target.value)}
                      placeholder={`Location ${index + 1} (e.g. Paris, Tokyo)`}
                      className="w-full pl-11 pr-10 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-secondary/50 focus:outline-none focus:border-[#64AE87]/50 focus:bg-white/[0.05] transition-all"
                      maxLength={100}
                    />
                    {locations.length > 1 && (
                        <button 
                            onClick={() => removeLocation(index)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-secondary hover:text-red-400 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                  </div>
                ))}

                {locations.length < 2 && (
                  <button
                    onClick={addLocation}
                    className="w-full py-3 border border-dashed border-white/10 rounded-xl text-sm text-secondary hover:text-white hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Location
                  </button>
                )}
              </div>
            </section>

            {/* Step 3: Samples Per Location */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold">3</span>
                  Samples Per Location
                </h2>
                <span className="text-xs text-[#3E8AEA] font-semibold">
                  {expectedImageCount} Total Photos
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSamplesPerLocation(num)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                      samplesPerLocation === num
                        ? 'bg-gradient-to-r from-[#3E8AEA] to-[#64AE87] text-white shadow-lg shadow-[#3E8AEA]/30 ring-2 ring-[#3E8AEA]/50'
                        : 'bg-white/[0.03] border border-white/10 text-secondary hover:text-white hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              
              <p className="text-xs text-secondary/70 mt-3 text-center">
                Each location will generate {samplesPerLocation} {samplesPerLocation === 1 ? 'photo' : 'photos'}
              </p>
            </section>

            {/* Enhanced Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isProcessing}
              className={`relative w-full py-5 rounded-xl font-semibold text-lg transition-all ${
                !canGenerate || isProcessing
                  ? 'bg-white/5 text-secondary cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#3E8AEA] via-[#64AE87] to-[#D48849] bg-[length:200%_100%] animate-shimmer-button text-white shadow-[0_0_30px_rgba(62,138,234,0.4)] hover:shadow-[0_0_50px_rgba(62,138,234,0.6)] ring-2 ring-[#3E8AEA]/30 hover:ring-[#3E8AEA]/50 hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating {expectedImageCount} Variants...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Photos
                  {canGenerate && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </span>
              )}
            </button>
            
            {/* Hint text when ready */}
            {canGenerate && !isProcessing && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-green-400/80 -mt-6 flex items-center justify-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Ready to generate!
              </motion.p>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden relative">
                
                <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} 
                />

                <div className="p-8 h-full overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-medium">Results Gallery</h2>
                        {(results.length > 0 || isProcessing) && (
                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-secondary">
                                {isProcessing ? `Generating ${expectedImageCount}` : `${results.length} Generated`}
                            </span>
                        )}
                    </div>

                    {isProcessing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Array.from({ length: expectedImageCount }).map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10"
                                >
                                    <div className="absolute inset-0 shimmer-effect"></div>
                                    <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-primary/10 to-purple-500/10"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-white/10 border-t-[#3E8AEA]/50 rounded-full animate-spin mb-4"></div>
                                        <p className="text-xs text-secondary font-medium">Processing...</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {results.map((result, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
                                >
                                    <img
                                        src={result.url}
                                        alt={`Generated result ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    
                                    {/* Watermark */}
                                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-md border border-white/10 pointer-events-none">
                                        <div className="flex items-center gap-1.5">
                                            <Sparkles className="w-3 h-3 text-[#3E8AEA]/90" />
                                            <span className="text-[10px] font-semibold text-white/80 tracking-tight">
                                                SelfieAt.ai
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                        <p className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-[#64AE87]" />
                                            {result.location}
                                        </p>
                                        <a
                                            href={result.url}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-[400px] flex flex-col items-center justify-center text-center border-2 border-dashed border-white/5 rounded-2xl">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                <Sparkles className="w-8 h-8 text-secondary" />
                            </div>
                            <p className="text-secondary">Generated masterpieces will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
