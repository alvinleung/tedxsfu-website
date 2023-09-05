import Head from "next/head"
import Hamburger from "../component/Nav/Hamburger"
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";

export default function Mailchimp(this: any) {
    const url = "https://tedxsfu.us7.list-manage.com/subscribe/post?u=92f4f790178ff00e2b0e57b7f&amp;id=2f9caf4ffb&amp;f_id=00a9d2e4f0";
    const {
        loading,
        error,
        success,
        message,
        handleSubmit
      } = useMailChimpForm(url);
    const { fields, handleFieldChange } = useFormFields({
    EMAIL: ""
    });

    return (
    <>
      <Hamburger/>
    </>
  );
}
