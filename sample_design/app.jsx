// Clay Corner — main app
const { useState, useEffect } = React;

function App() {
  const defaults = window.__TWEAKS__;
  const [tweaks, setTweak] = useTweaks(defaults);

  // Apply texture toggle to body
  useEffect(() => {
    document.body.classList.toggle("tweak-paper-off", !tweaks.paperTexture);
  }, [tweaks.paperTexture]);

  // Apply accent color
  useEffect(() => {
    const palettes = {
      terracotta: ["#d97757", "#b85a3a", "#8a3e26"],
      indigo:     ["#7c8ec5", "#4d6499", "#2e3f6e"],
      sage:       ["#8fa67e", "#647d57", "#3d4b34"],
      ochre:      ["#d6a85a", "#a87a30", "#7a531c"],
    };
    const p = palettes[tweaks.accent] || palettes.terracotta;
    document.documentElement.style.setProperty("--terracotta-300", p[0]);
    document.documentElement.style.setProperty("--terracotta-500", p[1]);
    document.documentElement.style.setProperty("--terracotta-700", p[2]);
  }, [tweaks.accent]);

  // Apply warmth (cream tone shift)
  useEffect(() => {
    const w = tweaks.warmth / 100;
    const cream50  = `oklch(${0.96 - 0.01*(1-w)} ${0.018 * w} ${75 + 5*(1-w)})`;
    const cream100 = `oklch(${0.92 - 0.01*(1-w)} ${0.025 * w} ${75 + 5*(1-w)})`;
    document.documentElement.style.setProperty("--cream-50",  cream50);
    document.documentElement.style.setProperty("--cream-100", cream100);
  }, [tweaks.warmth]);

  return (
    <>
      <Nav />
      <Hero tweaks={tweaks} />
      <Workbench tweaks={tweaks} />
      <YearInClay />
      <CustomOrder />
      <Stories />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Texture & feel">
          <TweakToggle label="Paper grain overlay"
            value={tweaks.paperTexture}
            onChange={v => setTweak("paperTexture", v)} />
          <TweakSlider label="Cream warmth" min={0} max={100} step={5}
            value={tweaks.warmth}
            onChange={v => setTweak("warmth", v)} />
          <TweakSlider label="Hero emboss depth" min={0.4} max={2.4} step={0.1}
            value={tweaks.embossDepth}
            onChange={v => {
              setTweak("embossDepth", v);
              document.querySelectorAll(".embossed").forEach(el => {
                el.style.textShadow = `${-v}px ${-v}px 0 rgba(80,40,20,0.55), ${v}px ${v}px 0 rgba(255,235,200,0.4), 0 0 1px rgba(40,20,10,0.4)`;
              });
            }} />
        </TweakSection>

        <TweakSection title="Accent palette">
          <TweakRadio
            value={tweaks.accent}
            onChange={v => setTweak("accent", v)}
            options={[
              { value: "terracotta", label: "Terracotta" },
              { value: "ochre",      label: "Ochre" },
              { value: "sage",       label: "Sage" },
              { value: "indigo",     label: "Indigo" },
            ]} />
        </TweakSection>

        <TweakSection title="Workbench">
          <TweakToggle label="Sticky-note annotations"
            value={tweaks.showAnnotations}
            onChange={v => setTweak("showAnnotations", v)} />
          <TweakToggle label="Live studio session card"
            value={tweaks.showLiveSession}
            onChange={v => setTweak("showLiveSession", v)} />
          <TweakText label="Top sticky note" multiline
            value={tweaks.stickyNoteText}
            onChange={v => setTweak("stickyNoteText", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
