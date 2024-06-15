"use client";

import Loader from "./components/Loader";
import { ClientOnly } from "./components";

const Loading = () => {
  return (
    <ClientOnly>
      <Loader />
    </ClientOnly>
  )
}

export default Loading;
