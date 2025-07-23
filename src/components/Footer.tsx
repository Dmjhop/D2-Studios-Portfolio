import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  function convertToRoman(num: number) {
    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  }

  const currentYear = new Date().getFullYear();
  const romanYear = convertToRoman(currentYear);
  //  does this work to change the year?
  return (
    <Bounded as="footer" className="text-slate-400">
      <div className="flex items-center justify-center">
        <p className="-mt-15 -py-5 inline gap-6 space-x-2 pb-8 text-center sm:flex-row">
          Made in{" "}
          <Link
            className="text-slate-100 transition-colors duration-150 hover:text-[#eb475a]"
            href="https://code.visualstudio.com/"
          >
            VS Code
          </Link>{" "}
          using
          <Link
            className="text-slate-100 transition-colors duration-150 hover:text-[#eb475a]"
            href="https://nextjs.org/"
          >
            Next.JS{" "}
          </Link>{" "}
          &
          <Link
            className="text-slate-100 transition-colors duration-150 hover:text-[#eb475a]"
            href="https://code.visualstudio.com/"
          >
            Prismic{" "}
          </Link>
          and some level of 🧠 power
        </p>
      </div>
      <div className="container mx-auto mt-10 flex flex-col items-center justify-between gap-6 pb-8 sm:flex-row">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-[#eb475a]"
          >
            {settings.data.name}
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className="text-sm text-slate-300">
            © {romanYear} {settings.data.name}
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_item.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={clsx(
                      "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-[#eb475a]",
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.github_link) && (
            <PrismicNextLink
              field={settings.data.github_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-[#eb475a]"
              aria-label={settings.data.name + " on GitHub"}
            >
              <FaGithub />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.x_link) && (
            <PrismicNextLink
              field={settings.data.x_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-[#eb475a]"
              aria-label={settings.data.name + " on X"}
            >
              <FaTwitter />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.linkedin_link) && (
            <PrismicNextLink
              field={settings.data.linkedin_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-[#eb475a]"
              aria-label={settings.data.name + " on LinkedIn"}
            >
              <FaLinkedin />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Bounded>
  );
}
