import NoRoomSelected from "@/Components/NoRoomSelected";
import RoomLeftSideBar from "@/Components/RoomLeftSideBar";
import RoomRightSidebar from "@/Components/RoomRightSidebar";

const ChatRoom = () => {
  return (
    <div className="max-h-screen  overflow-y-hidden h-screen flex">
      <RoomLeftSideBar />
      {/* <NoRoomSelected /> */}
      <RoomRightSidebar/>
    </div>
  );
};

export default ChatRoom;
