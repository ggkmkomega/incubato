import React from "react";
import Dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import dayjs from "dayjs";
import FeaturesList from "~/components/FeaturesList";
import { checkRole } from "~/lib/roles";

const Home = () => {
  dayjs.extend(advancedFormat);
  const currentDate = Dayjs();
  const time = currentDate.format("hh:mm A");
  const date = currentDate.format("dddd, Do YYYY");
  return (
    <section className="flex size-full flex-col gap-10 ">
      <div className="h-[300px] w-full rounded-md bg-hero bg-cover text-background dark:text-foreground">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[250px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting : at 14:00 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-primary lg:text-7xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <FeaturesList admin={checkRole("admin")} />
    </section>
  );
};

export default Home;
