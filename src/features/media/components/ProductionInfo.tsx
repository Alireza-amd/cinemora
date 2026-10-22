import { SkeletonArray } from "@/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  ProductionCompanySchema,
  ProductionCountrySchema,
} from "../constants/types";
import { getImageURL } from "@/services/baseImageURL";

type ProductionInfoProps = {
  productionCompanies: ProductionCompanySchema[] | null;
  productionCountries: ProductionCountrySchema[] | null;
};

export function ProductionInfo({
  productionCompanies,
  productionCountries,
}: ProductionInfoProps) {
  const hasCompanies = productionCompanies && productionCompanies?.length > 0;
  const hasCountries = productionCountries && productionCountries?.length > 0;

  if (!hasCompanies && !hasCountries) {
    return null;
  }

  return (
    <Card>
      <CardContent className="space-y-6">
        {hasCompanies && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Production Companies</h2>

            {productionCompanies && (
              <div className="flex flex-wrap gap-3">
                {productionCompanies.map(
                  (company) =>
                    company.logo_path && (
                      <CompanyLogo
                        key={company.id}
                        logoPath={company.logo_path}
                      />
                    ),
                )}
              </div>
            )}
          </section>
        )}

        {hasCompanies && hasCountries && <div className="border-t" />}

        {hasCountries && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Production Countries</h2>

            {productionCountries && (
              <div className="flex flex-wrap gap-3">
                {productionCountries.map((country) => (
                  <CountryFlag
                    key={country.iso_3166_1}
                    countryCode={country.iso_3166_1}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </CardContent>
    </Card>
  );
}

export function ProductionInfoSkeleton() {
  return (
    <Card>
      <CardContent className="animate-pulse space-y-6">
        <section className="space-y-4">
          <Skeleton className="h-6 w-48" />

          <div className="flex flex-wrap gap-3">
            <SkeletonArray length={4}>
              <Skeleton className="h-18 w-28 rounded-md" />
            </SkeletonArray>
          </div>
        </section>

        <div className="border-t" />

        <section className="space-y-4">
          <Skeleton className="h-6 w-48" />

          <div className="flex flex-wrap gap-3">
            <SkeletonArray length={3}>
              <Skeleton className="h-10 w-16 rounded-md" />
            </SkeletonArray>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

type CompanyLogoProps = {
  logoPath: string;
};

export function CompanyLogo({ logoPath }: CompanyLogoProps) {
  return (
    <div className="p-4 bg-accent hover:bg-rose-500">
      <img
        src={getImageURL(logoPath)}
        alt={`logo`}
        className="h-10 w-18 object-contain"
        loading="lazy"
      />
    </div>
  );
}

type CountryFlagProps = {
  countryCode: string;
};

function CountryFlag({ countryCode }: CountryFlagProps) {
  return (
    <div className="p-4 bg-accent hover:bg-rose-500">
      <img
        src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
        alt={`${countryCode} flag`}
        className="h-8 w-14 object-cover"
        loading="lazy"
      />
    </div>
  );
}
