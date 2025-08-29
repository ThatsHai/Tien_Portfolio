import React from "react";
import { cancelRightClick } from "../utils/utilFunctions";

// import placeholderImage from "../../public/imgs/raccoon matcha4.png";
import placeholderImage from "/imgs/raccoon matcha4.png";

const email = "This is where I would put my email";
const greetings = "This is where I would put my greetings";
const jobs = "This is where I would put my jobs";
const media = {
  Twitter: "https://www.google.com/",
  Instagram: "https://www.google.com/",
  BlueSky: "https://www.google.com/",
};

const goToLink = (value) => {
  window.open(value, "_blank");
};

const SmallContactPage = () => {
  return "kjdfjkef";
};

const MediumContactPage = () => {
  return (
    <div className="pt-20 pb-10 md:pt-0 md:pb-0 md:h-[95vh] bg-black">
      <div className="w-full md:h-[80vh] grid grid-cols-1 md:grid-cols-3 items-center pt-2 px-6 md:gap-6 lg:gap-16">
        <img
          src={placeholderImage}
          alt="contact"
          className="max-w-full max-h-[60vh] object-contain"
          onContextMenu={cancelRightClick}
        />
        <div className="col-span-2 grid grid-cols-1 gap-6 pt-6 md:pt-0">
          <h2 className="text-4xl font-semibold">elliot</h2>
          <h3 className="text-xl font-bold underline">{email}</h3>
          <h4>{greetings}</h4>
          <h4>{jobs}</h4>
          <div className="grid grid-cols-1 gap-1">
            {Object.entries(media).map(([key, value]) => {
              return (
                <p key={key}>
                  {key}:{" "}
                  <span className="text-defaultPink hover:text-defaultRed">
                    <button onClick={() => goToLink(value)}>@elliot</button>
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="text-white font-montserrat">
      <div className="md:hidden">
        <SmallContactPage></SmallContactPage>
      </div>
      <div className="">
        <MediumContactPage></MediumContactPage>
      </div>
    </div>
  );
};

export default ContactPage;
