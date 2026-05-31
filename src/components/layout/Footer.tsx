import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="colophon" id="about">
      <div className="footer-inner">
        <div className="foot-grid">
          <div>
            <div className="foot-mark">
              Art with <em>clay</em>
              <br />
              &amp; <em>paint.</em>
            </div>
            <div className="foot-sig">
              Dr. Suhrita De Roy is a 54-year-old gynaecologist working from
              Lake Town, Kolkata. After a retinal scare in early 2025 she
              picked up clay and paint properly, and hasn&apos;t put them
              down since. Every piece is made entirely by hand. No moulds,
              no shortcuts.
            </div>
          </div>

          <div className="foot-col">
            <h4>See</h4>
            <Link href="/gallery">The Workbench</Link>
            <Link href="/blog">Journal</Link>
            <Link href="/shop">Available pieces</Link>
            <Link href="/about">About Suhrita</Link>
          </div>

          <div className="foot-col">
            <h4>Commission</h4>
            <Link href="/custom-order">Start a piece</Link>
            <Link href="/custom-order">Pay-as-you-wish</Link>
            <Link href="/custom-order">Bottle art · portraits · clay</Link>
            <Link href="/about#feedback">Send honest feedback</Link>
          </div>

          <div className="foot-col">
            <h4>Reach Suhrita</h4>
            <Link href="mailto:drsuhritaderoy@yahoo.com">
              drsuhritaderoy@yahoo.com
            </Link>
            <Link href="tel:+919433531075">+91 94335 31075</Link>
            {/* TODO: replace href with mom's actual Facebook page URL */}
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook posts
            </Link>
            <Link href="/about">Studio · Lake Town, Kolkata</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {year} Dr. Suhrita De Roy · Clay Corner · Lake Town, Kolkata
          </span>
          <span>Built by hand. No moulds, no shortcuts.</span>
        </div>
      </div>
    </footer>
  );
}
