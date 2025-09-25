export async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("/api/waiting-mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, subject, html }),
  });

  return res.json();
}
