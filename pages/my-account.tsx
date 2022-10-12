import { Page } from "../components/Page";
import { commonGetStaticProps } from "../services/commons";
import { StaticProps } from "../types/types";

export async function getStaticProps(args: StaticProps) {
    return commonGetStaticProps(args);
  }
  
export default function MyAccount() {
  return (
    <Page>
        <span>My Account</span>
    </Page>
  );
}
