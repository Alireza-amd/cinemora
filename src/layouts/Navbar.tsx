import { Button } from "@/components/ui/button";
import { cn } from "cn";
import {
  ClapperboardIcon,
  DramaIcon,
  HeartIcon,
  HouseIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  TvIcon,
  User2Icon,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, NavLink } from "react-router";
import { useTheme } from "@/context/theme/useTheme";

const navItems = [
  { Icon: HouseIcon, to: "/", title: "Home" },
  { Icon: ClapperboardIcon, to: "/movies", title: "Movies" },
  { Icon: TvIcon, to: "/tv-shows", title: "Tv Shows" },
  { Icon: DramaIcon, to: "/genres", title: "Genres" },
  { Icon: SearchIcon, to: "/search", title: "Search" },
  { Icon: HeartIcon, to: "/favorites", title: "Favorites" },
];

export function Navbar() {
  const user = undefined;
  return (
    <header className="px-4 flex justify-between gap-2 sticky top-0 left-0 z-50 dark:bg-black bg-rose-600 drop-shadow-md drop-shadow-slate-200">
      <Link to="/">
        <img src="/src/asset/logo.png" className="h-20 w-auto select-none" />
      </Link>
      <nav className="hidden md:flex gap-6">
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.to}
            Icon={navItem.Icon}
            to={navItem.to}
            title={navItem.title}
            showActivePath
          />
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex md:hidden">
            <Button size="icon-lg" className="cursor-pointer">
              <MenuIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {navItems.map((navItem) => (
                <DropdownMenuItem key={navItem.to}>
                  <NavItem
                    className="w-full text-black dark:text-white"
                    Icon={navItem.Icon}
                    to={navItem.to}
                    title={navItem.title}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user ? (
                <UserProfile />
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link to="/sign-up" className="w-full">
                      Signup
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/sign-in" className="w-full">
                      Login
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <ToggleDarkModeButton />
        {user ? (
          <UserProfile />
        ) : (
          <div className="md:flex hidden gap-1">
            <Button asChild variant="outline">
              <Link to="/sign-up">Signup</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/sign-in">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

function UserProfile() {
  return <User2Icon className="w-4 h-4 text-white" />;
}

function ToggleDarkModeButton() {
  const { toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      <div className="flex text-primary-foreground items-center gap-2 rounded-full p-2 relative bg-primary -z-20 flex-nowrap">
        <SunIcon className="w-4 h-4 z-10" />
        <MoonIcon className="w-4 h-4  z-10" />
        <div
          className={cn(
            "h-8 w-8 rounded-full absolute dark:translate-x-6 translate-x-0 left-0 bg-rose-500 transition-transform duration-300 -z-10",
          )}
        />
      </div>
    </div>
  );
}

type NavItemProps = {
  title: string;
  to: string;
  Icon: LucideIcon;
  showActivePath?: boolean;
  className?: string;
};
function NavItem({
  to,
  Icon,
  title,
  showActivePath = false,
  className = "text-white",
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        cn(
          "inline-flex h-full items-center gap-1",
          className,
          isActive &&
            showActivePath &&
            "border-white dark:text-rose-700 dark:border-rose-700 border-b-6",
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </NavLink>
  );
}
