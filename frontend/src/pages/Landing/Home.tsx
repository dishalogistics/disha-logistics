import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiMapPin,
  FiShield,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#f7faff]">
      {/* Hero Section */}
      {/* <section className="relative bg-[#0b1a33] px-5 pb-20 pt-16 text-white lg:pb-28 lg:pt-24">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(21,94,239,.55),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-blue-100">
              <FiMapPin className="text-[#ffb703]" />
              Pan-India road freight, made simple
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Every truck. Every route.{" "}
              <span className="text-[#ffb703]">One clear view.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Book, move and manage your road freight across India with Disha
              Logistics—built for businesses, fleet owners and operations teams.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#ffb703] px-5 py-3.5 font-bold text-[#0b1a33]"
              >
                Start shipping <FiArrowRight />
              </Link>
              <a
                href="#how-it-works"
                className="rounded-xl border border-white/25 px-5 py-3.5 font-semibold hover:bg-white/10"
              >
                How it works
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <FiCheckCircle className="text-[#ffb703]" />
                GST-ready invoicing
              </span>
              <span className="inline-flex items-center gap-2">
                <FiCheckCircle className="text-[#ffb703]" />
                Live trip updates
              </span>
            </div>
          </div>
        </div>
      </section> */}
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="/home.jpeg"
          alt="Disha Logistics"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/10" />
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-[#155eef]">
            ONE PLATFORM, THREE WORKFLOWS
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            Logistics that works for everyone
          </h2>
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
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 font-extrabold text-[#155eef]">
                0{index + 1}
              </div>

              <h3 className="mt-5 text-xl font-bold">{title}</h3>

              <p className="mt-2 leading-7 text-slate-500">{text}</p>

              <Link
                to="/register"
                className="mt-6 inline-flex items-center gap-1 font-bold text-[#155eef]"
              >
                {cta} <FiArrowRight />
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

      {/* Compliance Section */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-bold tracking-widest text-[#155eef]">
            COMPLIANCE, WITHOUT THE CHAOS
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
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
            Explore the platform <FiArrowRight />
          </Link>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-7">
          <FiShield size={30} className="text-[#155eef]" />

          <h3 className="mt-5 text-xl font-bold">
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

              {/* CTA Buttons */}
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

            {/* Right Contact Details */}
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

              {/* Social Media */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Find us on</p>

                <div className="mt-3 flex gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/dishalogistics?igsh=MXBtenZ1ODZnOGk4ZQ=="
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="rounded-xl border border-white/10 p-3 transition hover:bg-white/10"
                  >
                    <FiInstagram size={20} />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61592903228244&utm_source=chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="rounded-xl border border-white/10 p-3 transition hover:bg-white/10"
                  >
                    <FiFacebook size={20} />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/company/disha-logistics"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="rounded-xl border border-white/10 p-3 transition hover:bg-white/10"
                  >
                    <FiLinkedin size={20} />
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
