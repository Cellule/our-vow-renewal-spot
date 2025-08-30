import { Calendar, MapPin, Clock, Users } from "lucide-react";

const EventDetails = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-champagne to-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-burgundy mb-6">
            Celebration Details
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-8"></div>
          <p className="font-serif text-xl text-navy/80 max-w-2xl mx-auto">
            Join us for an evening of love, renewal, and celebration
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-burgundy/10 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-cream" />
            </div>
            <h3 className="font-serif text-xl text-burgundy mb-4">Date</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">[Month Day, Year]</p>
            <p className="font-sans text-muted-foreground">[Day of Week]</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-emerald/10 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-cream" />
            </div>
            <h3 className="font-serif text-xl text-emerald mb-4">Time</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">[Ceremony Time]</p>
            <p className="font-sans text-muted-foreground">Reception to follow</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-navy/10 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-cream" />
            </div>
            <h3 className="font-serif text-xl text-navy mb-4">Location</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">[Venue Name]</p>
            <p className="font-sans text-muted-foreground text-sm">[Address]</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 text-center shadow-soft border border-gold/20 hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-burgundy" />
            </div>
            <h3 className="font-serif text-xl text-burgundy mb-4">Dress Code</h3>
            <p className="font-sans text-foreground font-semibold text-lg mb-2">[Dress Code]</p>
            <p className="font-sans text-muted-foreground text-sm">Jewel tones encouraged</p>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-elegant rounded-2xl p-12 text-center shadow-elegant">
          <div className="max-w-3xl mx-auto text-cream">
            <h3 className="font-script text-4xl md:text-5xl mb-6">
              Your Presence is Our Present
            </h3>
            <p className="font-serif text-lg md:text-xl mb-8 leading-relaxed">
              We are so grateful for the love and support you've shown us throughout our marriage. 
              Your presence at our vow renewal celebration would make this day even more special.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-serif text-xl mb-4 text-gold">Getting There</h4>
                <p className="font-sans text-champagne">
                  [Include parking information, transportation options, or any special instructions]
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-4 text-gold">Accommodations</h4>
                <p className="font-sans text-champagne">
                  [Include nearby hotel recommendations or accommodation details if needed]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;