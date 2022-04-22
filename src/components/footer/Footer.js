import React from "react";

function Footer() {
  const footerList = [
    {
      heading: "Liên hệ",
      content: ["lethanhhhhhha@gmail.com"],
    },
   
    // {
    //   heading: "Liên hệ",
    //   content: ["Liện hệ với chúng tôi", "lethanhhhhhha@gmail.com"],
    // },
    // {
    //   heading: "Liên hệ",
    //   content: ["Liện hệ với chúng tôi", "lethanhhhhhha@gmail.com"],
    // },
    // {
    //   heading: "Liên hệ",
    //   content: ["Liện hệ với chúng tôi", "lethanhhhhhha@gmail.com"],
    // },
  ];
  return (
    <div className="min-h-[300px] flex justify-center items-center border-t border-border mt-20">
      <Container>
        <div className="flex pt-14 justify-between">
          {footerList.map((element, index) => (
            <div className="flex flex-col items-center gap-2" key={index}>
              <h3 className="text-lg"> {element.heading}</h3>
              <div>
                {element.content.map((element, index) => (
                  <p key={index} className="text-sm pt-2 text-light_black ">{element}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Footer;

const Container = ({ children }) => {
  return <div className="max-w-[1200px] m-auto">{children}</div>;
};
