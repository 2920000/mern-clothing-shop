import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "../../../components/form-group/FormGroup";
import { errorMessageSelector, postAccount } from "../../../features/accountSlice";
import { validateForm } from "../../../helper";
import formProps from "../form-group/register";


const RegisterForm = () => {
    const dispatch=useDispatch()
    const errorMessage = useSelector(errorMessageSelector);
    useEffect(() => {
      validateForm("register-form");
    });
    useEffect(() => {
      errorMessage && validateForm.addErrorMessage(errorMessage,"register-form");
    });
  
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const isAllowRegister = validateForm.validate();
      if (!isAllowRegister) {
        const values=validateForm.getAllValues();
        const payload={
          option:'register',
          data:values
        }
        dispatch(postAccount(payload))
      }
    };
    return (
      <form id="register-form" className=" w-full mt-5 lg:w-1/2">
        <FormGroup formProps={formProps} />
        <div className="flex justify-between items-center">
          <button
            onClick={handleSubmit}
            className="border border-black px-2 py-1.5 text-sm"
          >
            Đăng ký
          </button>
        </div>
      </form>
    );
  };

  export default memo(RegisterForm)