import { Gallery } from "../components/Gallery";
import { StaticProps } from "../types/types";
import { commonGetStaticProps } from "../services/commons";

export async function getStaticProps(args: StaticProps) {
  return commonGetStaticProps(args);
}

export default function Home() {
  return <Gallery />;
}
