"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Honest-feedback form. Per Soham (plan Q28): "she doesn't just want praise,
 * she wants critique." Posts to /api/feedback which forwards to Resend +
 * Sanity if either is configured.
 *
 * Visual: lives in a recipe-card-styled box, anchored at /about#feedback.
 */

interface FeedbackData {
  name: string; // optional
  email: string; // optional
  medium: string;
  pieceTitle: string;
  message: string;
}

const MEDIUM_OPTIONS = [
  "All her work",
  "A specific clay figurine",
  "A portrait drawing",
  "A bottle art piece",
  "A texture painting",
  "A cartoon sketch",
  "Something else",
];

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackData>({
    defaultValues: { medium: MEDIUM_OPTIONS[0] },
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(data: FeedbackData) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.message || "Couldn't deliver your note. Please try again.",
        );
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Couldn't deliver your note.",
      );
    }
  }

  if (submitted) {
    return (
      <div className="recipe" style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="recipe-head">
          <div>
            <div className="recipe-form-label">FORM 049-B · NOTE RECEIVED</div>
            <div className="recipe-title">thank you for the honesty</div>
          </div>
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
          I read every note. The harder ones twice. — Suhrita
        </p>
        <div className="recipe-foot">
          <button
            type="button"
            className="recipe-submit"
            onClick={() => setSubmitted(false)}
            style={{ background: "transparent", color: "var(--charcoal-900)", border: "1px solid var(--charcoal-900)" }}
          >
            <span>Send another</span>
            <small>↗</small>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="recipe"
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 640, margin: "0 auto" }}
    >
      <div className="recipe-head">
        <div>
          <div className="recipe-form-label">FORM 049-B · HONEST FEEDBACK</div>
          <div className="recipe-title">tell me what you really think</div>
        </div>
      </div>

      <div className="recipe-row">
        <div className="recipe-key">Your name</div>
        <div className="recipe-val">
          <input
            type="text"
            className="recipe-input"
            placeholder="optional · anonymous is fine"
            {...register("name")}
          />
        </div>
      </div>

      <div className="recipe-row">
        <div className="recipe-key">Your email</div>
        <div className="recipe-val">
          <input
            type="email"
            className="recipe-input"
            placeholder="only if you'd like a reply"
            {...register("email", {
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
        <div className="recipe-key">About</div>
        <div className="recipe-val">
          <select
            className="recipe-input"
            style={{ borderBottomColor: "rgba(58,46,36,0.2)" }}
            {...register("medium")}
          >
            {MEDIUM_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="recipe-row">
        <div className="recipe-key">Piece title</div>
        <div className="recipe-val">
          <input
            type="text"
            className="recipe-input"
            placeholder="if you remember which one"
            {...register("pieceTitle")}
          />
        </div>
      </div>

      <div
        className="recipe-row"
        style={{ gridTemplateColumns: "110px 1fr", alignItems: "start" }}
      >
        <div className="recipe-key">Your note</div>
        <div className="recipe-val">
          <textarea
            rows={5}
            className="recipe-input"
            placeholder="What didn't work? What felt off? Be honest. That's what I want."
            style={{ resize: "vertical", borderBottom: "1px solid rgba(58,46,36,0.2)" }}
            {...register("message", {
              required: "Please share at least a sentence",
              minLength: {
                value: 10,
                message: "A few more words, please",
              },
            })}
          />
          {errors.message && (
            <div
              style={{
                fontSize: 11,
                color: "var(--terracotta-500)",
                fontFamily: "var(--mono)",
                marginTop: 4,
              }}
            >
              {errors.message.message}
            </div>
          )}
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
        <button type="submit" className="recipe-submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Sending..." : "Send the honest note"}</span>
          <small>↗ FORM</small>
        </button>
      </div>
    </form>
  );
}
