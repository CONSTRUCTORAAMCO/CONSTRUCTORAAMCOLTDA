import { useLanguage } from "../../../i18n/LanguageContext";
import poster from "./hero-poster.jpg";
import styles from "./HeroVideo.module.css";

export default function HeroVideo() {
  const { t } = useLanguage();
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-black">
      <div className={styles.background} aria-hidden="true" inert>
        <video
          className={styles.video}
          src="/video/amco-portada.mp4"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          tabIndex={-1}
        />
      </div>
      <div className={styles.shade} />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 motion-safe:animate-bounce text-white">
        <span className="text-xs tracking-widest mb-1">{t("hero.scroll")}</span>
        <div className="w-[2px] h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
