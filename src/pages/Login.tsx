const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const LOGIN_EP = "/auth/google";

  return (
    <div>
      Login
      <button onClick={() => (window.location.href = API_BASE_URL + LOGIN_EP)}>
        Login via Google
      </button>
    </div>
  );
};

export default Login;
