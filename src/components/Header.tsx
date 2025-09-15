// =============================== Header.tsx ===============================
// Composant d'en-tête principal : logo, navigation, login, sélection de langue.
// Gère l'affichage desktop et mobile (menu burger + drawer).

"use client";

import Link from "next/link";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";

// ========================== Types des props ==========================
export type NavItem = { href: string; label: string };
export type HeaderContent = {
  logoAlt: string;
  locale: "fr" | "de";
  nav: NavItem[];
  login: { label: string; href: string };
};

type HeaderProps = {
  basePath?: "" | "/de";
  content: HeaderContent;
};

// ========================== Composant principal ==========================
export default function Header({ basePath = "", content }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const toggleMenu = () => setIsOpen((v) => !v);
  const toggleLang = () => setLangOpen((v) => !v);

  const getHash = () =>
    typeof window !== "undefined" ? window.location.hash : "";

  const switchToGerman = () => {
    const hash = getHash();
    window.location.href = `/de${hash || ""}`;
  };
  const switchToFrench = () => {
    const hash = getHash();
    window.location.href = `/${hash || ""}`;
  };

  return (
    <header className="w-full bg-white h-28 px-8 flex items-center justify-between relative z-50 shadow-sm">
      {/* ========================== Logo ========================== */}
      <Link href={basePath || "/"}>
        <img
          src="/photos/logo/logo.png"
          alt={content.logoAlt}
          className="h-full w-auto max-w-[250px] object-contain"
        />
      </Link>

      {/* ========================== Menu Desktop ========================== */}
      <nav className="hidden lg:flex items-center gap-6 text-base font-semibold text-black">
        {content.nav.map(({ href, label }) => (
          <Link key={href} href={`${basePath}${href}`}>
            <span className="relative group">
              <span className="text-black group-hover:text-black transition-colors duration-300">
                {label}
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        ))}
      </nav>

      {/* ========================== Zone droite Desktop ========================== */}
      <div className="hidden lg:flex items-center gap-6 relative">
        <a
          href={content.login.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-black font-semibold hover:opacity-80"
        >
          <FiLogIn className="w-6 h-6" />
          {content.login.label}
        </a>

        {/* ========================== Dropdown Langues ========================== */}
        <div className="relative">
          <button
            onClick={toggleLang}
            title="Langue"
            className="focus:outline-none"
          >
            <img
              src={
                content.locale === "fr"
                  ? "/photos/french_logo.png"
                  : "/photos/german_logo.png"
              }
              alt={content.locale.toUpperCase()}
              className="w-6 h-6 rounded-full"
            />
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-50">
              <button
                onClick={switchToFrench}
                className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-black"
              >
                <img
                  src="/photos/french_logo.png"
                  alt="FR"
                  className="w-5 h-5 rounded-full mr-2"
                />
                Français
              </button>
              <button
                onClick={switchToGerman}
                className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-black"
              >
                <img
                  src="/photos/german_logo.png"
                  alt="DE"
                  className="w-5 h-5 rounded-full mr-2"
                />
                Deutsch
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================== Burger Button (Mobile) ========================== */}
      <button
        onClick={toggleMenu}
        className="lg:hidden flex items-center justify-center w-10 h-10"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <svg
          className="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* ========================== Overlay ========================== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ========================== Drawer Mobile ========================== */}
      <div
        className={`fixed top-0 right-0 h-full w-64 max-w-[80%] bg-white z-40 shadow-lg px-6 py-12 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <img
                src="/photos/logo/logo.png"
                alt={content.logoAlt}
                className="h-14 w-auto max-w-[160px] object-contain"
              />
              <button
                onClick={toggleMenu}
                className="text-gray-600 text-2xl font-bold"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            {/* ========================== Liens Mobile ========================== */}
            <nav className="flex flex-col gap-4 text-slate-700 font-medium">
              {content.nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={`${basePath}${href}`}
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* ========================== Langues Mobile ========================== */}
            <div className="relative mt-6">
              <button
                onClick={toggleLang}
                title="Langue"
                className="focus:outline-none"
              >
                <img
                  src={
                    content.locale === "fr"
                      ? "/photos/french_logo.png"
                      : "/photos/german_logo.png"
                  }
                  alt={content.locale.toUpperCase()}
                  className="w-6 h-6 rounded-full"
                />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-50">
                  <button
                    onClick={switchToFrench}
                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-black"
                  >
                    <img
                      src="/photos/french_logo.png"
                      alt="FR"
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    Français
                  </button>
                  <button
                    onClick={switchToGerman}
                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-black"
                  >
                    <img
                      src="/photos/german_logo.png"
                      alt="DE"
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    Deutsch
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ========================== Login Mobile ========================== */}
          <div className="mt-8 border-t pt-6">
            <a
              href={content.login.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-700 font-semibold hover:text-slate-900"
            >
              <FiLogIn className="w-5 h-5" />
              {content.login.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
// ============================
