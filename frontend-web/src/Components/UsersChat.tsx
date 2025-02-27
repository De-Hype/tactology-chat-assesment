import IndividualChat from "./IndividualChat";

const UsersChat = () => {
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  return (
    <div className="">
      <IndividualChat
        message="I'll help you fix the scrollable section in your RoomRightSidebar component. The issue is that you're using overflow-y without a specific value, so it's not actually enabling scrolling."
        timestamp={timestamp}
        isCurrentUser={true}
        user="user"
      />
      <IndividualChat
        message="I'll help you fix the scrollable section in your RoomRightSidebar component. The issue is that you're using overflow-y without a specific value, so it's not actually enabling scrolling."
        timestamp={timestamp}
        isCurrentUser={true}
        user="user"
      />
      <IndividualChat
        message="Let me refactor the IndividualChat component to look more like a typical chat interface with just the sender's name, profile picture, message text, and timestamp."
        timestamp={timestamp}
        isCurrentUser={false}
        user="David Noah"
      />
      <IndividualChat
        message="Let me refactor the IndividualChat component to look more like a typical chat interface with just the sender's name, profile picture, message text, and timestamp."
        timestamp={timestamp}
        isCurrentUser={false}
        user="David Noah"
      />
      
      {/* System message example for when a user leaves */}
      <IndividualChat
        message="John left the room"
        timestamp={timestamp}
        isCurrentUser={false}
        user=""
        type="system"
      />
      
      <IndividualChat
        message="Let me refactor the IndividualChat component to look more like a typical chat interface with just the sender's name, profile picture, message text, and timestamp."
        timestamp={timestamp}
        isCurrentUser={false}
        user="David Noah"
      />
    </div>
  );
};

export default UsersChat;