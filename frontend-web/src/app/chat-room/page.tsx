"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserData from "../../../helpers/IUserType";



declare global {
  interface Window {
    isLoggedIn: boolean;
  }
}

const ChatRoom: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = Cookies.get("tact_logged_in_user");

    if (userData) {
      try {
        const parsedUser: UserData = JSON.parse(userData);

        if (parsedUser.id) {
          router.replace(`/chat-room/${parsedUser.id}`);
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // If no valid user data, set global variable and redirect to login
    window.isLoggedIn = false;
    router.replace("/sign-in");
  }, [router]);

  return <div>Redirecting...</div>;
};

export default ChatRoom;
