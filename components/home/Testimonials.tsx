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
    <section id="testimonials" className="py-20 text-center" style={{ background: "var(--background)" }}>
      <h2 className="text-3xl font-bold mb-10">What Creators Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="max-w-xs p-6 rounded shadow" style={{ background: "var(--background)" }}>
            <p className="italic mb-4">“{t.quote}”</p>
            <p className="font-semibold">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
