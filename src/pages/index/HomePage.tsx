import { HeroSlider } from "@/features/auth/home/components/HeroSlider";
import { getSliderMovies } from "@/features/auth/home/services/service";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";

export function HomePage() {
  const { sliderMoviesPromise } = useLoaderData<typeof loader>();
  return (
    <div className="my-6">
      {
        <Suspense fallback="Loading...">
          <Await resolve={sliderMoviesPromise}>
            {(sliderMovies) => (
              <HeroSlider sliderMovies={sliderMovies.results} />
            )}
          </Await>
        </Suspense>
      }
    </div>
  );
}

function loader() {
  return { sliderMoviesPromise: getSliderMovies() };
}
export const HomePageRoute = {
  loader,
  element: <HomePage />,
};
