import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Loader2, RotateCcw } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import Button from "../UI/Button.jsx";

const initialForm = {
  name: "",
  phone: "",
  date: "",
  contactMethod: "phone",
  message: "",
};

function todayISO() {
  // ISO yyyy-mm-dd for the local date
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function validate(values, t) {
  const errors = {};
  if (!values.name.trim()) errors.name = t("appointment.err.name");

  // Phone: at least 7 digits; allow +, spaces, dashes, parentheses
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 7) errors.phone = t("appointment.err.phone");

  if (!values.date) {
    errors.date = t("appointment.err.date");
  } else if (values.date < todayISO()) {
    errors.date = t("appointment.err.date");
  }

  if (!values.contactMethod) errors.contactMethod = t("appointment.err.contact");

  return errors;
}

export default function AppointmentForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const minDate = useMemo(() => todayISO(), []);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear the field error as the user edits
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(values, t);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // Simulated local validation delay; no network request is made.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSuccess(true);
    // Do NOT retain entered data after successful validation.
    setValues(initialForm);
  }

  function handleReset() {
    setValues(initialForm);
    setErrors({});
    setSuccess(false);
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        role="status"
        aria-live="polite"
        className="rounded-xl border border-green-200 bg-green-50 p-6"
      >
        <h3 className="text-lg font-semibold text-green-800">
          {t("appointment.successTitle")}
        </h3>
        <p className="mt-2 text-sm text-green-900">
          {t("appointment.successBody")}
        </p>
        <p className="mt-3 text-sm font-medium text-green-900">
          {t("appointment.successNote")}
        </p>
        <div className="mt-5">
          <Button onClick={handleReset} variant="secondary">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("appointment.another")}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-xl border border-border bg-white p-6 shadow-sm"
    >
      <p className="text-sm text-ink-600">{t("appointment.requiredNote")}</p>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-semibold text-navy-900"
        >
          {t("appointment.name")}{" "}
          <span aria-hidden="true" className="text-red-600">
            *
          </span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={handleChange}
          placeholder={t("appointment.namePlaceholder")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-semibold text-navy-900"
        >
          {t("appointment.phone")}{" "}
          <span aria-hidden="true" className="text-red-600">
            *
          </span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={handleChange}
          placeholder={t("appointment.phonePlaceholder")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className="focus-ring ltr-embed w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="mb-1 block text-sm font-semibold text-navy-900"
        >
          {t("appointment.date")}{" "}
          <span aria-hidden="true" className="text-red-600">
            *
          </span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          min={minDate}
          value={values.date}
          onChange={handleChange}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "date-error" : undefined}
          className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
        />
        {errors.date && (
          <p id="date-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.date}
          </p>
        )}
      </div>

      {/* Contact method */}
      <fieldset>
        <legend className="mb-1 block text-sm font-semibold text-navy-900">
          {t("appointment.contactMethod")}{" "}
          <span aria-hidden="true" className="text-red-600">
            *
          </span>
        </legend>
        <label className="flex items-center gap-2 text-sm text-ink-600">
          <input
            type="radio"
            name="contactMethod"
            value="phone"
            checked={values.contactMethod === "phone"}
            onChange={handleChange}
            className="focus-ring"
          />
          {t("appointment.contactPhone")}
        </label>
        {errors.contactMethod && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.contactMethod}
          </p>
        )}
      </fieldset>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-semibold text-navy-900"
        >
          {t("appointment.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          placeholder={t("appointment.messagePlaceholder")}
          className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t("appointment.submitting")}
            </>
          ) : (
            <>
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {t("appointment.submit")}
            </>
          )}
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t("appointment.reset")}
        </Button>
      </div>

      <AnimatePresence />
    </form>
  );
}