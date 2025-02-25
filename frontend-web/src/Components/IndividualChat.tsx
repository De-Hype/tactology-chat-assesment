import Image from "next/image";

const IndividualChat = ({
  user,
  message,
  timestamp,
  isCurrentUser,
  type = "message",
}: {
  user: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
  type?: "message" | "system";
}) => {
  if (type === "system") {
    return (
      <div className="flex justify-center my-3">
        <div className="bg-gray-200 rounded-full px-4 py-1 inline-block">
          <p className="text-xs text-gray-600">
            {message} • {timestamp}
          </p>
        </div>
      </div>
    );
  }

  if (isCurrentUser) {
    return (
      <div className="flex flex-row-reverse items-start gap-2 mb-4">
        <div className="flex-shrink-0">
          <span className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/crowdUsers.png"
              width={32}
              height={32}
              alt="Your avatar"
              className="h-full w-full object-cover"
            />
          </span>
        </div>
        <div className="flex-1 flex flex-col items-end">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-gray-500">{timestamp}</span>
            <h4 className="font-semibold text-sm">You</h4>
          </div>
          <div className="mt-1 bg-blue-500 text-white rounded-lg p-3 inline-block max-w-[80%]">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start gap-2 mb-4">
        <div className="flex-shrink-0">
          <span className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/crowdUsers.png"
              width={32}
              height={32}
              alt={`${user}'s avatar`}
              className="h-full w-full object-cover"
            />
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h4 className="font-semibold text-sm">{user}</h4>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <div className="mt-1 bg-gray-100 rounded-lg p-3 inline-block max-w-[80%]">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default IndividualChat;
