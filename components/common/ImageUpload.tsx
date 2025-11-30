"use client";

import { useRef } from "react";
import { X } from "lucide-react";

export default function ImageUpload({
  label = "Upload Image",
  file,
  setFile,
}: {
  label?: string;
  file: File | null;
  setFile: (v: File | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <div
        className="border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => fileRef.current?.click()}
      >
        {file ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="h-28 w-28 rounded-lg object-cover border shadow-sm"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-sm">Click to upload</p>
            <p className="text-xs text-gray-400">(PNG / JPG up to 2MB)</p>
          </div>
        )}

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}
