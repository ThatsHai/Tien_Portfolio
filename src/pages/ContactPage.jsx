import React from "react";
import { cancelRightClick } from "../utils/utilFunctions";

// import placeholderImage from "../../public/imgs/raccoon matcha4.png";
import placeholderImage from "/imgs/raccoon matcha4.png";

const email = "dkhiemvn.04@gmail.com";
const greetings = `I’m Đông Khiêm Elliot, an undergraduate Multimedia Communications student from Cần Thơ, Việt Nam.
I’m exploring 2D & 3D animation, illustration, and branding.
This portfolio gathers my works.`;
const jobs = "✨ Open for collaborations and opportunities!";
const media = {
  Facebook: "https://www.facebook.com/quynh.tien.338608/",
  Youtube: "https://www.youtube.com/@elliotnormalcy",
  Behance: "elliotnormalcyzzz",
  Instagram: "elliotnormalcyzzz",
};

const goToLink = (value) => {
  window.open(value, "_blank");
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
          <h2 className="text-4xl font-semibold">Đông Khiêm Elliot</h2>
          <h3 className="text-xl font-bold underline">{email}</h3>
          <h4 className="md:w-3/4">{greetings}</h4>
          <h4>{jobs}</h4>
          <div className="grid grid-cols-1 gap-1">
            {Object.entries(media).map(([key, value]) => {
              const isUpdating = value === "elliotnormalcyzzz";
              return (
                <p key={key}>
                  {key}:{" "}
                  <span className="text-defaultPink hover:text-defaultRed">
                    {isUpdating ? (
                      <span className="italic text-gray-400">updating…</span>
                    ) : (
                      <button onClick={() => goToLink(value)}>@elliot</button>
                    )}
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
      <div className="">
        <MediumContactPage></MediumContactPage>
      </div>
    </div>
  );
};

export default ContactPage;
