import { useRouter } from "next/router";

export default function() {
  const router = useRouter();
  const { user } = router.query;
  return (
    <div>
      <h1>Hello {user}!</h1>
    </div>
  )
}
