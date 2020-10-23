import { GetServerSideProps } from "next";
import { AnimeContent } from "@bundles/anime/components/AnimeContent";
import { AnimeData } from "@bundles/common/types";

interface SeasonPageProps {
  content: [AnimeData];
}

const SeasonPage: React.FC<SeasonPageProps> = ({ content }) => {
  console.log(content);
  return <AnimeContent animeData={content} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let response = await fetch(
    `https://api.jikan.moe/v3/season/${context.params.year}/${context.params.name}`
  );
  let content = await response.json();

  return {
    props: {
      content: content.anime,
    },
  };
};

export default SeasonPage;
