import WeddingInvitation from "@/components/WeddingInvitation";
import { weddingConfig } from "@/config/wedding";

export default async function NikahVeDugunInvitationPage({
  params
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <WeddingInvitation
      title={weddingConfig.invitations.nikahVeDugun.title}
      envelopeText={weddingConfig.invitations.nikahVeDugun.envelopeText}
      countdownTitle={weddingConfig.invitations.nikahVeDugun.countdownTitle}
      countdownEvent={weddingConfig.nikah}
      events={[weddingConfig.nikah, weddingConfig.dugun]}
      rsvpPath={`/davet/nikah-ve-dugun/${encodeURIComponent(code)}/katilim`}
    />
  );
}
