export default function Footer() {
  return (
    <footer className="py-8 text-center text-gray-500 border-t">
      <p>© {new Date().getFullYear()} MonSaaS. All rights reserved.</p>
      <div className="mt-4 space-x-4">
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <a href="/terms" className="hover:underline">Terms</a>
      </div>
    </footer>
  );
}
