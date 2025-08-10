"use client";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import AudioPlayer from "../../../components/scripts/AudioPlayer";
import { useRouter } from "next/navigation";

export default function AudioPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Audio for script</h1>
        <button
          onClick={() => router.push("/scripts")}
          className="flex items-center gap-2 bg-gray-200/60 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-300/70 transition"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <HiArrowLeft className="text-lg" />
          Back to scripts
        </button>
      </div>
      <AudioPlayer scriptId={params.id} />
    </div>
  );
}
