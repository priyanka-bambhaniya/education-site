import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

export default function SignUpRedirect({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = new URLSearchParams();

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === "string") {
        params.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      }
    });
  }

  const query = params.toString();
  redirect(`/signup${query ? `?${query}` : ""}`);
}
