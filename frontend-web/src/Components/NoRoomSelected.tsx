import Image from "next/image";

const NoRoomSelected = () => {
  return (
    <div className="flex-1 mx-4">
      <div className="h-full flex items-center justify-center flex-col">
        <div className="h-[70px] flex justify-center bounce-custom">
          <Image
            src="/NoChat.png"
            width={250}
            height={250}
            alt="No Chat Selected"
            className="h-full w-auto"
          />
        </div>
        <h3 className="text-center font-bold text-lg">No Room Selected</h3>
      </div>
    </div>
  );
};

export default NoRoomSelected;
