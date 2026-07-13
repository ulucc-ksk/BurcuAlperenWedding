import RsvpForm from "@/components/RsvpForm";
import { weddingConfig } from "@/config/wedding";

export default async function NikahVeDugunRsvpPage({
  params
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <RsvpForm
      title={weddingConfig.dugun.title}
      events={[weddingConfig.nikah, weddingConfig.dugun]}
      invitationCode={code}
      backHref={`/davet/nikah-ve-dugun/${encodeURIComponent(code)}`}
    />
  );
}
