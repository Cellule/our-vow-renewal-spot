import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { TranslationKeys } from "@/languages/translations";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/config";

const rsvpFormSchema = z
  .object({
    attending: z.enum(["yes", "no"]).optional(),
    name: z.string().min(1, { message: "rsvp.validation.name" satisfies TranslationKeys }),
    adults: z.coerce.number().min(0).max(20),
    chickenMeals: z.coerce.number().min(0),
    beefMeals: z.coerce.number().min(0),
    vegetarianMeals: z.coerce.number().min(0),
    children: z.coerce.number().min(0).max(20),
    childrenMeals: z.coerce.number().min(0),
    overnightStay: z.coerce.number().min(0),
    roomSharing: z.enum(["yes", "no"]),
    songRequest: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.attending === "no") return;
    const totalMeals = data.chickenMeals + data.beefMeals + data.vegetarianMeals;
    if (totalMeals !== data.adults) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: totalMeals > data.adults ? "Meal count exceeds number of adults" : "Meal count doesn't match number of adults",
        path: ["chickenMeals"],
      });
    }
  });

type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

const defaultValues: RsvpFormValues = {
  attending: undefined,
  name: "",
  adults: 1,
  chickenMeals: 0,
  beefMeals: 0,
  vegetarianMeals: 0,
  children: 0,
  childrenMeals: 0,
  overnightStay: 0,
  roomSharing: "no",
  songRequest: "",
};

const Rsvp = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues,
  });

  const attending = form.watch("attending");
  const adults = form.watch("adults");

  const onSubmit = async (data: RsvpFormValues) => {
    if (submitting) return;
    setSubmitting(true);
    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
            <Link to="/" className="inline-flex items-center gap-2 text-champagne hover:text-gold transition-colors duration-200 mt-6">
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
        <Link to="/" className="inline-flex items-center gap-2 text-champagne hover:text-gold transition-colors duration-200 mb-8">
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                {!!attending && (
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
                )}

                {attending === "yes" && (
                  <>
                    <FormField
                      control={form.control}
                      name="adults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-serif text-lg text-cream">{t("rsvp.adults")}</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                              <SelectTrigger className="bg-cream/20 border-cream/30 text-cream">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                                  <SelectItem key={n} value={String(n)}>
                                    {n}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4 p-4 rounded-lg bg-cream/5 border border-cream/10">
                      <p className="font-serif text-lg text-gold">{t("rsvp.mealAdults")}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="chickenMeals"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-cream/80">{t("rsvp.mealChicken")}</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" min={0} max={adults} className="bg-cream/20 border-cream/30 text-cream" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="beefMeals"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-cream/80">{t("rsvp.mealBeef")}</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" min={0} max={adults} className="bg-cream/20 border-cream/30 text-cream" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="vegetarianMeals"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-cream/80">{t("rsvp.mealVegetarian")}</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" min={0} max={adults} className="bg-cream/20 border-cream/30 text-cream" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-serif text-lg text-cream">{t("rsvp.children")}</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                              <SelectTrigger className="bg-cream/20 border-cream/30 text-cream">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 21 }, (_, i) => i).map((n) => (
                                  <SelectItem key={n} value={String(n)}>
                                    {n}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="childrenMeals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-serif text-lg text-cream">{t("rsvp.mealChildren")}</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min={0} className="bg-cream/20 border-cream/30 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="overnightStay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-serif text-lg text-cream">{t("rsvp.overnightStay")}</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min={0} className="bg-cream/20 border-cream/30 text-cream" />
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
