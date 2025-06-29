export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Rivera",
      quote: "RenderLab turned my script into a stunning visual story in minutes. The AI-generated shots are incredible!",
    },
    {
      name: "Morgan Lee",
      quote: "As a content creator, this platform saves me hours and boosts my creative output.",
    },
    {
      name: "Jamie Chen",
      quote: "The scene detection and visual script features are game-changers for storytellers.",
    },
  ];

  return (
    <section className="py-20 text-center bg-[#0a0a0a]">
      <h2
        className="text-3xl font-bold mb-10"
        style={{
          background: "linear-gradient(90deg, #a21caf 0%, #2563eb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        What Creators Say
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="max-w-xs p-6 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg text-white"
          >
            <p className="italic mb-4">“{t.quote}”</p>
            <p className="font-semibold">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
