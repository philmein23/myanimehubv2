import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
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
    return [...new Array(pageCount).keys()].map((page) => page + 1);
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

const GenrePage: React.FC<GenrePageProps> = ({}) => {
  const router = useRouter();
  const uri = `https://api.jikan.moe/v3/genre/anime/${router.query.genreId}/${router.query.page}`;
  const fetcher = (url) => fetch(url).then((response) => response.json());

  const { data, error } = useSWR(uri, fetcher);
  console.log(data);

  if (!data) return <div>Loading...</div>;

  const currentPage = router.query.page as string;

  const pageCount = Math.ceil(data.item_count / data.anime.length);
  const url = `/anime/genre/${router.query.genreId}`;

  return (
    <>
      <Pager
        url={url}
        pageCount={pageCount}
        currentPage={parseInt(currentPage)}
      >
        <AnimeContent animeData={data.anime} />
      </Pager>
    </>
  );
};

export default GenrePage;
