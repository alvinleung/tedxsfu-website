import Head from "next/head"
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
      <Head>
        <title>TEDxSFU</title>
        <meta
          name="description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        </Head>
        <div>
        <form
            className="fixed top-0 left-0 right-0 bottom-[25%] flex justify-center items-center text-red-500"
            onSubmit={event => {
            event.preventDefault();
            handleSubmit(fields);
            }}
        >
            <input
            id="EMAIL"
            autoFocus
            type="email"
            value={fields.EMAIL}
            onChange={handleFieldChange}
            />
            <button>submit</button>
        </form>
        {loading && "submitting"}
        {error && message}
        {success && message}
        </div>
    </>
  );
}
