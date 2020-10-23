import { render, screen } from "@testing-library/react";
import Content from "@pages/anime/[id]";
import { mockNextUseRouter } from "@util/test-util";

describe("Anime content", () => {
  it("should render a fallback display of Loading", async () => {
    mockNextUseRouter({ isFallback: true });

    render(<Content />);

    expect(await screen.findByText("Loading...")).toBeVisible();
  });

  it("should render anime Content with fake data when router isFallback is set to false", async () => {
    const fakeData = {
      title: "Psycho Pass",
      score: 8.15,
      rank: 55,
      popularity: 55,
      members: 90000,
      synopsis: "sci-fi anime",
    };

    mockNextUseRouter({ isFallback: false });

    render(<Content content={fakeData} />);

    expect(
      await screen.findByText("Score 8.15", { exact: false })
    ).toBeVisible();
    expect(
      await screen.findByText("Psycho Pass", { exact: false })
    ).toBeVisible();
    expect(
      await screen.findByText("Ranked 55", { exact: false })
    ).toBeVisible();
    expect(
      await screen.findByText("Popularity #55", { exact: false })
    ).toBeVisible();
    expect(
      await screen.findByText("Members 90000", { exact: false })
    ).toBeVisible();
    expect(
      await screen.findByText("sci-fi anime", { exact: false })
    ).toBeVisible();
  });
});
