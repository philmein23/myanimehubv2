import { format } from "date-fns";
import { useRouter } from "next/router";
import { AnimeData } from "bundles/common/types";
import styles from "./AnimeContent.module.sass";

interface AnimeContentProps {
  animeData: [AnimeData];
  showPlaceholders: boolean;
}

interface AnimeInfoCardProps {
  anime: AnimeData;
}

const AnimeInfoCard: React.FC<AnimeInfoCardProps> = ({ anime }) => {
  const router = useRouter();
  return (
    <section className={styles["content-details"]}>
      <div className={styles["content-header"]}>
        <span
          className={styles.link}
          onClick={() => router.replace(`/anime/${anime.mal_id}`)}
        >
          {anime.title}
        </span>
      </div>
      <div className={styles["content-info"]}>
        <div>
          <img src={anime.image_url} alt={anime.title} loading="lazy" />
        </div>
        <div className={styles.synopsis}>
          <p>{anime.synopsis}</p>
        </div>
      </div>
      <div className={styles.metadata}>
        <div>
          {format(
            new Date(anime?.start_date || anime?.airing_start),
            "MMM-dd-yyyy"
          )}
        </div>
        <div>{anime.score}</div>
        <div>{anime.members}</div>
      </div>
    </section>
  );
};

function AnimeContent({ animeData, showPlaceholders }: AnimeContentProps) {
  return (
    <section className={styles["content-container"]}>
      {showPlaceholders
        ? [...new Array(100).keys()].map((_) => (
            <section className={styles.placeholder}></section>
          ))
        : animeData.map((anime) => (
            <AnimeInfoCard key={anime.mal_id} anime={anime} />
          ))}
    </section>
  );
}

export default AnimeContent;
