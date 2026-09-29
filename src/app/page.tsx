import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teşekkürler | Burcu & Alperen",
  description: "Düğünümüzde oldukça eğlendik, bize katıldığınız için teşekkür ederiz.",
  robots: { index: false, follow: false }
};

const css = [
  "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Pinyon+Script&display=swap');",
  ".ty-root{position:fixed;inset:0;overflow-y:auto;display:flex;align-items:center;justify-content:center;padding:32px 20px;text-align:center;color:#5a4636;font-family:'Cormorant Garamond',Georgia,serif;background:radial-gradient(ellipse at 15% 10%,#fdf7ec 0%,transparent 55%),radial-gradient(ellipse at 90% 90%,#ecd6b0 0%,transparent 55%),#f6ead6;}",
  ".ty-inner{width:100%;max-width:560px;margin:auto;display:flex;flex-direction:column;align-items:center;}",
  ".ty-photo{display:block;width:auto;max-width:min(78vw,340px);max-height:44vh;height:auto;border-radius:28px;box-shadow:0 24px 60px -20px rgba(120,88,40,.45);border:1px solid rgba(184,147,90,.35);}",
  ".ty-date{margin:28px 0 4px;font-size:.85rem;letter-spacing:.32em;text-transform:uppercase;color:#b8935a;}",
  ".ty-names{margin:0;font-family:'Pinyon Script','Cormorant Garamond',cursive;font-weight:400;font-size:clamp(2.8rem,10vw,4.4rem);line-height:1.15;color:#4a3826;}",
  ".ty-line{width:120px;height:1px;margin:14px 0 20px;background:linear-gradient(90deg,transparent,#b8935a,transparent);}",
  ".ty-msg{margin:0;font-style:italic;font-weight:500;font-size:clamp(1.3rem,4.4vw,1.85rem);line-height:1.5;}",
  ".ty-heart{margin-top:18px;font-size:1.4rem;color:#b8935a;}"
].join("");

export default function Home() {
  return (
    <main className="ty-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ty-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ty-photo" src="/images/burcu-alperen-main.png" alt="Burcu ve Alperen" />
        <p className="ty-date">19 Eylül 2026</p>
        <h1 className="ty-names">Burcu &amp; Alperen</h1>
        <div className="ty-line" />
        <p className="ty-msg">
          Düğünümüzde oldukça eğlendik,
          <br />
          bize katıldığınız için teşekkür ederiz.
        </p>
        <div className="ty-heart" aria-hidden="true">♡</div>
      </div>
    </main>
  );
}
