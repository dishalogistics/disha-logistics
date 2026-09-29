import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiMapPin,
  FiShield,
  FiMail,
  FiPhone,
  FiStar,
} from "react-icons/fi";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const testimonials = [
  {
    title: "Competitive Rates & Quality Service",
    text: "Disha Logistics offers competitive transportation rates without compromising on service quality. Their team is cooperative, responsive, and always ready to assist.",
    company: "Bancool Trading Company",
    location: "Gorakhpur",
  },
  {
    title: "Reliable Service, Every Time",
    text: "Disha Logistics has consistently provided us with dependable transportation services. Their team is highly professional, responsive, and committed to ensuring the safe and timely delivery of our goods.",
    company: "Asian Traders",
    location: "Nepal",
  },
  {
    title: "On-Time Delivery",
    text: "We appreciate the punctuality and coordination of the Disha Logistics team. They keep us well-informed throughout the transit process and ensure smooth and timely deliveries.",
    company: "Goodryde International",
    location: "Bhiwadi, Rajasthan",
  },
  {
    title: "Safe & Hassle-Free Transportation",
    text: "Our consignments are handled with utmost care and delivered safely. Disha Logistics has become a trusted transportation partner for our regular business needs.",
    company: "Safal Motor Centre",
    location: "Nepal",
  },
  {
    title: "Professional & Cooperative Team",
    text: "Highly professional service with excellent coordination. Whenever we require a vehicle, the Disha Logistics team responds promptly and manages transportation efficiently.",
    company: "Astral Limited",
    location: "Ahmedabad",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#f7faff]">
      <section className="relative overflow-hidden px-5 pb-16 pt-16 text-white lg:pb-24 lg:pt-24">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-md"
          style={{ backgroundImage: "url('/home.jpeg')" }}
        />

        <div className="absolute inset-0 bg-[#0b1a33]/65" />

        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(21,94,239,.55),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <div className="relative z-10 flex items-center justify-center lg:justify-start">
            <div className="relative w-full max-w-[620px]">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl">
                <img
                  src="/home.jpeg"
                  alt="Disha Logistics"
                  className="h-auto max-h-[500px] w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1a33]/20 via-transparent to-white/5" />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-2xl lg:pl-4">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur-sm">
              <FiShield className="text-blue-300" />
              Reliable Logistics Partner
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Moving Your Business
              <span className="block text-blue-400">Forward</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              Reliable, secure and efficient logistics solutions designed to
              keep your business moving across India and beyond.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
              >
                Get Started
                <FiArrowRight />
              </Link>

              {/* <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Explore Services
              </Link> */}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <FiCheckCircle className="shrink-0 text-blue-400" />
                Pan India Delivery
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-200">
                <FiCheckCircle className="shrink-0 text-blue-400" />
                Secure Handling
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-200">
                <FiCheckCircle className="shrink-0 text-blue-400" />
                On-Time Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 py-16 lg:py-20"
      >
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-[#155eef]">
            ONE PLATFORM, THREE WORKFLOWS
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0b1a33] sm:text-4xl">
            Logistics that works for everyone
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
            Simple, reliable and transparent logistics solutions designed for
            customers, transporters and operations teams.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            [
              "For customers",
              "Book a truck, track every milestone, and keep your invoices organised.",
              "Book & track",
            ],
            [
              "For transporters",
              "Find verified loads, manage trips and stay on top of settlements.",
              "Move more loads",
            ],
            [
              "For admins",
              "Control operations, partners, shipments and exceptions from one desk.",
              "Run operations",
            ],
          ].map(([title, text, cta], index) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 font-extrabold text-[#155eef] transition group-hover:bg-[#155eef] group-hover:text-white">
                0{index + 1}
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#0b1a33]">{title}</h3>

              <p className="mt-2 leading-7 text-slate-500">{text}</p>

              <Link
                to="/register"
                className="mt-6 inline-flex items-center gap-1 font-bold text-[#155eef]"
              >
                {cta}
                <FiArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["50+", "Shipments delivered"],
            ["28", "States covered"],
            ["10+", "Business customers"],
            ["98%", "On-time delivery"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-4xl font-extrabold text-[#0b1a33]">{value}</p>

              <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#f7faff] px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <p className="text-sm font-bold tracking-widest text-[#155eef]">
              WHAT OUR CLIENTS SAY
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#0b1a33] sm:text-4xl">
              Trusted by businesses
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
              Reliable transportation, responsive coordination and dependable
              service trusted by businesses across different locations.
            </p>
          </div>

          {/* Testimonials */}
          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.company}
                className="min-w-[88%] snap-start rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-w-[70%] lg:min-w-0"
              >
                {/* Stars */}
                <div className="flex gap-1 text-[#ffb703]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} size={17} className="fill-current" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold text-[#0b1a33]">
                  {testimonial.title}
                </h3>

                {/* Review */}
                <p className="mt-3 leading-7 text-slate-600">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Company */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="font-bold text-[#0b1a33]">
                    — {testimonial.company}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <FiMapPin size={14} />
                    {testimonial.location}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/*COMPLIANCE*/}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-bold tracking-widest text-[#155eef]">
            COMPLIANCE, WITHOUT THE CHAOS
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-[#0b1a33] sm:text-4xl">
            Freight documents where your team needs them.
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Keep billing, GST-ready invoices and E-Way Bill preparation
            alongside each shipment. Your operational paperwork stays connected
            to the trip.
          </p>

          <Link
            to="/register"
            className="mt-6 inline-flex items-center gap-2 font-bold text-[#155eef]"
          >
            Explore the platform
            <FiArrowRight />
          </Link>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-7">
          <FiShield size={30} className="text-[#155eef]" />

          <h3 className="mt-5 text-xl font-bold text-[#0b1a33]">
            Built for Indian road transport
          </h3>

          <ul className="mt-4 space-y-3 text-slate-600">
            {[
              "Road freight lanes across India",
              "Role-specific operations dashboards",
              "E-Way Bill preparation workspace",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <FiCheckCircle className="mt-1 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/*
          Contact Us Section
          Added:
          Email: info@dishalogistic.in
          Phone: 9169387909 / 6306239625
          Branch: Gorakhpur
          Social: Instagram / Facebook / LinkedIn
     */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="overflow-hidden rounded-[2rem] bg-[#0b1a33] px-6 py-12 text-white shadow-xl sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            {/* Left Content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                Get in touch
              </p>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Let&apos;s move your business forward.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-slate-300">
                Have a shipment requirement or want to know more about Disha
                Logistics? Our team is ready to help.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="mailto:info@dishalogistic.in"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#0b1a33] transition hover:bg-blue-50"
                >
                  <FiMail />
                  Email us
                </a>

                <a
                  href="tel:9169387909"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-bold transition hover:bg-white/10"
                >
                  <FiPhone />
                  Call us
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {/* Email */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Mail us on</p>

                <a
                  href="mailto:info@dishalogistic.in"
                  className="mt-1 block font-semibold transition hover:text-blue-300"
                >
                  info@dishalogistic.in
                </a>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Call us on</p>

                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-semibold">
                  <a
                    href="tel:9169387909"
                    className="transition hover:text-blue-300"
                  >
                    9169387909
                  </a>

                  <a
                    href="tel:6306239625"
                    className="transition hover:text-blue-300"
                  >
                    6306239625
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Find us on</p>

                <div className="mt-3 flex gap-3">
                  <a
                    href="https://www.instagram.com/dishalogistics?igsh=MXBtenZ1ODZnOGk4ZQ=="
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="rounded-xl border border-white/10 p-3 transition hover:bg-white/10"
                  >
                    <FaInstagram size={20} />
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61592903228244&utm_source=chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="rounded-xl border border-white/10 p-3 transition hover:bg-white/10"
                  >
                    <FaFacebook size={20} />
                  </a>

                  <a
                    href="https://linkedin.com/company/disha-logistics"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-xl border border-white/10 p-3 transition hover:bg-white/10"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>

              {/* Branch */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Branches</p>

                <p className="mt-1 flex items-center gap-2 font-semibold">
                  <FiMapPin className="text-blue-300" />
                  Gorakhpur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
