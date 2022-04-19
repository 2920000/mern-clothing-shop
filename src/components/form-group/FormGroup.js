export const FormGroup = ({ formProps }) => {
  return (
    <>
      {formProps.map((e, index) => (
        <div key={index} className="relative mb-3">
          <label className="block mb-1 font-semibold text-light_black" htmlFor={e.id}>
            {e.title}
          </label>
          <input
            style={e?.style}
            type={e.type}
            name={e.name}
            id={e.id}
            rules={e.rules}
            placeholder={e.placeholder}
            text={e.text}
            className="w-full border-[2px] focus:border-black border-border_input transition-all duration-300 px-2 py-1 outline-none placeholder:font-light  placeholder:text-[13.5px]"
          />
          <span className="error-message text-xs text-red "></span>
        </div>
      ))}
    </>
  );
};
