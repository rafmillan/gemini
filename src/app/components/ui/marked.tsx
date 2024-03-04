import purify from "dompurify";

export default function Marked(input: string) {
  const rawHTML = input;
  return (
    <div dangerouslySetInnerHTML={{ __html: purify.sanitize(rawHTML)}} />
  );
}