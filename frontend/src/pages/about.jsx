import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-3xl mx-0">
        {/* Profile Header */}
        <div className="text-left">
          <h1 className="text-4xl font-bold">Hey 👋, I'm Sanjiv Thapa</h1>
          <p className="text-gray-400 mt-2">
            🔭 A Tech Enthusiast who likes to play around with Computers and stuff
          </p>
        </div>

        {/* About Me Section */}
        <div className="mt-10 text-left">
          <h2 className="text-3xl font-semibold mb-6">💫 About Me:</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>🌱 I'm currently learning <strong>FastAPI, Django</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>👨‍💻 I'm currently learning how to code properly and I have at least learnt something, I think… 🤷‍♂️</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>💬 Ask me about <strong>anything, Except Maths 😅</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>📫 How to reach me <strong>thapasvt12@gmail.com</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">-</span>
              <span>⚡ Fun fact <strong>I use Arch btw</strong></span>
            </li>
          </ul>
        </div>

        {/* GitHub Stats Section */}
        <div className="mt-20 text-left">
          <h2 className="text-4xl font-bold">GitHub Streak</h2>
          <div className="mt-6 flex justify-start">
            <img
              src="https://camo.githubusercontent.com/9a0faded4de5a37cb65f732079d22def1f1e3e66b54295763581470b08addb36/68747470733a2f2f6e69727a616b2d73747265616b2d73746174732e76657263656c2e6170702f3f757365723d73616e6a69767468617061737674267468656d653d67727576626f7826686964655f626f726465723d66616c7365"
              alt="GitHub Streak"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}