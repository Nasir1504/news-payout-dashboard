'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/store/theme-provider';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/payouts', label: 'Payouts' },
  { href: '/analytics', label: 'Analytics' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full bg-gray-900 text-white shadow dark:bg-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <span className="text-lg font-bold">News Blog Manager</span>
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-yellow-300 ${
                pathname === item.href ? 'underline' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
