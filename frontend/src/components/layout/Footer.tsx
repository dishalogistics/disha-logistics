export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Disha Logistics. All rights reserved.</p>
        <div className="mt-2 text-sm text-gray-400">
          <span>Gorakhpur • Pan India</span>
        </div>
      </div>
    </footer>
  );
}