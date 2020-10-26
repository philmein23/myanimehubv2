import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { AnimeContent } from "@bundles/anime/components/AnimeContent";
import { AnimeData } from "@bundles/common/types";
import { Pager } from "@bundles/common/components/Pager";

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

const GenrePage: React.FC<GenrePageProps> = ({}) => {
  const router = useRouter();
  const uri = `https://api.jikan.moe/v3/genre/anime/${router.query.genreId}/${router.query.page}`;
  console.log(`Genre: ${router.query.genreId} - Page: ${router.query.page}`);
  const fetcher = (url) => fetch(url).then((response) => response.json());

  const { data, error } = useSWR(uri, fetcher);
  console.log(data);

  if (!data) return <div>Loading...</div>;

  const currentPage = router.query.page as string;

  const pageCount = Math.ceil(data.item_count / 100);
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
