import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./Pager.module.sass";

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
  console.log(`Current page: ${currentPage}`);
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(currentPage);
  const pageItems = generatePageItems(pageCount, currentPage, width);

  useEffect(() => {
    console.log(`Updated page index: ${pageIndex}`);

    const routeConfig = {
      pathname: url,
      query: { page: pageIndex },
    };
    router.push(routeConfig);
  }, [pageIndex]);

  return (
    <>
      {children}
      <div className={styles["pager-controls"]}>
        {pageIndex > 1 ? <button>Prev</button> : null}

        {pageItems.map((pageItem) => (
          <button onClick={() => setPageIndex(pageItem as number)}>
            {pageItem}
          </button>
        ))}
        {pageIndex < pageCount ? (
          <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        ) : null}
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

export default Pager;
