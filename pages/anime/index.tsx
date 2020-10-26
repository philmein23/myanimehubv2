import Link from "next/link";
import styles from "./index.module.sass";
import {
  Genre,
  AnimeSeason,
  SeasonYear,
} from "@bundles/common/config/constants";
import React from "react";

const YEARS: SeasonYear[] = [
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
];

type SeasonInfo = {
  name: string;
  year: SeasonYear;
};

type GenreInfo = {
  name: string;
  value: number;
};

function createSeasonList(): SeasonInfo[] {
  const seasonList = Object.keys(AnimeSeason).map((season) => season);
  const list: Array<SeasonInfo> = [];
  for (let i = 0; i < seasonList.length; i++) {
    for (let j = 0; j < YEARS.length; j++) {
      let season = {} as SeasonInfo;
      season.name = seasonList[i];
      season.year = YEARS[j];
      list.push(season);
    }
  }

  return list;
}

function createGenreList(): GenreInfo[] {
  return Object.keys(Genre)
    .filter((val) => isNaN(Number(val)))
    .map((key) => {
      let currentKey = key;
      if (currentKey.includes("_")) {
        currentKey = currentKey.replace(/_/g, " ");
      }
      return {
        name: currentKey,
        value: Genre[key],
      };
    });
}

function printSeasonYear(season: SeasonInfo): string {
  return `${season.name} ${season.year}`;
}

const AnimeMain: React.FC = () => {
  return (
    <>
      <GenreList />
      <AnimeSeasonList />
    </>
  );
};

const AnimeSeasonList: React.FC = () => {
  const seasonsList = createSeasonList();

  return (
    <section className={styles["seasons-list"]}>
      <header className={styles.header}>Anime Seasons</header>
      {seasonsList.map((season) => (
        <div
          data-testid="season"
          key={printSeasonYear(season)}
          className={styles.season}
        >
          <Link
            href={`anime/season/${season.year}/${season.name.toLowerCase()}`}
          >
            {printSeasonYear(season)}
          </Link>
        </div>
      ))}
    </section>
  );
};

const GenreList: React.FC = () => {
  const genreList = createGenreList();

  return (
    <section className={styles["genre-list"]}>
      <header className={styles.header}>Genres</header>
      {genreList.map((genre) => (
        <div data-testid="genre" key={genre.name} className={styles.genre}>
          <Link href={`anime/genre/${genre.value}?page=1`}>{genre.name}</Link>
        </div>
      ))}
    </section>
  );
};

export default AnimeMain;
