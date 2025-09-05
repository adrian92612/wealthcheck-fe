function Home() {
  return (
    <div>
      Home
      <button
        className="text-blue-500"
        onClick={() => (window.location.href = "http://localhost:5173/login")}
      >
        Login
      </button>
    </div>
  );
}

export default Home;
