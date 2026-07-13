import WeddingInvitation from "@/components/WeddingInvitation";
import { weddingConfig } from "@/config/wedding";

export default function NikahInvitationPage() {
  return (
    <WeddingInvitation
      title={weddingConfig.invitations.nikah.title}
      envelopeText={weddingConfig.invitations.nikah.envelopeText}
      countdownTitle={weddingConfig.invitations.nikah.countdownTitle}
      countdownEvent={weddingConfig.nikah}
      events={[weddingConfig.nikah]}
      calendarPath="/api/calendar?type=nikah"
    />
  );
}