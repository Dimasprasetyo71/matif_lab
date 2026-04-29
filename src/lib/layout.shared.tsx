import { Link } from "@tanstack/react-router";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      
      title: "",
      enabled: true,
      children: (
        <Link className="inline-flex items-center gap-2 font-semibold text-lg" to={"/"}>
          <img src="/logo2.webp" loading="eager"
            fetchPriority="high" alt="logo_matif"  width={120}  height={32} className="h-8 object-contain" />
        </Link>
      ),
    },
    githubUrl: "https://github.com/",
  };
}

