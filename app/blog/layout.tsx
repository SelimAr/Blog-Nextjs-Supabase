import ModelBanner from "../components/ModelBanner";
import UserSettings from "../components/UserSettings";
import ModelCategory from "../components/ModelCategory";
import { Toaster } from "react-hot-toast";
import { Check, CircleX } from "lucide-react";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ModelBanner />
      <div className="flex justify-between flex-nowrap w-full">
        <UserSettings />
        <div className="block w-full">{children}</div>
        <ModelCategory />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 7000,
            success: {
              icon: <Check size={25} className="text-green-500" />,
              style: {
                background: "#000",
                color: "#fff",
                border: "1px",
                borderColor: "#fff",
                borderStyle: "solid",
              },
            },
            error: {
              icon: <CircleX size={25} className="text-red-500" />,
              style: {
                background: "#000",
                color: "#fff",
                border: "1px",
                borderColor: "#fff",
                borderStyle: "solid",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
