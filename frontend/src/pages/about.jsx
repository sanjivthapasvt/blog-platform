export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold">Hey 👋, I'm Sanjiv Thapa</h1>
          <p className="text-gray-400 mt-2">
            🔭 A Tech Enthusiast who likes to play around with Computers and
            stuff
          </p>
        </div>

        {/* About Me Section */}
        <div className="mt-10 text-left">
          <h2 className="text-3xl font-semibold mb-6">💫 About Me:</h2>
          <p className="mt-4 text-gray-300 mt-6">
            - 🌱 I’m currently learning **FastAPI, Django**{" "}
          </p>
          <p className="mt-4 text-gray-300 mt-6">
            - 👨‍💻 I’m currently learning how to code properly and I have at least
            learnt something, I think… 🤷‍♂️
          </p>
          <p className="mt-4 text-gray-300 mt-6"></p>- 💬 Ask me about **anything,
          Except Maths 😅**
          <p className="mt-4 text-gray-300 mt-6">
            - 📫 How to reach me **thapasvt12@gmail.com**
          </p>
          <p className="mt-4 text-gray-300 mt-6">- ⚡ Fun fact **I use Arch btw**</p>
          
          <p className="mt-4 text-gray-300 mt-6">Will write later lol</p>
        </div>
      </div>
    </div>
  );
}
