const handleDOM = (domObject) => {
  const { id, properties, changes, ref } = domObject;
  const element = ref?.current || document.querySelector(`#${id}`);
  if (Array.isArray(properties)) {
    properties.forEach((property, index) => {
      element.style[property] = changes[index];
    });
  } else {
    element.style[properties[0]] = changes[0];
  }
};

export default handleDOM;

const addClass=(element,arrayClass)=>{
  return element.classList.add(...arrayClass)
}
const removeClass=(element,arrayClass)=>{
  return element.classList.remove(...arrayClass)
}
const qs=(selector,parent=document)=>{
  return parent.querySelector(selector)
}
const qsa=(selector,parent=document)=>{
  return [...parent.querySelectorAll(selector)]
}

export {qs,addClass,removeClass,qsa}
