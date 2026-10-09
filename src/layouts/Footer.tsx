import { Button } from "@/components/ui/button";
import {
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa6";
import { Link } from "react-router";
import logo from "@/asset/logo.png";

export function Footer() {
  return (
    <footer className="px-2 py-1 border-t-2 border-slate-500 text-white bg-rose-700 dark:bg-black ">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex flex-col items-start">
          <Link to="/">
            <img src={logo} className="h-15 select-none" />
          </Link>
          <span className="text-sm dark:text-muted-foreground -translate-y-2 text-white">
            Discover your next favorite story.
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-x-6">
          <Link to="/">Movies</Link>
          <Link to="/">Genres</Link>
          <Link to="/">About</Link>
          <Link to="/">TV Shows</Link>
          <Link to="/">Favorites</Link>
          <Link to="/">Contact</Link>
        </div>
        <div className="flex gap-1">
          <Button size="icon-sm" variant="ghost" asChild>
            <Link to="/">
              <FaXTwitter />
            </Link>
          </Button>
          <Button size="icon-sm" variant="ghost" asChild>
            <Link to="/">
              <FaInstagram />
            </Link>
          </Button>
          <Button size="icon-sm" variant="ghost" asChild>
            <Link to="/">
              <FaGithub />
            </Link>
          </Button>
          <Button size="icon-sm" variant="ghost" asChild>
            <Link to="/">
              <FaLinkedin />
            </Link>
          </Button>
          <Button size="icon-sm" variant="ghost" asChild>
            <Link to="/">
              <FaDiscord />
            </Link>
          </Button>
        </div>
      </div>
      <p className="text-center text-sm dark:text-muted-foreground text-white mt-2">
        © 2026 Cinemora. All rights reserved.
      </p>
    </footer>
  );
}
