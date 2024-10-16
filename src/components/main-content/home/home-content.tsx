import { DataTableDemo } from "./home-table";

interface MainContentViewProps {}

function MainContentView({}: MainContentViewProps) {
  return (
    // <div className="flex-1 overflow-auto hover:overflow-scroll">
    <div className="flex w-full min-w-max flex-1 flex-col p-4">
      {/* <div className="flex">
        <div className="inline-flex flex-nowrap">
          <DataTableDemo />
          <DataTableDemo />
          <DataTableDemo />
          <DataTableDemo />
        </div>
      </div> */}
      <div className="flex">
        <DataTableDemo />
      </div>
    </div>
  );
}

export default MainContentView;
