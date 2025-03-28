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
        <div className="mt-20 text-left">
      <h2 className="text-4xl font-bold">GitHub Streak</h2>
      <img 
        src="https://camo.githubusercontent.com/9a0faded4de5a37cb65f732079d22def1f1e3e66b54295763581470b08addb36/68747470733a2f2f6e69727a616b2d73747265616b2d73746174732e76657263656c2e6170702f3f757365723d73616e6a69767468617061737674267468656d653d67727576626f7826686964655f626f726465723d66616c7365" 
        alt="GitHub Streak"
        className="mt-10"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
      </div>
    </div>
  );
}
