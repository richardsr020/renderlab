export default function Features() {
  const features = [
    {
      title: "Script Input & Editing",
      desc: "Easily write or paste your video script to begin your creative journey.",
    },
    {
      title: "AI Scene Detection",
      desc: "Let our AI analyze your script and break it into key narrative scenes.",
    },
    {
      title: "Visual Script Generation",
      desc: "Get a detailed visual script with shot-by-shot breakdowns and camera angles.",
    },
    {
      title: "Cinematic Image Creation",
      desc: "Generate immersive, cinematic images for every scene using generative AI.",
    },
    {
      title: "Streamlined Workflow",
      desc: "Save time and boost your content’s visual impact with an intuitive, creator-focused platform.",
    },
  ];

  return (
    <section className="relative py-20 bg-[#0a0a0a] flex flex-col items-center">
      <h2
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
        style={{
          background: "linear-gradient(90deg, #a21caf 0%, #2563eb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        How RenderLab Works
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="max-w-xs w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2" style={{
              background: "linear-gradient(90deg, #a21caf 0%, #2563eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>{f.title}</h3>
            <p className="text-[#b0b0b0]">{f.desc}</p>
          </div>
        ))}
      </div>
      {/* Gradient Glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-gradient-to-r from-purple-700 via-pink-500 to-blue-700 opacity-20 blur-3xl pointer-events-none"></div>
    </section>
  );
}
