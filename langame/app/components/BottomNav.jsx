import Link from 'next/link';

const BottomNavbar = () => (
  <nav className="fixed bottom-0 w-full h-16 flex items-center justify-center bg-gray-800 text-white text-sm font-semibold">
    <Link href="/dashboard" className="flex-1 text-center hover:text-gray-400">
      <span className="mr-2">Home</span>
    </Link>
    <Link href="/scoreboard" className="flex-1 text-center hover:text-gray-400">
      <span className="mr-2">Scoreboard</span>
    </Link>
    <Link href="/profile" className="flex-1 text-center hover:text-gray-400">
      Profile
    </Link>
  </nav>
);

export default BottomNavbar;
