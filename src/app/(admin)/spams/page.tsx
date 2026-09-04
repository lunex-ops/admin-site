"use client";

import { PageError } from "@/components/features/common/page-error";
import { PageHeader } from "@/components/features/common/page-header";
import { PageHeaderLoader } from "@/components/features/common/page-header-loader";
import { SpamsTable } from "@/components/tables/spams-table";
import { useSpams } from "@/hooks/apis/useSpams";

const SpamsPage = () => {
  const { data, isLoading, isError } = useSpams();

  const spams = data?.data?.contacts ?? [];

  if (isLoading) {
    return <PageHeaderLoader title="Spams" />;
  }

  if (isError) {
    return <PageError />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Spams"
        subTitle="Review rejected contacts and manage contacts marked as spam."
      />

      <SpamsTable data={spams} />
    </div>
  );
};

export default SpamsPage;
