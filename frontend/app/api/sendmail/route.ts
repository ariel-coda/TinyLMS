// app/api/sendmail/route.ts
import { Resend } from "resend";
import WaitingEmail from "@/emails/waiting-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    const data = await resend.emails.send({
      from: "TinyLMS <onboarding@resend.dev>", // doit correspondre à ton domaine vérifié
      to: email,
      subject: "Merci pour votre enregistrement à tinyLMS 🎉",
      react: WaitingEmail({ name }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Erreur sendmail:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
