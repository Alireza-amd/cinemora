import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobeIcon, RecycleIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { MultiSelectFormField } from "@/components/MultiSelectFormField";
import { useGenres } from "@/features/media/hooks/useGenres";
import { SelectFormField } from "@/components/SelectFormField";
import { Button } from "@/components/ui/button";
import {
  MoviesFilterKey,
  TVShowsFilterKey,
  type MediaFilterSchema,
} from "@/features/media/constants/types";
import { mediaFilterSchema } from "@/features/media/constants/schema";
import { sortOptions } from "@/features/media/constants/data";
import { useSearchParams } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function MediasFilterForm({ mediaType }: { mediaType: "movie" | "tv" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { movieGenres, tvGenres } = useGenres();
  const mediaGenres = mediaType === "movie" ? movieGenres : tvGenres;
  const MediaFilterKey =
    mediaType === "movie" ? MoviesFilterKey : TVShowsFilterKey;
  const mediaGenreOptions = mediaGenres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));
  const form = useForm<MediaFilterSchema>({
    resolver: zodResolver(mediaFilterSchema),
    defaultValues: {
      genres: searchParams.get(MediaFilterKey.Genre)?.split(",") ?? [],
      language: searchParams.get(MediaFilterKey.Language) ?? "",
      rating: searchParams.get(MediaFilterKey.Rating) ?? "",
      releaseYear: searchParams.get(MediaFilterKey.ReleaseYear) ?? "",
      sortBy: searchParams.get(MediaFilterKey.SortBy) ?? "",
    },
  });

  function onSubmit(formValues: MediaFilterSchema) {
    const newSearchParams = new URLSearchParams();
    if (formValues.genres.length > 0)
      newSearchParams.set(MediaFilterKey.Genre, formValues.genres.join(","));
    if (formValues.language !== "")
      newSearchParams.set(MediaFilterKey.Language, formValues.language);
    if (formValues.rating !== "")
      newSearchParams.set(MediaFilterKey.Rating, formValues.rating);
    if (formValues.releaseYear !== "")
      newSearchParams.set(MediaFilterKey.ReleaseYear, formValues.releaseYear);
    if (formValues.sortBy !== "")
      newSearchParams.set(MediaFilterKey.SortBy, formValues.sortBy);
    setSearchParams(newSearchParams);
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 items-center p-8 bg-primary-foreground rounded-xl mb-8"
    >
      <MultiSelectFormField
        control={form.control}
        label="Genre"
        name="genres"
        options={mediaGenreOptions}
        placeholder="All Genres"
      />
      <SelectFormField
        control={form.control}
        label={mediaType === "movie" ? "Release Year" : "First Air Date"}
        name="releaseYear"
        options={Array.from({ length: 50 }).map(
          (_, index) => `${new Date().getFullYear() - index}`,
        )}
        placeholder="All Years"
      />
      <SelectFormField
        control={form.control}
        label="Rating"
        name="rating"
        options={Array.from({ length: 10 }).map((_, index) => `${index + 1}`)}
        placeholder="All Ratings"
      />
      <Controller
        name="language"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="language">Language</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="language"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your language..."
              />
              <InputGroupAddon>
                <GlobeIcon />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <SelectFormField
        control={form.control}
        label="Sort By"
        name="sortBy"
        options={sortOptions}
        placeholder="Popularity Asc"
      />
      <div className="flex flex-col gap-1">
        <Button
          className="cursor-pointer"
          type="button"
          onClick={() => {
            setSearchParams();
            form.reset({
              genres: [],
              language: "",
              rating: "",
              releaseYear: "",
              sortBy: "",
            });
          }}
        >
          <RecycleIcon />
          Clear Filters
        </Button>
        <Button type="submit" className="cursor-pointer">
          Apply Filter
        </Button>
      </div>
    </form>
  );
}
