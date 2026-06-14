import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Heart, Plus, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsWeekend } from "@/hooks/use-is-weekend";
import { TranslationKeys } from "@/languages/translations";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/config";

const rsvpAttendingSchema = z.object({
  attending: z.enum(["yes", "no"], {
    required_error: "rsvp.validation.attending" satisfies TranslationKeys,
  }),
  name: z.string().min(1, { message: "rsvp.validation.name" satisfies TranslationKeys }),
});

const rsvpFormSchema = rsvpAttendingSchema.extend({
  guests: z
    .array(
      z.object({
        name: z.string().min(1, { message: "rsvp.validation.name" satisfies TranslationKeys }),
        meal: z.enum(["chicken", "beef", "vegetarian", "kids"], {
          required_error: "rsvp.validation.meal" satisfies TranslationKeys,
        }),
        dietaryRestriction: z.string().optional().or(z.literal("")),
      }),
    )
    .min(1, {
      message: "rsvp.validation.guests" satisfies TranslationKeys,
    }),
  sundayBrunch: z.enum(["yes", "no"], {
    required_error: "rsvp.validation.sundayBrunch" satisfies TranslationKeys,
  }),
  requireAccommodations: z.enum(["yes", "no"], {
    required_error: "rsvp.validation.requireAccommodations" satisfies TranslationKeys,
  }),
  guestsInRoom: z.coerce.number().optional(),
  nightsStaying: z.array(z.string()).optional(),
  adultsOvernight: z.coerce.number().optional(),
  childrenOvernight: z.coerce.number().optional(),
  specialArrangements: z.string().optional(),
  roomSharing: z.enum(["yes", "no"]).optional(),
  songRequest: z.string().optional(),
  guestQuestions: z.string().optional(),
  guestNote: z.string().optional(),
});
rsvpFormSchema.superRefine((data, ctx) => {
  if (data.requireAccommodations === "yes") {
    if (!data.guestsInRoom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "rsvp.validation.guestsInRoom" satisfies TranslationKeys,
        path: ["guestsInRoom"],
      });
    }
    if (!data.roomSharing) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "rsvp.validation.roomSharing" satisfies TranslationKeys,
        path: ["roomSharing"],
      });
    }
  }
});

const rsvpWeekendFormSchema = rsvpFormSchema.extend({
  fridayWelcomeGathering: z.enum(["yes", "no"], {
    required_error: "rsvp.validation.fridayWelcomeGathering" satisfies TranslationKeys,
  }),
});

rsvpWeekendFormSchema.superRefine((data, ctx) => {
  if (data.requireAccommodations === "yes") {
    if (data.fridayWelcomeGathering && (!data.nightsStaying || data.nightsStaying.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "rsvp.validation.nightsStaying" satisfies TranslationKeys,
        path: ["nightsStaying"],
      });
    }
  }
});

type RsvpFormValues = z.infer<typeof rsvpWeekendFormSchema>;

const defaultValues = {
  attending: undefined,
  name: "",
  guests: [{ name: "", meal: undefined, dietaryRestriction: "" }],
  requireAccommodations: undefined,
  guestsInRoom: undefined,
  nightsStaying: [],
  adultsOvernight: undefined,
  childrenOvernight: undefined,
  specialArrangements: "",
  roomSharing: undefined,
  fridayWelcomeGathering: undefined,
  sundayBrunch: undefined,
  songRequest: "",
  guestQuestions: "",
  guestNote: "",
};

function getSchema(isWeekend: boolean, isAttending: string | undefined) {
  if (isAttending === "no") {
    return rsvpAttendingSchema;
  }
  if (isWeekend) {
    return rsvpWeekendFormSchema;
  }
  return rsvpFormSchema;
}

const Rsvp = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isWeekend = useIsWeekend();
  const [isAttending, setIsAttending] = useState<string | undefined>(undefined);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(getSchema(isWeekend, isAttending)),
    defaultValues,
  });

  const attending = form.watch("attending");
  if (isAttending !== attending) {
    setIsAttending(attending);
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "guests",
  });

  const respondentName = form.watch("name");
  const firstName = form.watch("guests.0.name");
  if (fields.length > 0 && firstName !== respondentName) {
    form.setValue("guests.0.name", respondentName);
  }

  const onSubmit = async (data: RsvpFormValues) => {
    if (submitting) return;
    setSubmitting(true);
    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const onInvalid = () => {
    toast.error(t("rsvp.validation.formInvalid"));
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-burgundy via-navy to-burgundy flex items-center justify-center p-4">
        <LanguageSwitcher />
        <Card className="w-full max-w-lg bg-cream/10 backdrop-blur-md border-cream/20 shadow-elegant text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-gold" fill="currentColor" />
            </div>
            <CardTitle className="font-script text-4xl md:text-5xl text-cream">{t("rsvp.thankYou")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to={isWeekend ? "/weekend" : "/"} className="inline-flex items-center gap-2 text-champagne hover:text-gold transition-colors duration-200 mt-6">
              <ArrowLeft className="w-4 h-4" />
              {t("rsvp.backToHome")}
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-burgundy via-navy to-burgundy">
      <LanguageSwitcher />
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <Link to={isWeekend ? "/weekend" : "/"} className="inline-flex items-center gap-2 text-champagne hover:text-gold transition-colors duration-200 mb-8">
          <ArrowLeft className="w-4 h-4" />
          {t("rsvp.backToHome")}
        </Link>

        <Card className="bg-cream/10 backdrop-blur-md border-cream/20 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="font-script text-4xl md:text-5xl text-cream">{t("rsvp.title")}</CardTitle>
            <CardDescription className="font-serif text-lg text-champagne">{t("rsvp.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-serif text-lg text-cream">{t("rsvp.name")}</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attending"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-serif text-xl text-cream">{t("rsvp.attending")}</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="attending-yes" className="border-gold text-gold" />
                            <label htmlFor="attending-yes" className="text-cream cursor-pointer">
                              {t("rsvp.attendingYes")}
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="attending-no" className="border-gold text-gold" />
                            <label htmlFor="attending-no" className="text-cream cursor-pointer">
                              {t("rsvp.attendingNo")}
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {attending === "no" && (
                  <div className="p-6 rounded-lg bg-cream/5 border border-cream/10 text-center space-y-3">
                    <p className="font-script text-3xl text-gold">{t("rsvp.declineTitle")}</p>
                    <p className="font-serif text-lg text-cream/80">{t("rsvp.declineParagraph")}</p>
                  </div>
                )}

                {attending === "yes" && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <p className="font-serif text-lg text-gold">{t("rsvp.guestsTitle")}</p>
                        <p className="text-cream/60 text-sm">{t("rsvp.guestsDescription")}</p>
                      </div>

                      {fields.map((field, index) => (
                        <div key={field.id} className="p-4 rounded-lg bg-cream/5 border border-cream/10 space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="font-serif text-cream/80 text-sm">
                              {t("rsvp.guest")} {index + 1}
                            </p>
                            {fields.length > 1 && index !== 0 && (
                              <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                                <X className="w-4 h-4 mr-1" />
                                {t("rsvp.removeGuest")}
                              </Button>
                            )}
                          </div>

                          <FormField
                            control={form.control}
                            name={`guests.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cream/80">{t("rsvp.guestName")}</FormLabel>
                                <FormControl>
                                  <Input {...field} readOnly={index === 0} className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`guests.${index}.meal`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cream/80">{t("rsvp.guestMeal")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-cream/20 border-cream/30 text-cream">
                                      <SelectValue placeholder={t("rsvp.mealPlaceholder")} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="chicken">{t("rsvp.mealChicken")}</SelectItem>
                                    <SelectItem value="beef">{t("rsvp.mealBeef")}</SelectItem>
                                    <SelectItem value="vegetarian">{t("rsvp.mealVegetarian")}</SelectItem>
                                    <SelectItem value="kids">{t("rsvp.mealKids")}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`guests.${index}.dietaryRestriction`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cream/80">
                                  {t("rsvp.dietaryRestriction")} <span className="text-cream/50 text-xs">{t("rsvp.dietaryRestrictionOptional")}</span>
                                </FormLabel>
                                <FormControl>
                                  <Input {...field} className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => append({ name: "", meal: undefined as unknown as "chicken" | "beef" | "vegetarian" | "kids", dietaryRestriction: "" })}
                        className="w-full border-dashed border-cream/30 text-cream/70 hover:text-cream hover:border-cream/50"
                      >
                        <Plus className="w-4 h-4" />
                        {t("rsvp.addGuest")}
                      </Button>
                    </div>

                    <div>
                      <p className="font-serif text-lg text-gold">{t("rsvp.weekendEvents")}</p>
                    </div>

                    {isWeekend && (
                      <FormField
                        control={form.control}
                        name="fridayWelcomeGathering"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-serif text-lg text-cream">{t("rsvp.fridayWelcomeGathering")}</FormLabel>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="friday-yes" className="border-gold text-gold" />
                                  <label htmlFor="friday-yes" className="text-cream cursor-pointer">
                                    {t("rsvp.yes")}
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="friday-no" className="border-gold text-gold" />
                                  <label htmlFor="friday-no" className="text-cream cursor-pointer">
                                    {t("rsvp.no")}
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="sundayBrunch"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-serif text-lg text-cream">{t("rsvp.sundayBrunch")}</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="sunday-yes" className="border-gold text-gold" />
                                <label htmlFor="sunday-yes" className="text-cream cursor-pointer">
                                  {t("rsvp.yes")}
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="sunday-no" className="border-gold text-gold" />
                                <label htmlFor="sunday-no" className="text-cream cursor-pointer">
                                  {t("rsvp.no")}
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <p className="font-serif text-lg text-gold">{t("rsvp.travelAndAccommodations")}</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="requireAccommodations"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-serif text-lg text-cream">{t("rsvp.requireAccommodations")}</FormLabel>
                          <p className="font-sans text-sm text-cream/60">{t("rsvp.accommodationsFreeNote")}</p>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="accommodations-yes" className="border-gold text-gold" />
                                <label htmlFor="accommodations-yes" className="text-cream cursor-pointer">
                                  {t("rsvp.yes")}
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="accommodations-no" className="border-gold text-gold" />
                                <label htmlFor="accommodations-no" className="text-cream cursor-pointer">
                                  {t("rsvp.no")}
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("requireAccommodations") === "yes" && (
                      <>
                        <FormField
                          control={form.control}
                          name="guestsInRoom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif text-lg text-cream">{t("rsvp.guestsInRoom")}</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" min={0} className="bg-cream/20 border-cream/30 text-cream" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {isWeekend && (
                          <FormField
                            control={form.control}
                            name="nightsStaying"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-serif text-lg text-cream">{t("rsvp.nightsStaying")}</FormLabel>
                                <div className="space-y-2">
                                  {(["friday", "saturday"] as const).map((night) => (
                                    <div key={night} className="flex items-center gap-2">
                                      <Checkbox
                                        checked={field.value?.includes(night)}
                                        onCheckedChange={(checked) => {
                                          const current = field.value ?? [];
                                          if (checked) {
                                            field.onChange([...current, night]);
                                          } else {
                                            field.onChange(current.filter((n) => n !== night));
                                          }
                                        }}
                                        className="border-gold data-[state=checked]:bg-gold data-[state=checked]:text-navy"
                                      />
                                      <label className="text-cream cursor-pointer font-sans font-normal">{t(night === "friday" ? "rsvp.nightFriday" : "rsvp.nightSaturday")}</label>
                                    </div>
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name="adultsOvernight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif text-lg text-cream">{t("rsvp.adultsOvernight")}</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" min={0} className="bg-cream/20 border-cream/30 text-cream" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="childrenOvernight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif text-lg text-cream">{t("rsvp.childrenOvernight")}</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" min={0} className="bg-cream/20 border-cream/30 text-cream" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="specialArrangements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-serif text-lg text-cream">{t("rsvp.specialArrangements")}</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="roomSharing"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="font-serif text-lg text-cream">{t("rsvp.roomSharing")}</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="share-yes" className="border-gold text-gold" />
                                    <label htmlFor="share-yes" className="text-cream cursor-pointer">
                                      {t("rsvp.yes")}
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="share-no" className="border-gold text-gold" />
                                    <label htmlFor="share-no" className="text-cream cursor-pointer">
                                      {t("rsvp.no")}
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <div>
                      <p className="font-serif text-lg text-gold">{t("rsvp.finalNotes")}</p>
                    </div>
                    <FormField
                      control={form.control}
                      name="songRequest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-serif text-lg text-cream">
                            {t("rsvp.songRequest")} <span className="text-cream/50 text-sm">{t("rsvp.songRequestOptional")}</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guestQuestions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-serif text-lg text-cream">
                            {t("rsvp.guestQuestions")} <span className="text-cream/50 text-sm">{t("rsvp.songRequestOptional")}</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guestNote"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-serif text-lg text-cream">
                            {t("rsvp.guestNote")} <span className="text-cream/50 text-sm">{t("rsvp.songRequestOptional")}</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {!!attending && (
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-gold/50 hover:bg-gold/60 text-cream font-semibold text-lg py-6 border-2 border-gold/70 hover:border-gold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {form.formState.isSubmitting ? t("rsvp.submitting") : t("rsvp.submit")}
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Rsvp;
