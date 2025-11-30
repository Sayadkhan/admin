"use client";

import { X } from "lucide-react";

export default function MultiImageUpload({
  files,
  setFiles,
  label = "Upload Images",
}: {
  files: File[];
  setFiles: (v: File[]) => void;
  label?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <div className="grid grid-cols-3 gap-3">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              className="h-24 w-24 object-cover border rounded-lg shadow-sm"
            />
            <button
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => setFiles(files.filter((_, i) => i !== index))}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <label className="border-2 border-dashed rounded-xl h-24 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
          <p className="text-xs text-gray-500 text-center">Upload</p>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files || []);
              setFiles([...files, ...newFiles]);
            }}
          />
        </label>
      </div>
    </div>
  );
}
