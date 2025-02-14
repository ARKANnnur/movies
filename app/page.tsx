import Slider from "@/_components/Slider";
import Pagination from "./_components/Pagination";

type Props = {
  searchParams: any;
};

function Page({}: Props) {
  return (
    <div className="">
      <Slider />
      <Pagination />
    </div>
  );
}

export default Page;
