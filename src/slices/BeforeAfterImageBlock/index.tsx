"use client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

/**
 * Props for `BeforeAfterImageBlock`.
 */
export type BeforeAfterImageBlockProps =
  SliceComponentProps<Content.BeforeAfterImageBlockSlice>;

/**
 * Component for "BeforeAfterImageBlock" Slices.
 */
const BeforeAfterImageBlock = ({
  slice,
}: BeforeAfterImageBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ReactCompareSlider
        itemOne={
          <PrismicNextImage
            field={slice.primary.before_image}
            imgixParams={{ w: 600 }}
          />
        }
        itemTwo={
          <PrismicNextImage
            field={slice.primary.after_image}
            imgixParams={{ w: 600 }}
          />
        }
      />
    </section>
  );
};

export default BeforeAfterImageBlock;
