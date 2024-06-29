import { House, LucideIcon, User, Video } from "lucide-react";

type SideBarLink = {
  label: string;
  imgUrl: string;
  route: string;
  icon?: LucideIcon;
};

export const sideBarLinks: SideBarLink[] = [
  {
    label: `Home`,
    imgUrl: `/icons/Home.svg`,
    icon: House,
    route: `/`,
  },
  {
    label: `Upcoming`,
    imgUrl: `/icons/upcoming.svg`,
    route: `/upcoming`,
  },
  {
    label: `Previous`,
    imgUrl: `/icons/previous.svg`,
    route: `/previous`,
  },
  {
    label: `Recordings`,
    imgUrl: `/icons/Video.svg`,
    route: `/recordings`,
    icon: Video,
  },
  {
    label: `Personal Room`,
    imgUrl: `/icons/add-personal.svg`,
    route: `/personal-room`,
    icon: User,
  },
];
