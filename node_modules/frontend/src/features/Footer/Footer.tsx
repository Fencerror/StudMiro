

export default function Footer() {
  return (
    <footer className="bg-[#4e4d4b] text-white py-4 flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4 mb-4">
          <a
            href="https://t.me/fencerror"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
          </a>
          <p className="text-sm">StudMiro. Разработано в 2025 году.</p>
        </div>
      </div>
    </footer>
  );
}

