import { useEffect, useState, useRef, forwardRef } from "react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { AnimeData } from "bundles/common/types";
import { Input } from "bundles/common/components/Input";
import { Button } from "bundles/common/components/Button";
import styles from "./Search.module.sass";

const Search: React.FC = () => {
  const router = useRouter();
  const [data, setDropdownData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownIsVisible, setDropdownVisible] = useState(false);
  const [cursor, setCursor] = useState(null);
  const dropdownRef = useRef(null);
  const searchBoxRef = useRef(null);

  const onSearch = (e) => {
    e.preventDefault();
    const encoded = encodeURIComponent(searchTerm);
    const routeConfig = {
      pathname: "/anime/search",
      query: { q: encoded },
    };

    setDropdownVisible(false);
    router.push(routeConfig);
  };

  const fetchSearchDropdown = async (): Promise<any> => {
    let encoded = encodeURIComponent(searchTerm);
    let response = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${encoded}`
    );
    let json = await response.json();

    setDropdownData(json.results);
    json.results?.length ? setDropdownVisible(true) : setDropdownVisible(false);

    if (dropdownIsVisible) {
      console.log("set dropdown cursor to 0");
      setCursor(null);
    }
  };

  const onClickHandler = (e) => {
    if (
      searchBoxRef.current.isEqualNode(e.target) ||
      dropdownRef.current.contains(e.target)
    ) {
      return;
    } else {
      setDropdownVisible(false);
      setCursor(null);
    }
  };

  const onKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setDropdownVisible(false);
      setCursor(null);
    }
  };

  const handleKeyDown = (e) => {
    if (!dropdownIsVisible) return;
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    }

    if (e.keyCode === 40 && cursor < data.slice(0, 10).length - 1) {
      if (cursor === null) {
        setCursor(0);
        return;
      }
      setCursor(cursor + 1);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchSearchDropdown();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    document.addEventListener("click", onClickHandler);
    document.addEventListener("keydown", onKeydownHandler);

    return () => {
      document.removeEventListener("click", onClickHandler);
      document.removeEventListener("keydown", onKeydownHandler);
    };
  });

  return (
    <section className={styles.searchbox}>
      <form className={styles.search}>
        <Input
          ref={searchBoxRef}
          type="text"
          name="search"
          value={searchTerm}
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Anime"
        />
        <Button onClick={onSearch} name="Search" />
      </form>
      <DropdownResults
        ref={dropdownRef}
        cursor={cursor}
        dropdownIsVisible={dropdownIsVisible}
        router={router}
        data={data}
      />
    </section>
  );
};

interface dropdownProps {
  data: AnimeData[];
  cursor: number;
  dropdownIsVisible: boolean;
  router: NextRouter;
}

const DropdownResults = forwardRef<HTMLDivElement, dropdownProps>(
  ({ data, dropdownIsVisible, router, cursor }, ref) => {
    return (
      <div
        ref={ref}
        className={
          dropdownIsVisible
            ? `${styles["search-result-dropdown"]}`
            : `${styles["hide-results"]}`
        }
      >
        {data?.slice(0, 10).map((content: AnimeData, index: number) => (
          <span
            key={content.mal_id}
            onClick={() => router.replace(`/anime/${content.mal_id}`)}
          >
            <div
              className={`${styles["search-result-item"]} ${
                cursor === index ? styles["active"] : null
              }`}
            >
              <div className={styles["search-result-item-image-container"]}>
                <img src={content.image_url} alt={content.title} />
              </div>
              <div className={styles["search-result-item-detail"]}>
                <div>{content.title}</div>
                <div>{content.score}</div>
                <div>
                  {content.airing ? "Currently Airing" : "Finished Airing"}
                </div>
              </div>
            </div>
          </span>
        ))}
      </div>
    );
  }
);

export default Search;
