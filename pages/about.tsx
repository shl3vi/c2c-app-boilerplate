import { Page } from "../components/Page";
import { commonGetStaticProps } from "../services/commons";
import { StaticProps } from "../types/types";

export async function getStaticProps(args: StaticProps) {
  return commonGetStaticProps(args);
}

export default function About() {
  return (
    <Page>
      <p>This site will help you find great clothes for great prices!</p>
    </Page>
  );
}
