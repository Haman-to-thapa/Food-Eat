import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <img
        src="https://www.shutterstock.com/image-vector/vector-flat-fashion-illustration-beautiful-600nw-2455221907.jpg"
        alt="Page Not Found"
        className="w-64 h-64 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! She's already married 💍</h1>
      <p className="text-gray-600 text-lg mb-6">Try searching for another girl... or maybe a better route 😉</p>
      <Link to="/">
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300">
          🔙 Back to Home
        </button>
      </Link>
    </div>
  )
}

export default PageNotFound
