export default function Features() {
  return (
    <div className="py-20 px-10 bg-gray-50 text-center">

      <h2 className="text-3xl font-bold mb-10">
        Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="p-6 bg-white shadow rounded-lg hover:scale-105 transition">
          <h3 className="font-semibold text-lg mb-2">📚 Smart Book Grouping</h3>
          <p>View books grouped with availability in real-time.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg hover:scale-105 transition">
          <h3 className="font-semibold text-lg mb-2">⚡ Fast Issue System</h3>
          <p>Request and issue books instantly with approval.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg hover:scale-105 transition">
          <h3 className="font-semibold text-lg mb-2">🔐 Secure Access</h3>
          <p>Role-based login for students and library owners.</p>
        </div>

      </div>
    </div>
  );
}