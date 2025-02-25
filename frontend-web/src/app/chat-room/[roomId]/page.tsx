import { LogOut, Search } from "lucide-react";
import Image from "next/image";

const ChatRoom = () => {
  return (
    <div className="max-h-screen  overflow-y-hidden h-screen flex">
      <div className="bg-red-20 flex flex-col px-3 py-4">
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
        <div className="flex-1">
          <div className="">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
            />
          </div>
        </div>
        <div className="border-t py-3 flex items-center gap-6">
          <div className="flex items-center">
            <Image
              src="/crowdUsers.png"
              width={20}
              height={20}
              alt="User image group"
              className=""
            />
            <div className="">
              <h3 className="font-bold">David Sylvester</h3>
              <h4 className="font-normal text-blue-400">iamdavidhype@gmail.com</h4>
            </div>
          </div>
          <LogOut />
        </div>
      </div>
      <div className="bg-green-400 flex-3">d</div>
    </div>
  );
};

export default ChatRoom;
