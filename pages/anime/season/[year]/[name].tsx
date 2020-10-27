import { useRouter } from "next/router";
import useSWR from "swr";
import { AnimeContent } from "@bundles/anime/components/AnimeContent";
import { AnimeData } from "@bundles/common/types";

interface SeasonPageProps {
  content: [AnimeData];
}

const SeasonPage: React.FC<SeasonPageProps> = ({ content }) => {
  const router = useRouter();
  const uri = `https://api.jikan.moe/v3/season/${router.query.year}/${router.query.name}`;
  const fetcher = (url) => fetch(url).then((response) => response.json());
  const { data, error } = useSWR(uri, fetcher);

  return <AnimeContent animeData={data?.anime} showPlaceholders={!data} />;
};

export default SeasonPage;
