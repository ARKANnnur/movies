import Sidebar from "@/_components/recommendations/SideBar";
import Image from "next/image";

function page() {
  return (
    <div className="flex justify-between pt-24 gap-5 px-5 sm:px-10">
      <div>
        <Sidebar />
      </div>
      <div className="container">
        <div className="rounded-lg overflow-hidden h-[50dvh] bg-dark-200">
          <Image src="" alt="" />
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default page;
