import { apiEndpoints } from "@/constants/apiEndpoints";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <Button>
        <Link to={apiEndpoints.auth.googleLogin}>Login with Google</Link>
      </Button>
    </div>
  );
};

export default Login;
