"use client";

import NoRoomSelected from "@/Components/NoRoomSelected";
import RoomLeftSideBar from "@/Components/RoomLeftSideBar";
import RoomRightSidebar from "@/Components/RoomRightSidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChatRoom = () => {
  const params = useParams();
  const { roomId } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(roomId);
  useEffect(() => {
    const FetchRoomValidatity = (roomId: string) => {
      setIsLoading(true);
      try {
        console.log(roomId);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    FetchRoomValidatity(String(roomId));
  }, [roomId]);

  return (
    <div className="max-h-screen  overflow-y-hidden h-screen flex">
      <RoomLeftSideBar />
      {/* <NoRoomSelected /> */}

      {isLoading ? (
        <div className=" flex-1 mx-4 py-3">
          <div className=" h-full flex  items-center justify-center">
            <p className="font-semibold">Loading...</p>
          </div>
        </div>
      ) : (
        <RoomRightSidebar />
      )}
    </div>
  );
};

export default ChatRoom;
