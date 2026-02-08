// continue from here (light theme work)
"use client";

import { motion } from "framer-motion";
import { BsChevronDoubleDown } from "react-icons/bs";
import { SERVICES_DATA } from "@/constants/services";
import { cardEntrance, staggerContainer } from "@/lib/animations";
import type { Service } from "@/types/services";

const ServiceCard = ({ service }: { service: Service }) => {
	return (
		<div className="flex w-full flex-col gap-6">
			<div className="text-5xl text-violet-600 dark:text-accent">{service.icon}</div>
			<h3 className="font-heading text-4xl font-bold leading-none text-text-secondary dark:text-white">
				{service.title}
			</h3>
			<p className="text-text-primary dark:text-white/80">{service.description}</p>
		</div>
	);
};

const Services = () => {
	return (
		<section
			className="flex min-h-[80vh] flex-col justify-center bg-gradient-to-b from-sky-50 to-indigo-100 py-16 dark:from-[#232329] dark:to-[#2D2A44] xl:pt-4"
			id="services"
		>
			<div className="container mx-auto">
				<div className="pt-12">
					<div className="mb-8 xl:mb-14">
						<h2 className="h2 mb-5 text-center font-heading text-4xl font-bold leading-none xl:text-[42px]">
							My{" "}
							<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-accent dark:to-cyan-400">
								Services
							</span>{" "}
							{/** text-gradient */}
						</h2>
						<p className="mx-auto max-w-[600px] text-center text-lg text-text-primary dark:text-white/80">
							The essentials
						</p>
					</div>

					<motion.div
						className="services-list grid grid-cols-1 gap-[45px] md:grid-cols-2 lg:grid-cols-3"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{SERVICES_DATA.map((service: Service) => {
							return (
								<motion.article
									key={service.id}
									variants={cardEntrance}
									className={`group flex flex-1 flex-col gap-6 rounded-xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(139,92,246,0.6)] dark:bg-[#232329] dark:hover:shadow-[0_10px_20px_rgba(0,174,255,0.4)]`}
								>
									<ServiceCard service={service} />
								</motion.article>
							);
						})}
					</motion.div>
				</div>
			</div>

			<div className="mt-12 flex w-full justify-center">
				<motion.div
					className="text-3xl text-violet-600 dark:text-accent"
					animate={{ y: [0, 10, 0] }} // Animating Y-axis for bounce
					transition={{
						duration: 1,
						repeat: Infinity,
						repeatType: "loop",
						ease: "easeInOut",
					}}
				>
					<BsChevronDoubleDown />
				</motion.div>
			</div>
		</section>
	);
};

export default Services;

// group: adds styles to the parent element that lead to something that affects the child elements
