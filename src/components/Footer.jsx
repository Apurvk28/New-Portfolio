import React from "react"
import StringTieFooter from "./ui/string-tie-footer"

export default function Footer({ onOpenContact }) {
  return (
    <StringTieFooter
      id="contact"
      meta={[]}
      title="Thank"
      titleAccent="You"
      tapes={["Looking Forward to", "Connect with You!"]}
      email="khairnarapurv@gmail.com"
      links={[
        { label: "linkedin.com/in/apurvk28", href: "https://www.linkedin.com/in/apurvk28" },
        { label: "github.com/Apurvk28", href: "https://github.com/Apurvk28" },
        { label: "x.com/KhairnarApurv", href: "https://x.com/KhairnarApurv" },
        { label: "instagram.com/apurvk28", href: "https://www.instagram.com/apurvk28" },
      ]}
      regards="Warm Regards,"
      signatureText="Apurv Khairnar"
      signatureLabel="Signed, Apurv Khairnar"
      note={{
        kicker: "A note, tucked inside",
        text: "Got a project, a full-time role, or just want to connect? My inbox is always open — let's build something exceptional together.",
        cta: "Contact me",
      }}
      onOpenContact={onOpenContact}
      height="100svh"
      paper="#ffffff"
      ink="#0d1115"
      bodyInk="#eef0f3"
      accent="#1f78d1"
      cord="#2c55d6"
    />
  )
}
