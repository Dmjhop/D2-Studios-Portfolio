import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const resolvedParams = await searchParams;
  const slices = getSlices(resolvedParams?.state);

  return (
    <SliceSimulator background="#0f1729">
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
