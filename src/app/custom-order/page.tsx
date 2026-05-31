"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

/**
 * Custom-order form, wrapped in the editorial split-panel + recipe-card layout
 * from sample_design. Posts to /api/custom-order (unchanged shape).
 *
 * Per Soham: NO fixed reply-time / build-time / "from ₹X" line — pay-what-you-want.
 */

interface FormData {
  name: string;
  email: string;
  description: string;
  sizePreference: string;
  budgetRange: string; // free-form per "pay as you want"
  referenceInfo: string;
  howDidYouHear: string;
}

const MEDIUMS = [
  "Bottle art",
  "Portrait",
  "Clay figurine",
  "Painting on cloth",
  "Texture painting",
  "Surprise me",
];

function CustomOrderForm() {
  const searchParams = useSearchParams();
  const initialMedium = searchParams.get("medium") || MEDIUMS[0];
  const [medium, setMedium] = useState(initialMedium);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { sizePreference: "", budgetRange: "" },
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formId, setFormId] = useState<string>("0000");

  // Pick a stable display id once on mount (SSR-safe — random would mismatch)
  useEffect(() => {
    setFormId(Math.floor(1000 + Math.random() * 9000).toString());
  }, []);

  // Sync pill clicks back to form data
  useEffect(() => {
    if (initialMedium && MEDIUMS.includes(initialMedium)) setMedium(initialMedium);
  }, [initialMedium]);

  async function onSubmit(data: FormData) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Bake the chosen medium into the description so it survives the API
          // schema unchanged.
          description: `[Medium: ${medium}]\n${data.description}`,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (submitted) {
    return (
      <section className="section">
        <div className="custom-strip">
          <div className="custom-left">
            <div className="custom-eyebrow">No. 048 · Commission received</div>
            <h2 className="custom-headline">
              Your note <em>landed</em>.
            </h2>
            <p className="custom-body">
              I read every commission request myself. I&apos;ll write back within
              a few days with thoughts, questions, and a sense of how long the
              piece will take. Thank you for trusting this with me.
            </p>
            <div className="custom-foot">
              — Dr. Suhrita De Roy · Lake Town · Kolkata
            </div>
          </div>
          <div className="custom-right">
            <div className="recipe">
              <div className="recipe-head">
                <div>
                  <div className="recipe-form-label">FORM 048-A · ACCEPTED</div>
                  <div className="recipe-title">your piece is in the queue</div>
                </div>
                <div className="recipe-id">#{formId}</div>
              </div>
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--charcoal-700)",
                  margin: "16px 0 0",
                }}
              >
                A confirmation email is on its way (if Resend is configured for
                this site). Otherwise, expect a personal reply soon.
              </p>
              <div className="recipe-foot">
                <button
                  type="button"
                  className="recipe-submit"
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "transparent",
                    color: "var(--charcoal-900)",
                    border: "1px solid var(--charcoal-900)",
                  }}
                >
                  <span>Submit another</span>
                  <small>↗</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="commission">
      <div className="custom-strip">
        <div className="custom-left">
          <div className="custom-eyebrow">No. 048 · Custom commission</div>
          <h2 className="custom-headline">
            Tell me
            <br />
            about the
            <br />
            <em>person</em>.
          </h2>
          <p className="custom-body">
            Every commission begins with a story. Who is this for? What do
            they love? I&apos;ll spend a few sittings shaping a piece you
            won&apos;t find anywhere else, made entirely by hand.
            Pay-as-you-wish.
          </p>
          <div className="custom-pills">
            {MEDIUMS.map((m) => (
              <button
                key={m}
                type="button"
                className={`pill${m === medium ? " active" : ""}`}
                onClick={() => setMedium(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="custom-foot">
            Pay as you wish · 4–8 hours per piece · Inside Kolkata for now
          </div>
        </div>

        <div className="custom-right">
          <form className="recipe" onSubmit={handleSubmit(onSubmit)}>
            <div className="recipe-head">
              <div>
                <div className="recipe-form-label">FORM 048-A · COMMISSION</div>
                <div className="recipe-title">your piece, drafted</div>
              </div>
              <div className="recipe-id">#{formId}</div>
            </div>

            <div className="recipe-row">
              <div className="recipe-key">For</div>
              <div className="recipe-val">
                <input
                  type="text"
                  className="recipe-input"
                  placeholder="your name"
                  {...register("name", { required: "Please share your name" })}
                />
                {errors.name && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--terracotta-500)",
                      fontFamily: "var(--mono)",
                      marginTop: 4,
                    }}
                  >
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>

            <div className="recipe-row">
              <div className="recipe-key">Email</div>
              <div className="recipe-val">
                <input
                  type="email"
                  className="recipe-input"
                  placeholder="how I'll write back"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "That doesn't look like an email",
                    },
                  })}
                />
                {errors.email && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--terracotta-500)",
                      fontFamily: "var(--mono)",
                      marginTop: 4,
                    }}
                  >
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>

            <div className="recipe-row">
              <div className="recipe-key">Medium</div>
              <div className="recipe-val">
                <em style={{ color: "var(--terracotta-500)", fontStyle: "italic" }}>
                  {medium}
                </em>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--charcoal-500)",
                    marginTop: 4,
                  }}
                >
                  Choose with the pills →
                </div>
              </div>
            </div>

            <div className="recipe-row">
              <div className="recipe-key">Size</div>
              <div className="recipe-val">
                <select
                  className="recipe-input"
                  style={{ borderBottomColor: "rgba(58,46,36,0.2)" }}
                  {...register("sizePreference")}
                >
                  <option value="">not sure yet</option>
                  <option value="small">small · under 10cm</option>
                  <option value="medium">medium · 10–20cm</option>
                  <option value="large">large · 20cm+</option>
                </select>
              </div>
            </div>

            <div className="recipe-row">
              <div className="recipe-key">Budget</div>
              <div className="recipe-val">
                <input
                  type="text"
                  className="recipe-input"
                  placeholder="pay as you wish · what feels right"
                  {...register("budgetRange")}
                />
              </div>
            </div>

            <div className="recipe-row" style={{ alignItems: "start" }}>
              <div className="recipe-key">Theme</div>
              <div className="recipe-val">
                <textarea
                  rows={4}
                  className="recipe-input"
                  placeholder="describe a moment, not a thing. who is this for, what does it mean"
                  style={{
                    resize: "vertical",
                    borderBottom: "1px solid rgba(58,46,36,0.2)",
                  }}
                  {...register("description", {
                    required: "Please describe the piece",
                    minLength: {
                      value: 10,
                      message: "A few more words about the piece, please",
                    },
                  })}
                />
                {errors.description && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--terracotta-500)",
                      fontFamily: "var(--mono)",
                      marginTop: 4,
                    }}
                  >
                    {errors.description.message}
                  </div>
                )}
              </div>
            </div>

            <div className="recipe-row">
              <div className="recipe-key">Reference</div>
              <div className="recipe-val">
                <input
                  type="text"
                  className="recipe-input"
                  placeholder="link or note (optional)"
                  {...register("referenceInfo")}
                />
              </div>
            </div>

            <div className="recipe-row">
              <div className="recipe-key">Heard via</div>
              <div className="recipe-val">
                <input
                  type="text"
                  className="recipe-input"
                  placeholder="Instagram · friend · Google (optional)"
                  {...register("howDidYouHear")}
                />
              </div>
            </div>

            {submitError && (
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--terracotta-500)",
                  margin: "16px 0 0",
                  letterSpacing: "0.05em",
                }}
              >
                {submitError}
              </div>
            )}

            <div className="recipe-foot">
              <button
                type="submit"
                className="recipe-submit"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting ? "Sending..." : "Begin the commission"}
                </span>
                <small>↗ FORM</small>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function CustomOrderPage() {
  // useSearchParams requires a Suspense boundary in Next 15+ App Router.
  return (
    <Suspense fallback={null}>
      <CustomOrderForm />
    </Suspense>
  );
}
