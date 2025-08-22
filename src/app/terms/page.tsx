export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-gray-400 mb-4">
        By using this platform, you agree to the following terms:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <p className="text-gray-400">
        This platform is for safe and legal code experimentation. 
        You may not run harmful, malicious, or illegal programs.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Code Storage</h2>
      <p className="text-gray-400">
        Code executions are saved in your account until you delete them. 
        We do not modify or remove them without your action.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Ownership</h2>
      <p className="text-gray-400">
        You retain ownership of all code you write and save. 
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Liability</h2>
      <p className="text-gray-400">
        We are not responsible for any damages or issues caused by running code on this platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="text-gray-400">
        For questions, contact us at 
        <a href="mailto:njayaswal55555@gmail.com" className="text-blue-400 underline ml-1">
          njayaswal55555@gmail.com
        </a>.
      </p>
    </div>
  );
}
