import React, { useState, useEffect, useRef } from "react";
import { cancelRightClick } from "../../../utils/utilFunctions";
import {
  ProjectCredit,
  ProjectName,
  MidNote,
  LeftNote,
} from "../ProjectCredit";
import ImageWithSkeleton from "../../../components/ImageWithSkeleton";
import ImageReview from "../../../components/ImageReview";
import avatarFrame from "./avatarFrame.png";
import partingWords from "./partingWords.png";
import jellyfish from "./jellyfish.png";

const bgColor = "#2B548C";

const projectName = "Latibule Season 3";
const introduction =
  "Latibule is a non-profit project for academical psychology.";
const contribution =
  "* Vice President of the Design Team. I created all of the following illustrations.";

const Jellyfish = () => {
  //Jellyfish logic
  const imgRef = useRef(null);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Move to a random spot (in px)
  const move = () => {
    if (dragging.current) return;
    const margin = 100; // avoid edges; tweak to match image size
    const top = Math.random() * (window.innerHeight - margin * 2) + margin;
    const left = Math.random() * (window.innerWidth - margin * 2) + margin;
    setPosition({ top: `${Math.round(top)}px`, left: `${Math.round(left)}px` });

    timeoutRef.current = setTimeout(move, 10000 + Math.random() * 4000);
  };

  //When first mounts
  const startWandering = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // small rest before first wander (so it doesn't jump immediately after drag)
    timeoutRef.current = setTimeout(move, 3000 + Math.random() * 1500);
  };

  // initialize numeric px center on mount (so position values are px, not %)
  useEffect(() => {
    const init = () => {
      const imgW = imgRef.current?.offsetWidth ?? 128;
      const imgH = imgRef.current?.offsetHeight ?? 128;
      const left = Math.round((window.innerWidth - imgW) / 2);
      const top = Math.round((window.innerHeight - imgH) / 2);
      setPosition({ top: `${top}px`, left: `${left}px` });
    };
    init();
    startWandering();
    const onResize = () => {
      // keep position within viewport on resize
      setPosition((pos) => {
        const pxTop = parseInt(String(pos.top || "0"), 10) || 0;
        const pxLeft = parseInt(String(pos.left || "0"), 10) || 0;
        const maxTop = Math.max(0, window.innerHeight - 80);
        const maxLeft = Math.max(0, window.innerWidth - 80);
        return {
          top: `${Math.min(pxTop, maxTop)}px`,
          left: `${Math.min(pxLeft, maxLeft)}px`,
        };
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pointer (mouse + touch) handlers
  const handlePointerDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    setIsDragging(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // get bounding rect to calculate offset from pointer to element top-left
    const rect = imgRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // capture pointer if available (helps with some browsers)
    try {
      imgRef.current.setPointerCapture?.(e.pointerId);
    } catch (err) {
      console.log(err);
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    // set position so top-left aligns with pointer minus offset (keeps where user grabbed)
    const left = Math.round(e.clientX - offset.current.x);
    const top = Math.round(e.clientY - offset.current.y);

    // clamp inside viewport (optional)
    const minLeft = 0;
    const minTop = 0;
    const maxLeft = Math.max(
      0,
      window.innerWidth - (imgRef.current?.offsetWidth ?? 80)
    );
    const maxTop = Math.max(
      0,
      window.innerHeight - (imgRef.current?.offsetHeight ?? 80)
    );

    setPosition({
      left: `${Math.min(Math.max(left, minLeft), maxLeft)}px`,
      top: `${Math.min(Math.max(top, minTop), maxTop)}px`,
    });
  };

  const handlePointerUp = (e) => {
    dragging.current = false;
    setIsDragging(false);

    try {
      imgRef.current.releasePointerCapture?.(e.pointerId);
    } catch (err) {
      console.log(err);
    }

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);

    // restart wandering but give it a little rest so it doesn't jump immediately
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(move, 60000 + Math.random() * 2000);
  };
  return (
    <div
      // wrapper handles top/left and transition
      className={`fixed w-16 md:w-36 ${
        isDragging ? "" : "transition-all duration-[1200ms] ease-in-out"
      }`}
      style={position}
    >
      <img
        ref={imgRef}
        src={jellyfish}
        draggable="false"
        onPointerDown={handlePointerDown}
        className="w-full animate-wobble cursor-grab animate-floating"
        // change cursor while grabbing
        style={{ touchAction: "none" }}
        alt="jellyfish"
      />
    </div>
  );
};

const Latibule = () => {
  const [openReviewImage, setOpenReviewImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    setOpenReviewImage(true);
  };

  return (
    <div className="text-white font-montserrat bg-[#2B548C] my-2 rounded-lg">
      <div>
        <div className="hidden md:block">
          <Jellyfish></Jellyfish>
        </div>
        <div className="md:hidden fixed bottom-4 right-8">
          <img
            src={jellyfish}
            draggable="false"
            className="animate-wobble cursor-grab animate-floating w-16"
            alt="jellyfish"
          />
        </div>
      </div>
      <ProjectName text={projectName}></ProjectName>
      <ProjectCredit text={introduction}></ProjectCredit>
      <p className="text-center text-sm italic">{contribution}</p>
      <div className="py-8">
        <MidNote text={"CAMPAIGN 1: Eunoia"}></MidNote>

        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          {/* Left big image */}
          <div className="w-[600px] aspect-square">
            <ImageWithSkeleton
              src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/480043306_984958990284308_4019239646737629487_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=mX0Js6adWoAQ7kNvwGdS7KL&_nc_oc=AdnTlKbEWtFbELuw6NgR-658vVxiT8nHqRKqutzA9u_qtM41X5M-IDv5ATkf5aIIwRo&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=TjWrT_Rf_Yt9uQcdYuVE3A&oh=00_AfZ7raUV-yiPTJXKx5y9ShRtKlmjq7eIGd_TAbS1RNgpOg&oe=68BFA655"
              onClick={() =>
                handleSelectImage({
                  src: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/480043306_984958990284308_4019239646737629487_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=mX0Js6adWoAQ7kNvwGdS7KL&_nc_oc=AdnTlKbEWtFbELuw6NgR-658vVxiT8nHqRKqutzA9u_qtM41X5M-IDv5ATkf5aIIwRo&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=TjWrT_Rf_Yt9uQcdYuVE3A&oh=00_AfZ7raUV-yiPTJXKx5y9ShRtKlmjq7eIGd_TAbS1RNgpOg&oe=68BFA655",
                  w: 600,
                  h: 600,
                })
              }
              alt="Latibule-main"
              className="w-full h-full object-cover rounded-md cursor-pointer"
              onContextMenu={cancelRightClick}
              draggable={false}
            />
          </div>

          {/* Right column (3 smaller images stacked) */}
          <div className="flex flex-col gap-1 w-[200px]">
            {[
              "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/480571920_986290466817827_2964836991566050860_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Oh7Bp2vqgsEQ7kNvwFoyBXP&_nc_oc=AdkgqDcGnPq6WUngCI1uBO-QIODgn47sW8xVrCXrnOyS4faam0RX5BDQdAgK3mIV7bI&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=vs88V82o5uQ2pS1MH40abg&oh=00_AfanfSk9zdWF3JNN7dEu0152sAMf9Wz6Xkbm5Ch4o0D-CQ&oe=68BFA772",
              "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/481230657_989482026498671_4238564586367499315_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XMl1F_cqqvUQ7kNvwEydLQ8&_nc_oc=AdnPWiz1G6w8BFGjf32sRAACkGyD3xxtCQT2B2uVBBLztpSHu4VWlSzDzS7l_MUQAew&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=6ry9kSFj-E0DVPsH5-qi3A&oh=00_AfZYR34MKUzelC9CEBg7DOozlWfRBYfXbkEpozO4lKeTnA&oe=68BFBC61",
              "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/480672796_990042499775957_2945962384599487890_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=7tqmr7FJ3lMQ7kNvwEMHbcz&_nc_oc=AdlH8qWJldNccLZpfrbHqqflofAhgZfB9SsueFp5lViu7F8KsRx5njIuw3K8FUs--vQ&_nc_zt=23&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=8xEKa9wlVoifezirlLcYwg&oh=00_AfY5j1yvbbDTvgGo6_VfrPM9zX1xlUFSErJPMK8afB5ANw&oe=68BFB20D",
            ].map((url, i) => (
              <div key={i} className="w-full aspect-[4/3]">
                <ImageWithSkeleton
                  src={url}
                  onClick={() =>
                    handleSelectImage({ src: url, w: 400, h: 300 })
                  }
                  alt={`Latibule-${i}`}
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8">
        <MidNote text={"CAMPAIGN 2: Sea Signs"}></MidNote>
        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-3 gap-1 w-[804px] max-w-4xl">
            {/* Left column: 2 stacked square images */}
            <div className="flex flex-col gap-1 w-full row-span-2">
              {[
                "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/480497630_990051946441679_8045478206173053321_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=uJ7SPZpuu50Q7kNvwGvuWEa&_nc_oc=AdkWPzxuaz-jJKlhEwmH9dAoTQEAceXi7lVEeS2dxaqILCUNfWhXC5oE0z9Z6Prn2Bc&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=vJKnLv_9f3TZ64eZ4AbTNg&oh=00_AfYeXdpdDiY-qd9esbYP2kgOUzdwOos82ukydXDlA6A3MQ&oe=68BF8BFF",
                "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/441580691_806683491445193_3391974160342045865_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=AWzPVqmub74Q7kNvwEGTxLW&_nc_oc=Adn5vBPiKA2VNyIks2Mu3NgXDRgxk7elt7TzSHDAc1i45jE48Tcwl4EUYu1WtT3Jtks&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=8NLaTxjlSRO3m7g13zPT7g&oh=00_Afbxk3lqv1N9LkpthjzgKucJFja_lX4mr9w1QRi8EVecUw&oe=68BFA0F0",
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

            {/* Right column: big image spanning 2 rows & 2 cols */}
            <div className="col-span-2 row-span-2">
              <div className="aspect-square w-full h-full">
                <ImageWithSkeleton
                  src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/480901594_990534033060137_4242984177987660547_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=TKzBqIafBZoQ7kNvwE9CjZf&_nc_oc=AdlPddJxj7MKcABcOEaHjjnrP_4EVn2BzPlN_y0qqRVRQNIrrIeYYCsmS1mUaLHcL5A&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=Rbwkm1QJ5hgJvaksQs3uPQ&oh=00_AfaBvST_RaMaCp4UWYI1evXf2N71WrpUfv0Z7HW8QEjQsg&oe=68BFABFA"
                  onClick={() =>
                    handleSelectImage({
                      src: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/480901594_990534033060137_4242984177987660547_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=TKzBqIafBZoQ7kNvwE9CjZf&_nc_oc=AdlPddJxj7MKcABcOEaHjjnrP_4EVn2BzPlN_y0qqRVRQNIrrIeYYCsmS1mUaLHcL5A&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=Rbwkm1QJ5hgJvaksQs3uPQ&oh=00_AfaBvST_RaMaCp4UWYI1evXf2N71WrpUfv0Z7HW8QEjQsg&oe=68BFABFA",
                      w: 600,
                      h: 600,
                    })
                  }
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onContextMenu={cancelRightClick}
                  draggable={false}
                />
              </div>
            </div>

            {/* Cover image spanning full width */}
            <div className="col-span-3 aspect-[16/9]">
              <ImageWithSkeleton
                src={
                  "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/441569162_806685074778368_129441567954692955_n.png?stp=dst-png_p180x540&_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=jU23TVHEJl0Q7kNvwHpJOYO&_nc_oc=AdmdWb785daFA7ERSToIodfo3WMSMJtLjdW4_bJr_u6nZ6pZlLfAbV_--JjgAzb_3Ko&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=qz4EA2MoonL17-vUz10QPg&oh=00_Afbpk19gpOGPHrbVmF6YUxtYBRCgt2A2yxbVBsNU3Onyew&oe=68BFCBD9"
                }
                alt="Latibule-cover"
                onClick={() =>
                  handleSelectImage({
                    src: "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/441569162_806685074778368_129441567954692955_n.png?stp=dst-png_p180x540&_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=jU23TVHEJl0Q7kNvwHpJOYO&_nc_oc=AdmdWb785daFA7ERSToIodfo3WMSMJtLjdW4_bJr_u6nZ6pZlLfAbV_--JjgAzb_3Ko&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=qz4EA2MoonL17-vUz10QPg&oh=00_Afbpk19gpOGPHrbVmF6YUxtYBRCgt2A2yxbVBsNU3Onyew&oe=68BFCBD9",
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>

            {/* Bottom 3 images side by side */}
            {[
              "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/480749655_990684209711786_3602569928250457335_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-AksWi0RAcIQ7kNvwHZs6uF&_nc_oc=AdnKHXkgrB0L8fX76wJwKeYs4EL_SklL7ZKg6LemNyWpT5_owUQhvOlJjqJd90UQfJg&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=I_JeS_cDgpTYHLwX1uxsMA&oh=00_AfaIafOMFzupJUfh6NNU9gRBFNoCOY89_KphIQXJlZaDBw&oe=68BF9774",
              "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/480898953_990684933045047_8445836092422722823_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=v-aR__8b7_MQ7kNvwHZ84cf&_nc_oc=AdkdRAmNxjo1PAcG1nkzovHcXXZ3gPUOWrNHtT3-8eN_ikzSoxl_SHH20dQmeyphbGk&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=fEeJNRGUrl-HrgkJQm5HSg&oh=00_AfYVWQ_lekC0jWo1V5Jtoe9Z4kqjJBwgFdLxS125DPj-FQ&oe=68BFAEFB",
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

      <div className="py-8">
        <MidNote text={"Parting Words"}></MidNote>
        {/* Image gallery */}
        <div className="flex items-stretch gap-1 justify-center">
          <div className="grid grid-cols-3 gap-1 w-[804px] max-w-4xl">
            <div className="col-span-3 aspect-square">
              <ImageWithSkeleton
                src={partingWords}
                alt="Latibule-cover"
                onClick={() =>
                  handleSelectImage({
                    src: partingWords,
                    w: 600,
                    h: 600,
                  })
                }
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onContextMenu={cancelRightClick}
                draggable={false}
              />
            </div>
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

export default Latibule;
