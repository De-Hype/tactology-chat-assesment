import { Cross, LogOut, Search } from "lucide-react";
import Image from "next/image";
const RoomLeftSideBar = () => {
  return (
    <div className=" flex flex-col px-3 py-4 shadow-md border">
      <div className="flex items-center justify-between gap-3 py-2">
        <div className="flex bg-white rounded-md shadow-md px-3 py-2 gap-2 border">
          <input
            type="text"
            name="search"
            placeholder="Search Room Here"
            id="searchRoom"
            className="outline-none border-none"
          />
          <Search className="text-blue-700 hover:text-blue-400 cursor-pointer" />
        </div>
        <span className="bg-white shadow border py-2 px-2 rounded-md cursor-pointer">
          <Cross />
        </span>
      </div>
      <div className="flex-1 px-3 my-2 bg-white max-h-[74vh] h-[74vh] overflow-y-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
          <div className="flex items-center gap-4 rounded-md cursor-pointer hover:bg-amber-50 bg-slate-100 px-2 py-3">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />

            <h4 className="">Group Name</h4>
          </div>
        </div>
      </div>
      <div className="border-t py-3 flex items-center gap-9 justify-between">
        <div className="flex items-center gap-3">
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
            <h3 className="font-bold text-sm">David Sylvester</h3>
            <h4 className="font-normal text-xs text-blue-400">
              iamdavidhype@gmail.com
            </h4>
          </div>
        </div>
        <LogOut className="cursor-pointer" />
      </div>
    </div>
  );
};

export default RoomLeftSideBar;
