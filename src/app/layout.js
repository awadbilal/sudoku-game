import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sudoku Master',
  description: 'Generated by Bilal Avvad @AwadBilal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <div
        className={`w-full h-screen flex justify-center align-middle ${inter.className}`}
      >
        {children}
      </div>
    </html>
  );
}