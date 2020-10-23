import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimeContent } from "bundles/anime/components/AnimeContent";

const AnimeSearchPage: React.FC = () => {
  const router = useRouter();
  const [animeData, setAnimeData] = useState(null);
  const searchAnimeContent = async () => {
    let response = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${router.query.q}`
    );
    let json = await response.json();
    setAnimeData(json.results);
  };

  useEffect(() => {
    searchAnimeContent();
  }, [router.query.q]);

  return <AnimeContent animeData={animeData} />;
};

export default AnimeSearchPage;
