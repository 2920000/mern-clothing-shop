import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadSelector } from "../../../features/accountSlice";
import Loading from "../../../components/loading/Loading";
import LoginForm from "./LoginForm";

function Login() {
  const load = useSelector(loadSelector);
  return (
    <div className=" py-[50px] px-[30px] flex flex-col w-full   ">
      <h3 className="text-3xl font-bold">Đăng nhập</h3>
      <div className="flex flex-col w-full lg:items-end">
        <LoginForm />
        <div className="text-light_grey my-5">
          Khánh hàng mới? <Link to="/account/register">Đăng ký</Link>{" "}
        </div>
      </div>
      {load && (
       <Loading/>
      )}
    </div>
  );
}

export default Login;
