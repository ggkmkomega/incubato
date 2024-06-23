type SideBarLink = {
  label: string;
  imgUrl: string;
  route: string;
};

export const sideBarLinks: SideBarLink[] = [
  {
    label: `Home`,
    imgUrl: `/icons/home.svg`,
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
  },
  {
    label: `Personal Room`,
    imgUrl: `/icons/add-personal.svg`,
    route: `/personal-room`,
  },
];
