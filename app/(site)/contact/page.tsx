import { PageHero, Wrap } from "@/components/ui";
import { socials } from "@/lib/data";
export const metadata = { title: "Contact | O2 Innovations Lab" };
export default function Contact() {
  return (<main><PageHero title="Tell us what you need" text="Book a demo, ask about a course, or visit the lab." />
    <Wrap><div className="grid md:grid-cols-2 gap-10"><div className="grid gap-4 content-start"><p><b>Address</b><br />Plot 160 AJ Ahmadu Plaza (Liyafa Bakery), Custom Line, Makurdi Rd, Lafia, Nasarawa State</p>
      <p><b>Phone</b><br /><a href="tel:+2349039022216">+234 903 902 2216</a></p><p><b>Email</b><br /><a href="mailto:02Innovationslab@gmail.com">02Innovationslab@gmail.com</a></p>
      <div className="flex flex-wrap gap-2">{socials.map(([n, u]) => <a key={n} href={u} className="rounded-full border border-ink/30 px-4 py-1 text-sm">{n}</a>)}</div></div>
      <form action="mailto:02Innovationslab@gmail.com" method="post" encType="text/plain" className="grid gap-3">{["Name", "Email", "Organisation"].map(f => <label key={f} className="grid gap-1 text-sm font-medium">{f}<input name={f} type={f === 'Email' ? 'email' : 'text'} placeholder={f === 'Name' ? 'Your name' : f === 'Email' ? 'you@example.com' : 'Your organisation'} required className="rounded-lg border border-ink/20 bg-white px-4 py-3" /></label>)}
        <label className="grid gap-1 text-sm font-medium">Message<textarea name="Message" rows={5} placeholder="How can we help?" required className="rounded-lg border border-ink/20 bg-white px-4 py-3" /></label><button className="rounded-lg bg-navy text-white py-3 font-semibold">Send message</button></form></div></Wrap></main>);
}
