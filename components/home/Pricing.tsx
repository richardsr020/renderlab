export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "€9",
      features: ["1 project", "5 users", "Basic support"],
    },
    {
      name: "Pro",
      price: "€29",
      features: ["10 projects", "25 users", "Priority support"],
    },
    {
      name: "Enterprise",
      price: "€99",
      features: ["Unlimited projects", "Unlimited users", "Dedicated support"],
    },
  ];

  return (
    <section id="pricing" className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-10">Our Plans</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan, i) => (
          <div key={i} className="max-w-xs p-6 border rounded shadow">
            <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
            <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg">/month</span></p>
            <ul className="mb-6 text-left">
              {plan.features.map((f, j) => (
                <li key={j} className="mb-2">✅ {f}</li>
              ))}
            </ul>
            <a href="/signup" className="block px-4 py-2 bg-blue-600 text-white rounded">Choose</a>
          </div>
        ))}
      </div>
    </section>
  );
}
