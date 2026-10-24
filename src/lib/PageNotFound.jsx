import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background bg-mesh">
      <div className="w-full max-w-lg text-center glass-strong rounded-3xl depth-shadow-lg p-8 sm:p-12">
        <BrandLogo variant="light" className="h-16 w-16 mx-auto" />

        <p className="mt-6 font-display text-6xl font-bold text-primary text-3d">404</p>
        <div className="mt-2 h-px w-16 bg-border mx-auto" />

        <h1 className="mt-5 font-heading text-2xl font-bold text-primary">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          We couldn't find <span className="font-medium text-foreground">/{pageName}</span>. It may have moved, or it
          may never have existed.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground btn-3d btn-glow"
        >
          <HomeIcon className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </div>
  );
}