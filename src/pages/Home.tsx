function Home() {
  return (
    <div>
      Home
      <button
        onClick={() => (window.location.href = "http://localhost:5173/login")}
      >
        Login
      </button>
    </div>
  );
}

export default Home;
