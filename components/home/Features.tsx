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
    <section id="features" className="py-20 text-center" style={{ background: "var(--background)" }}>
      <h2 className="text-3xl font-bold mb-10">How RenderLab Works</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {features.map((f, i) => (
          <div key={i} className="max-w-xs">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
