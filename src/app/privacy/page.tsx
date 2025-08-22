export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-400 mb-4">
        Your privacy is important to us. This policy explains how we handle your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="text-gray-400">
        We collect code you execute on this platform and basic profile information (if you log in).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Data</h2>
      <ul className="list-disc list-inside text-gray-400">
        <li>Store and display your code executions</li>
        <li>Improve platform performance</li>
        <li>Maintain service reliability and security</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
      <p className="text-gray-400">
        Your code and snippets are stored in your account until you choose to delete them.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="text-gray-400">
        You may request deletion of your account or data anytime by contacting us at 
        <a href="mailto:njayaswal55555@gmail.com" className="text-blue-400 underline ml-1">
          njayaswal55555@gmail.com
        </a>.
      </p>
    </div>
  );
}
