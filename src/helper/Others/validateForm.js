const validateForm = (formId) => {
  let isError;
  const formElement = document.querySelector(`#${formId}`);
  const allInputs = formElement.querySelectorAll(`[rules]`);
  formElement &&
    allInputs.forEach((inputElement) => {
      onchangeInput(inputElement, isError);
      // onblurInput(inputElement, isError);
    });
  validateForm.validate = () => {
    for (let inputElement of allInputs) {
      isError = validateInput(inputElement, isError, inputElement.value);
      if (isError) {
        return true;
      }
    }
  };
  validateForm.getAllValues = () => {
    const values = {};
    allInputs.forEach((inputElement) => {
      values[inputElement.name] = inputElement.value;
    });
    return values;
  };
  validateForm.addErrorMessage = (error, formId) => {
    const formElement = document.querySelector(`#${formId}`);
    const errorInputElement = formElement.querySelector(
      `#${Object.keys(error)[0]}`
    );

    const errorMessage =
      errorInputElement.parentElement.querySelector(".error-message");

    errorMessage.innerHTML = error[Object.keys(error)[0]];
  };
  validateForm.clearValue = () => {
    allInputs.forEach((inputElement) => {
      inputElement.value = "";
      inputElement.blur();
    });
  };
};

export default validateForm;

const onchangeInput = (inputElement, isError) => {
  inputElement.oninput = (e) => {
    const value = e.target.value;
    validateInput(inputElement, isError, value);
  };
};
// const onblurInput = (inputElement, isError) => {
//   inputElement.onblur = (e) => {
//     const value = e.target.value;
//     validateInput(inputElement, isError, value);
//   };
// };

const validateInput = (inputElement, isError, value) => {
  const rules = inputElement.getAttribute("rules");
  const text = inputElement.getAttribute("text");
  const rulesArray = rules.split("|");
  for (let rule of rulesArray) {
    const ruleArray = rule.split(":");
    const firstRule = ruleArray[0];
    const secondRule = ruleArray[1];
    isError = switchFunction(inputElement, text, firstRule, secondRule, value);
    if (isError) {
      return true;
    }
  }
};

// switch case
const switchFunction = (inputElement, text, firstRule, secondRule, value) => {
  let errorElement = inputElement.parentElement.querySelector(".error-message");
  switch (firstRule) {
    case "required":
      if (value) {
        errorElement.innerHTML = "";
        inputElement.style.border = "2px solid #e0dede";
      } else {
        errorElement.innerHTML = `Vui lòng điền mục này`;
        cssError(errorElement, inputElement);
        return true;
      }
      break;
    case "email":
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        errorElement.innerHTML = "";
      } else {
        errorElement.innerHTML = `Vui lòng điền đúng định dạng email`;
        cssError(errorElement);
        return true;
      }
      break;
    case "min":
      if (Number(value.length) < secondRule) {
        errorElement.innerHTML = `Bạn cần nhập đủ ${secondRule} ký tự`;
        cssError(errorElement, inputElement);
        return true;
      } else {
        errorElement.innerHTML = "";
      }
      break;
    case "phone":
      if (!isValidPhone(value)) {
        errorElement.innerHTML = `Số điện thoại không hợp lệ`;
        cssError(errorElement, inputElement);
        return true;
      } else {
        errorElement.innerHTML = ``;
      }
      break;
    default:
  }
};

const cssError = (errorElement, inputElement) => {
  errorElement.style.fontSize = "12px";
  errorElement.style.color = "red";
  errorElement.style.marginTop = "5px";
  inputElement.style.border = "2px solid red";
  inputElement.classList.add("placeholder-red");
};

const isValidPhone = (phone) =>
  /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g.test(
    phone
  );
