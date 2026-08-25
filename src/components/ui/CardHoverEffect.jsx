import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("flex flex-row overflow-x-auto snap-x snap-mandatory py-10 gap-8 pb-16 hide-scrollbar", className)}>
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className="relative group block p-2 h-full w-[85vw] md:w-[400px] shrink-0 snap-center"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-white/[0.08] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
              <item.icon className="w-8 h-8 text-white/80" />
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.desc}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-[2rem] h-full w-full p-8 overflow-hidden bg-[#0A0A0B] relative z-20 transition-all duration-300 shadow-skeuo-raised group-hover:shadow-skeuo-pressed group-hover:scale-[0.98]",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-extrabold tracking-tight mt-2 text-2xl md:text-3xl", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-6 text-zinc-400 tracking-wide leading-relaxed text-base md:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
};
