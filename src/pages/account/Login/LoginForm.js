import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartApi from "../../../api/cartApi";
import { FormGroup } from "../../../components/form-group/FormGroup";
import {
  CLEAR_ERRORMESSAGE,
  errorMessageSelector,
  postAccount,
  userSelector,
} from "../../../features/accountSlice";
import { fetchCart} from "../../../features/cartSlice";
import {
  addLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  validateForm,
} from "../../../helper";
import formProps from "../form-group/login";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const cartFromLocal = getLocalStorage("cart");

  const handleSubmit = (e) => {
    e.preventDefault();
    const canAllowLogin = validateForm.validate();
    if (!canAllowLogin) {
      const values = validateForm.getAllValues();
      const payload = {
        option: "login",
        data: values,
      };
      dispatch(postAccount(payload));
    }
  };

  useEffect(() => {
    validateForm("login-form");
    errorMessage && validateForm.addErrorMessage(errorMessage, "login-form");
    if (user?.login === "success") {
      addLocalStorage("profile", user);
      const userId = user._id;
      const payload = {
        userId,
        cartDataFromLocal: cartFromLocal,
      };
   
      const addProductToDatabase = async () => {
        const res = await cartApi.add(payload);
        if (res) {
          removeLocalStorage("cart");
          dispatch(fetchCart(userId));
        }
      };
      cartFromLocal && addProductToDatabase();
      navigate("/");
    }
    return () => dispatch(CLEAR_ERRORMESSAGE(""));
  });

  return (
    <form id="login-form" className="  w-full mt-5 lg:w-1/2">
      <FormGroup formProps={formProps} type="login" />
      <div className="flex justify-between items-center">
        <button
          onClick={handleSubmit}
          className="border border-black px-2 py-1.5 text-sm"
        >
          Đăng nhập
        </button>
        <p className="text-sm font-bold text-light_grey">Quên mật khẩu?</p>
      </div>
    </form>
  );
};
export default memo(LoginForm);
