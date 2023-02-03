import { InternalRouting } from "../utilities/routes/InternalRouting";
import { SideMenu } from "./SideMenu";
import { TopMenu } from "./TopMenu";

export const MainBoard = () => {
  return (
    <div>
      <TopMenu />
      <SideMenu />
      <InternalRouting />
    </div>
  );
};
