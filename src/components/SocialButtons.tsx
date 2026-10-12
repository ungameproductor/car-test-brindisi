import FacebookIcon from "@/components/FacebookIcon";
import InstagramIcon from "@/components/InstagramIcon";
import ShinyButton from "@/components/ShinyButton";
import { CONTACTS } from "@/content/site";

export default function SocialButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <ShinyButton
        href={CONTACTS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
      >
        <InstagramIcon size={16} />
        Instagram
      </ShinyButton>
      <ShinyButton
        href={CONTACTS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
      >
        <FacebookIcon size={16} />
        Facebook
      </ShinyButton>
    </div>
  );
}
