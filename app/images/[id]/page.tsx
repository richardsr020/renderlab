"use client";
import React from "react";
import { HiArrowLeft, HiPhotograph } from "react-icons/hi";
import ImageGallery from "../../../components/scripts/ImageGallery";
import { useRouter } from "next/navigation";

export default function ImagesPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <span><HiPhotograph className="text-blue-400 text-2xl" /></span>
          Images for script
        </h1>
        <button
          onClick={() => router.push("/scripts")}
          className="flex items-center gap-2 bg-gray-200/60 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-300/70 transition"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <HiArrowLeft className="text-lg" />
          Back to scripts
        </button>
      </div>
      <ImageGallery scriptId={params.id} />
    </div>
  );
}
