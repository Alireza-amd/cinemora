import { Button } from "@/components/ui/button";
import { cn } from "cn";
import {
  ChevronDown,
  ClapperboardIcon,
  DramaIcon,
  HeartIcon,
  HouseIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  TvIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, NavLink } from "react-router";
import { useTheme } from "@/context/theme/useTheme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTransition } from "react";
import logo from "@/asset/logo.png";

const navItems = [
  { Icon: HouseIcon, to: "/", title: "Home" },
  { Icon: ClapperboardIcon, to: "/movie", title: "Movies" },
  { Icon: TvIcon, to: "/tv", title: "Tv Shows" },
  { Icon: DramaIcon, to: "/genres", title: "Genres" },
  { Icon: SearchIcon, to: "/search", title: "Search" },
  { Icon: HeartIcon, to: "/favorites", title: "Favorites" },
];

export function Navbar() {
  const { user } = useAuth();
  return (
    <header className="px-4 flex justify-between gap-2 sticky top-0 left-0 z-50 dark:bg-black/90 bg-rose-600/90 drop-shadow-md drop-shadow-slate-200">
      <Link to="/">
        <img src={logo} className="h-20 w-auto select-none" />
      </Link>
      <nav className="hidden lg:flex gap-6">
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
          <DropdownMenuTrigger asChild className="flex lg:hidden">
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
          </DropdownMenuContent>
        </DropdownMenu>
        <ToggleDarkModeButton />
        {user ? (
          <UserProfile />
        ) : (
          <>
            <Button className="flex md:hidden" variant="secondary">
              <Link to="/sign-in">Login / Sign up</Link>
            </Button>
            <div className="hidden md:flex gap-1">
              <Button variant="secondary">
                <Link to="/sign-in">Login</Link>
              </Button>
              <Button variant="secondary">
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function UserProfile() {
  const { logout, user } = useAuth();
  const [isLoading, startTransition] = useTransition();

  if (user == null) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer flex items-center">
          <div className="p-2 bg-black dark:bg-white transition-colors rounded-full">
            <UserIcon className="w-4 h-4 text-white dark:text-black" />
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <span className="break-all min-w-0 w-full">{user.email}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isLoading}
            variant="destructive"
            onClick={() => {
              startTransition(async () => {
                await logout();
              });
            }}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ToggleDarkModeButton() {
  const { toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      <Button className="flex text-primary-foreground items-center gap-2 rounded-full p-2 relative bg-primary -z-20 flex-nowrap">
        <SunIcon className="w-4 h-4 z-10" />
        <MoonIcon className="w-4 h-4  z-10" />
        <div
          className={cn(
            "h-8 w-8 rounded-full absolute dark:translate-x-6 translate-x-0 left-0 bg-rose-500 transition-transform duration-300 -z-10",
          )}
        />
      </Button>
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
function NavItem({ to, Icon, title, className = "text-white" }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "inline-flex h-full items-center gap-1",
          className,
          isActive &&
            "border-white dark:text-rose-700 dark:border-rose-700 border-b-6",
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </NavLink>
  );
}
