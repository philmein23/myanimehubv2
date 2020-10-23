import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import { AnimeContent } from "@bundles/anime/components/AnimeContent";
import { AnimeData } from "@bundles/common/types";

import styles from "./Genre.module.sass";

interface GenrePageProps {
  content: [AnimeData];
  mal_url: {
    mal_id: 1;
    name: string;
    url: string;
  };
  item_count: number;
  genreId: string;
  currentPage: string;
}

interface PagerProps {
  pageCount: number;
  currentPage: number;
  url: string;
  children: React.ReactNode;
  width?: number;
}

const Pager: React.FC<PagerProps> = ({
  pageCount,
  width,
  currentPage,
  url,
  children,
}) => {
  const pageItems = generatePageItems(pageCount, currentPage, width);

  return (
    <>
      {children}
      <div className={styles["pager-controls"]}>
        {pageItems.map((pageItem) => (
          <Link href={`${url}?page=${pageItem}`}>{`${[pageItem]}`}</Link>
        ))}
      </div>
    </>
  );
};

// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
function generatePageItems(
  pageCount: number,
  currentPage: number,
  width: number = 7
) {
  if (width % 2 === 0) {
    throw new Error("Must allow odd number of page items.");
  }

  if (pageCount < width) {
    return [...new Array(pageCount).keys()];
  }

  const left = Math.max(
    1,
    Math.min(pageCount - width, currentPage - Math.floor(width / 2))
  );
  const items: (string | number)[] = new Array(width);
  for (let i = 0; i < width; i++) {
    items[i] = i + left;
  }

  if (items[0] > 1) {
    items[0] = 1;
    items[1] = "...";
  }

  if (items[items.length - 1] < pageCount) {
    items[items.length - 1] = pageCount;
    items[items.length - 2] = "...";
  }

  return items;
}

const GenrePage: React.FC<GenrePageProps> = ({
  content,
  mal_url,
  item_count,
  genreId,
  currentPage,
}) => {
  const pageCount = Math.ceil(item_count / content.length);
  const url = `/anime/genre/${genreId}`;
  return (
    <>
      <Pager
        url={url}
        pageCount={pageCount}
        currentPage={parseInt(currentPage)}
      >
        <AnimeContent animeData={content} />
      </Pager>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let response = await fetch(
    `https://api.jikan.moe/v3/genre/anime/${context.params.genreId}/${context.query.page}`
  );
  let content = await response.json();

  return {
    props: {
      item_count: content.item_count,
      mal_url: content.mal_url,
      content: content.anime,
      genreId: context.params.genreId,
      currentPage: context.query.page,
    },
  };
};

export default GenrePage;
