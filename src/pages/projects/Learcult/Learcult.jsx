import React, { useState, useEffect, useRef } from "react";
import { cancelRightClick } from "../../../utils/utilFunctions";
import {
  ProjectCredit,
  ProjectName,
  MidNote,
  LeftNote,
} from "../ProjectCredit";
import ImageWithSkeleton from "../ImageWithSkeleton";
import ImageReview from "../../../components/ImageReview";
import avatarFrame from "./avatarFrame.png";
import avatarFrame2 from "./avatarFrame2.png";
import pin_cam2 from "./pin_cam2.jpg";
import avatar from "./avatar.png";

const bgColorGreen = "#6CC180";
const bgColorOrange = "E43B12";

const projectName = "Learcult";
const introduction =
  "The Learcult is a non-profit project founded in 2024 by high school students to promote and preserve cultural identity.";
const contribution =
  "* Head of Design. I created all of the following illustrations.";

const Learcult = () => {
  const [openReviewImage, setOpenReviewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const targetTop = targetRef.current.offsetTop;

        // adjust offset based on screen width
        let offset = 0;
        if (window.innerWidth > 1200) {
          offset = 400; // trigger earlier on big screens
        } else if (window.innerWidth > 768) {
          offset = 250; // medium devices
        } else {
          offset = 150; // small devices
        }

        setScrolled(window.scrollY >= targetTop - offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    setOpenReviewImage(true);
  };

  return (
    <div
      className={`text-white font-montserrat my-2 rounded-lg ${
        scrolled ? "bg-[#E43B12]" : "bg-[#6CC180]"
      }`}
    >
        <img src={avatar} className="fixed w-16 md:w-36 bottom-4 right-8 animate-floating" draggable="false"/>
      <ProjectName text={projectName}></ProjectName>
      <ProjectCredit text={introduction}></ProjectCredit>
      <p className="text-center text-sm italic">{contribution}</p>
      <div className="py-8">
        <MidNote text={"CAMPAIGN 1: INTRODUCTION"}></MidNote>

        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-2 gap-1 w-[810px] max-w-4xl">
            <div className="col-span-2 aspect-[16/9]">
              <ImageWithSkeleton
                src={
                  "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/451325957_381637188363961_1176797318288701024_n.png?_nc_cat=110&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=dHLzLyQ7YFUQ7kNvwGxOtkC&_nc_oc=Adn87fz0oW5BYFGQarl0ULSipDiVWnuwOx5H5iZbQUWHfauH6sEkVnPSJawao8kStl0&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=xGRYMvm34En5iDzzcTWp0g&oh=00_AfZKiodakEWAXASJIWam53YuZIvyRRlBHhO-F4NIyZUvTw&oe=68C0C40C"
                }
                alt="Learcult-cover-1"
                onClick={() =>
                  handleSelectImage({
                    src: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/451325957_381637188363961_1176797318288701024_n.png?_nc_cat=110&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=dHLzLyQ7YFUQ7kNvwGxOtkC&_nc_oc=Adn87fz0oW5BYFGQarl0ULSipDiVWnuwOx5H5iZbQUWHfauH6sEkVnPSJawao8kStl0&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=xGRYMvm34En5iDzzcTWp0g&oh=00_AfZKiodakEWAXASJIWam53YuZIvyRRlBHhO-F4NIyZUvTw&oe=68C0C40C",
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>

            {[
              "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/474474211_122216801180194552_1326735324812401098_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JP_6nv1uFmUQ7kNvwGYZ4T7&_nc_oc=Adml3-RVqKIj-4vEUTfYTcP3PzoJ5aizoHEppyFSUryeQVJ4KzmKXdY1EhXEJSGbZnI&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AFcrFTdcThN3pVrKRX-IJA&oh=00_AfYVFko3YXcJbkh5R9cpukjt9xy7nLRdWkPDm2Tp2_gMgw&oe=68C0A862",
              "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/475058207_122217731450194552_298624696419411320_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=LGCfB4DYH58Q7kNvwGX2P3C&_nc_oc=AdmH3ciiV591NpEoyuigP4iMW4_KWsTQtkcOKktr0ugWixZWNUYC5QFOcc1nMsnkNkU&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=mYgBx8HgTUkUhpG3N8cK6A&oh=00_AfZfDtAGg6VNU9zHRaGxWi2f1hPIN-ZJ4TRNG5MWaVZFsg&oe=68C0B519",
              "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/475715118_122218614212194552_6051131889393994682_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GMXMP-9iNt4Q7kNvwGdJf2H&_nc_oc=AdkXjrOvug__-4nJlgnFYR5o2ZrHaTEoPIF6aWCLlvbe-S32Zbz-eWBil-DclDxYgYM&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=wygnWm_iRhyY2aJNZPhaXg&oh=00_AfZfVzR_vSzT9chkboBy0GTwgYuNC_4CbkTXyq-zpyyCxw&oe=68C0CAE0",
              avatarFrame,
            ].map((url, i) => (
              <div key={i} className="aspect-square">
                <ImageWithSkeleton
                  src={url}
                  onClick={() =>
                    handleSelectImage({ src: url, w: 600, h: 600 })
                  }
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8" ref={targetRef}>
        <MidNote text={"CAMPAIGN 2: QUAN SAN"}></MidNote>
        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-2 gap-1 w-[804px] max-w-4xl">
            <div className="col-span-2 aspect-[16/9]">
              <ImageWithSkeleton
                src={
                  "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/481548747_122226636050194552_8414934974701304456_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=gSjwlsTISU4Q7kNvwH2VDjA&_nc_oc=AdnDycLOsCqyOfXe45yOJxkv5SvtS57E4d1tAbh09X6dn7kaY3ZizsoFJcgSmkqlKbg&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=4ANByqIGqtz0VbSP9MqR1g&oh=00_AfaASz7_JoD_pp6t9ko0WEdPNuYEq6gkdWd-xitS7Np31w&oe=68C0CC15"
                }
                alt="Learcult-cover-1"
                onClick={() =>
                  handleSelectImage({
                    src: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/481548747_122226636050194552_8414934974701304456_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=gSjwlsTISU4Q7kNvwH2VDjA&_nc_oc=AdnDycLOsCqyOfXe45yOJxkv5SvtS57E4d1tAbh09X6dn7kaY3ZizsoFJcgSmkqlKbg&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=4ANByqIGqtz0VbSP9MqR1g&oh=00_AfaASz7_JoD_pp6t9ko0WEdPNuYEq6gkdWd-xitS7Np31w&oe=68C0CC15",
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>
            <div className="col-span-2 [3507/2480]">
              <ImageWithSkeleton
                src={avatarFrame2}
                alt="Learcult-cover-1"
                onClick={() =>
                  handleSelectImage({
                    src: avatarFrame2,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>

            {[
              "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/475966826_122220048110194552_4997496283764188740_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=E30kUJZ2ikoQ7kNvwGeFSnE&_nc_oc=AdkCzohlERNRiJyXVhazK-pubOl4o_ZqB2o2SijJ79yRgRVRqAZLUunyVYoxYrmZyWI&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=HgSrqjax2i8NDrmtV89U7g&oh=00_AfZa80vprzzy30293tNWCO0BK478m6d0Hlo7qTX4jXm1Xw&oe=68C0AE59",
              pin_cam2,
            ].map((url, i) => (
              <div key={i} className="aspect-square">
                <ImageWithSkeleton
                  src={url}
                  onClick={() =>
                    handleSelectImage({ src: url, w: 600, h: 600 })
                  }
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {openReviewImage && (
        <ImageReview
          image={selectedImage}
          setOpenReviewImage={setOpenReviewImage}
        />
      )}
    </div>
  );
};

export default Learcult;
