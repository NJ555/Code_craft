export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Support</h1>
      <p className="text-gray-300 mb-4">
        Need help? We're here for you. 
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="text-gray-400">
        For support, email us at
        <a href="mailto:njayaswal55555@gmail.com" className="text-blue-400 underline ml-1">
          njayaswal55555@gmail.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">FAQ</h2>
      <ul className="list-disc list-inside text-gray-400">
        <li>How do I save my code? → Executions are saved automatically in your account.</li>
        <li>Can I share my code? → Not yet, sharing features will be added later.</li>
        <li>Do my snippets expire? → No, they stay in your account until you delete them.</li>
      </ul>
    </div>
  );
}
