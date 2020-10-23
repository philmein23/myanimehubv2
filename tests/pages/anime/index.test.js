import { render, screen } from "@testing-library/react";
import AnimeMain from "@pages/anime/index";

describe("AnimeMain renders",  () => {

    it("should render AnimeMain without crashing", async () => {
        render(<AnimeMain />);

        const animeSeasonsHeader = await screen.getByText("Anime Seasons");
        const genreSeasonsHeader = await screen.getByText("Genres");

        const seasonItems = await screen.getAllByTestId("season");
        const genreItems = await screen.getAllByTestId("genre");

       expect(animeSeasonsHeader).toBeInTheDocument();
       expect(genreSeasonsHeader).toBeInTheDocument();
       expect(seasonItems).toHaveLength(28);
       expect(genreItems).toHaveLength(43);
    })
});
