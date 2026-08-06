export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <section className="text-center py-20">
                <h1 className="text-5xl font-extrabold text-brand-navy">
                    Move your goods{" "}
                    <span className="text-brand-blue">anywhere in India</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    Smart logistics • Real‑time tracking • Trusted by 500+ businesses
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="/customer/book"
                        className="bg-brand-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-blueHover"
                    >
                        Book Shipment
                    </a>
                    <a
                        href="/track"
                        className="border border-gray-300 px-8 py-3 rounded-full font-semibold hover:border-brand-blue"
                    >
                        Track Shipment
                    </a>
                </div>
            </section>

            <section className="py-16">
                <div className="text-center">
                    <p className="font-semibold text-brand-blue">WHY DISHA LOGISTICS</p>
                    <h2 className="mt-2 text-3xl font-bold text-brand-navy">
                        Logistics made simple
                    </h2>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {[
                        [
                            "Live visibility",
                            "Know where your shipment is at every step with real-time updates.",
                        ],
                        [
                            "Reliable delivery",
                            "A trusted network that moves your goods safely and on schedule.",
                        ],
                        [
                            "Dedicated support",
                            "Get quick help from a logistics team that understands your business.",
                        ],
                    ].map(([title, description]) => (
                        <article
                            key={title}
                            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 font-bold text-brand-blue">
                                ✓
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-brand-navy">
                                {title}
                            </h3>
                            <p className="mt-2 leading-6 text-gray-600">{description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl bg-brand-navy px-6 py-16 text-white md:px-12">
                <div className="max-w-2xl">
                    <p className="font-semibold text-blue-300">OUR SERVICES</p>
                    <h2 className="mt-2 text-3xl font-bold">
                        The right move for every shipment
                    </h2>
                    <p className="mt-4 text-gray-300">
                        Flexible logistics solutions for businesses of every size.
                    </p>
                </div>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Full truckload", "Dedicated vehicles for large consignments."],
                        ["Part truckload", "Cost-effective transport for smaller loads."],
                        [
                            "Express delivery",
                            "Fast, dependable delivery when time matters.",
                        ],
                        ["Warehousing", "Safe storage and smooth dispatch operations."],
                    ].map(([title, description]) => (
                        <article key={title} className="rounded-2xl bg-white/10 p-5">
                            <h3 className="text-lg font-bold">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-300">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="grid gap-8 py-16 text-center sm:grid-cols-2 lg:grid-cols-4">
                {[
                    ["500+", "Businesses served"],
                    ["25,000+", "Shipments delivered"],
                    ["28", "States covered"],
                    ["98%", "On-time delivery"],
                ].map(([value, label]) => (
                    <div key={label}>
                        <p className="text-4xl font-extrabold text-brand-blue">{value}</p>
                        <p className="mt-2 font-medium text-gray-600">{label}</p>
                    </div>
                ))}
            </section>

            <section className="border-t border-gray-100 py-16">
                <div className="text-center">
                    <p className="font-semibold text-brand-blue">CUSTOMER STORIES</p>
                    <h2 className="mt-2 text-3xl font-bold text-brand-navy">
                        Trusted by growing businesses
                    </h2>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {[
                        [
                            "Disha gives us the confidence to promise reliable delivery to our customers. The tracking is clear and the support team is always responsive.",
                            "Priya Sharma",
                            "Operations Manager, Aarya Foods",
                        ],
                        [
                            "We have reduced delivery delays and spend far less time coordinating shipments. It feels like an extension of our own team.",
                            "Rahul Mehta",
                            "Founder, Mehta Traders",
                        ],
                    ].map(([quote, name, role]) => (
                        <figure key={name} className="rounded-2xl bg-gray-50 p-7">
                            <blockquote className="text-lg leading-7 text-gray-700">
                                “{quote}”
                            </blockquote>
                            <figcaption className="mt-5">
                                <p className="font-bold text-brand-navy">{name}</p>
                                <p className="text-sm text-gray-500">{role}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </div>
    );
}
