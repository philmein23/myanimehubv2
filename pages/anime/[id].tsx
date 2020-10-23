import { AnimeData } from "@bundles/common/types";
import { useRouter } from "next/router";

import styles from "./content.module.sass";

interface ContentProps {
  content: AnimeData;
}

const Content = ({ content }: ContentProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles["content-grid"]}>
      <h1 className={styles["title"]}>{content.title}</h1>
      <div>
        <img src={content.image_url} alt={content.title} />
      </div>
      <div>
        <div className={styles["statistics"]}>
          <span>Score {content.score}</span>
          <span>Ranked {content.rank}</span>
          <span>Popularity #{content.popularity}</span>
          <span>Members {content.members}</span>
        </div>
        <div>
          <h2 className={styles["synopsis-header"]}>Synopsis</h2>
        </div>
        <div className={styles["synopsis"]}>{content.synopsis}</div>
      </div>
    </section>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "*" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  let response = await fetch(
    `https://api.jikan.moe/v3/anime/${context.params.id}`
  );
  let content = await response.json();

  return {
    props: {
      content,
    },
  };
}

export default Content;
