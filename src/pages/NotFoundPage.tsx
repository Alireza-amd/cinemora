import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <PageHeader subtitle="The page you tried to access could not be found">
        404 - Not Found
      </PageHeader>
      <Button asChild className="p-8 text-2xl" variant="outline">
        <Link to="/">Take Me Home</Link>
      </Button>
    </div>
  );
}
