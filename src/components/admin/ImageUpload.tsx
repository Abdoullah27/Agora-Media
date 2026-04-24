import React, { useState, useRef } from "react";
import { UploadCloud, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // For LocalStorage simulation, we cap image size to ~1.5MB to avoid quota limits quickly
  const MAX_SIZE_MB = 1.5;

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }
    
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image is too large. For demo purposes, please keep it under ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result); // Pass the base64 string up
    };
    reader.onerror = () => {
      setError("Failed to read the file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div 
        className={`relative w-full border-2 border-dashed rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px] ${
          isDragging 
            ? "border-accent bg-accent/10" 
            : value 
              ? "border-accent/30 bg-background/50" 
              : "border-white/10 bg-background/50 hover:border-white/20"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
            // Reset input so the same file could be selected again if removed
            e.target.value = '';
          }}
        />

        {value ? (
          <div className="relative w-full h-full flex flex-col items-center">
            <img src={value} alt="Preview" className="max-h-48 object-cover rounded-lg shadow-lg" />
            <button 
              onClick={removeImage}
              className="absolute -top-3 -right-3 w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-display font-medium text-foreground mb-1">
              Click or drag an image to upload
            </p>
            <p className="text-xs text-muted-foreground">
              SVG, PNG, JPG or GIF (max. {MAX_SIZE_MB}MB)
            </p>
          </>
        )}
      </div>
      
      {error && <p className="text-xs text-destructive animate-pulse">{error}</p>}
    </div>
  );
};

export default ImageUpload;
