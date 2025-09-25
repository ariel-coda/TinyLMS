import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

type WelcomeEmailProps = {
  name: string;
};

export const WaitingEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Bienvenue sur TinyLMS – Votre inscription à la liste d’attente est confirmée !</Preview>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`${baseUrl}/static/logo.png`}
            width="120"
            height="40"
            alt="TinyLMS"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Bonjour {name} 👋,
          </Text>
          <Text style={paragraph}>
            Merci de vous être inscrit(e) à la liste d’attente de <strong>TinyLMS</strong>.
          </Text>
          <Text style={paragraph}>
            Vous faites désormais partie des premiers à découvrir notre solution de gestion pédagogique 
            qui simplifie les inscriptions, centralise vos cours et optimise le suivi des étudiants.
          </Text>
          <Text style={paragraph}>
            Nous vous tiendrons informé(e) du lancement officiel. En attendant, vous pouvez suivre 
            l’évolution du projet et recevoir des nouvelles en temps réel :
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>À très vite,</Text>
          <Text style={paragraph}><strong>L’équipe TinyLMS</strong></Text>
          <Hr style={hr} />
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WaitingEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#1d4ed8", // bleu Tailwind 700
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
