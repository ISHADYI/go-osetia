import React from "react";
import { Hero } from "../components/Hero";
import { CategorySlider } from "../components/CategorySlider";
import { RunningLine } from "../components/RunningLine";
import { AllMeetings } from "../components/AllMeetings";
import { OfficialPoster } from "../components/OfficialPoster";
import Map from "../components/Map";
import InterestingPlaces from "../components/InterestingPlaces";
import Cta from "../components/Cta";
import PastEventsPhotos from "../components/PastEventsPhotos";
import Reviews from "../components/Reviews";

const CATEGORIES_DATA = [
  {
    title: "Активный отдых",
    count: 24,
    today: 7,
    image: "/images/active-category.png",
  },
  {
    title: "Настольные игры",
    count: 12,
    today: 3,
    image: "/images/active-category.png",
  },
  {
    title: "Творчество",
    count: 8,
    today: 2,
    image: "/images/active-category.png",
  },
  {
    title: "Пикники",
    count: 15,
    today: 5,
    image: "/images/active-category.png",
  },
  {
    title: "Пикники",
    count: 15,
    today: 5,
    image: "/images/active-category.png",
  },
  {
    title: "Пикники",
    count: 15,
    today: 5,
    image: "/images/active-category.png",
  },
];

export function HomePage() {
  return (
    <>
      <Hero />
      <CategorySlider categories={CATEGORIES_DATA} />
      <RunningLine />
      <AllMeetings />
      <OfficialPoster />
      <Map />
      <InterestingPlaces />
      <Cta />
      <PastEventsPhotos />
      <Reviews />
    </>
  );
}
