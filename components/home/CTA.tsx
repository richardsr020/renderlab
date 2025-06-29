export default function CTA() {
  return (
    <section className="py-20 text-center bg-[#0a0a0a]">
      <h2
        className="text-3xl font-bold mb-4"
        style={{
          background: "linear-gradient(90deg, #a21caf 0%, #2563eb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Ready to bring your story to life?
      </h2>
      <p className="mb-8 text-white">
        Sign up and start generating cinematic narrative videos with AI.
      </p>
      <a
        href="#"
        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
      >
        Get Started
      </a>
    </section>
  );
}
