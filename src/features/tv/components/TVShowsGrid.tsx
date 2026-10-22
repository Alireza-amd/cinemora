import { GridTemplate } from "@/components/GridTemplate";
import { MediaCard } from "../../media/components/MediaCard";
import type { TVSchema } from "../constants/types";

type TVShowsGridProps = {
  tvShows: TVSchema[];
};
export function TVShowsGrid({ tvShows }: TVShowsGridProps) {
  return (
    <GridTemplate>
      {tvShows.map((show) => (
        <MediaCard {...show} media_type="tv" key={show.id} />
      ))}
    </GridTemplate>
  );
}
