import { EllipsisVertical, Send, Undo2 } from "lucide-react";
import Image from "next/image";
import UsersChat from "./UsersChat";

const RoomRightSidebar = () => {
  return (
    <div className=" flex-1 mx-4 py-3">
      <div className=" h-full flex flex-col">
        <div className="bg-white px-4 shadow-md  w-full flex  items-center justify-between py-2">
          <div style={{ gap: "1.2rem" }} className="flex items-center gap-5">
            <Undo2 />
            <div style={{ gap: "1.2rem" }} className="flex items-center ml-4">
              <span className="border h-[45px] w-[45px] rounded-full flex items-center justify-center">
                <Image
                  src="/crowdUsers.png"
                  width={20}
                  height={20}
                  alt="User image group"
                  className="h-full w-full"
                />
              </span>
              <div className="">
                <h4 className="font-semibold text-sm">Group Name</h4>
                <p className="font-light text-xs">Jack, Danel, Samuel</p>
              </div>
            </div>
          </div>
          <EllipsisVertical />
        </div>
        <div className="flex-1 shadow-md px-3 my-2 bg-white max-h-[74vh] h-[74vh] overflow-y-auto">
          <UsersChat />
        </div>
        <div className="flex items-center gap-3 w-full bg-white shadow-md  py-3 px-4">
          <textarea
            name="message"
            className="border-none outline-none w-full h-full"
            id=""
          />

          <Send />
        </div>
      </div>
    </div>
  );
};

export default RoomRightSidebar;
