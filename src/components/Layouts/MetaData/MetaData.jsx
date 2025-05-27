// components/Layouts/MetaData/MetaData.jsx
"use client";
import Head from "next/head";
import React from "react";

const MetaData = ({ title }) => {
  return (
    <Head>
      <title>{title} | Kriptees</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Add other metadata here as needed */}
    </Head>
  );
};

export default MetaData;
