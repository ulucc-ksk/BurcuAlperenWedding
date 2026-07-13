import RsvpForm from "@/components/RsvpForm";
import { weddingConfig } from "@/config/wedding";

export default function NikahVeDugunRsvpPage() {
  return (
    <RsvpForm
      title={weddingConfig.dugun.title}
      events={[weddingConfig.nikah, weddingConfig.dugun]}
      invitationCode="genel"
      backHref="/davet/nikah-ve-dugun"
    />
  );
}