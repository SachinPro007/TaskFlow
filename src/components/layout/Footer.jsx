import React from "react";
import { getContext } from "../../context/context";
import { FaGithub, FaTwitter, FaLinkedin, FaTasks } from "react-icons/fa";
import { NavLink } from "react-router";

function Footer() {
  const { theme, themeStyles } = getContext();

  return (
    <footer
      className={`mt-20 border-t transition-colors duration-300 backdrop-blur-md ${
        theme === "dark"
          ? "bg-[#0f1117]/80 border-gray-800"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                theme === "dark" ? "bg-purple-600/10" : "bg-blue-500/10"
              }`}
            >
              <FaTasks className="text-xl text-blue-500 dark:text-purple-400" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>

          {/* Tagline + Navigation (center) */}
          <div>
            <p className={`text-sm font-medium ${themeStyles.detail}`}>
              Productivity reimagined for modern workflows
            </p>
            <nav className="mt-3 flex justify-center space-x-6 text-sm font-semibold">
              <NavLink to="/" className="hover:text-blue-500 transition-colors">
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="hover:text-blue-500 transition-colors"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="hover:text-blue-500 transition-colors"
              >
                Contact
              </NavLink>
            </nav>
          </div>

          {/* Socials */}
          <div className="flex justify-center md:justify-end space-x-5 text-xl">
            <a
              href="https://github.com/SachinPro007"
              className="hover:text-purple-500 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-sky-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/sachinpro/"
              className="hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div
          className={`mt-10 border-t pt-6 text-center text-xs ${
            theme === "dark"
              ? "border-gray-700 text-gray-400"
              : "border-gray-300 text-gray-500"
          }`}
        >
          © {new Date().getFullYear()} TaskFlow • Crafted with ❤️ by{" "}
          <a href="https://www.linkedin.com/in/sachinpro/">
            <span className="text-blue-500 hover:text-blue-600 hover:underline">Sachin...</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
