import { Link } from "@tanstack/react-router";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "",
      enabled: true,
      children: (
          <div className="">
            <Link to="/" className="flex items-center">
              <img
                src="/logo2.webp"
                alt="logo_matif"
                width={120}
                height={32}
                className="object-contain"
              />
            </Link>
          </div>
      ),
    },

    githubUrl: "https://github.com/",
  };
}

export const sharedLinks: LinkItemType[] = [
  {
    type: "main",
    url: "/docs",
    text: "Docs",
  },
  {
    type: "main",
    url: "/matriks",
    text: "Plugins",
  },
];