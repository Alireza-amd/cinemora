export function HomePage() {
  return <div>HomePage</div>;
}

function loader() {}
export const HomePageRoute = {
  loader,
  element: <HomePage />,
};
