import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";
import { Footer } from "@/components/footer";
import { clinic, dentists, SITE_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Política de Privacidade | Clínica Odontológica Barra Bonita",
  description:
    "Entenda como a Clínica Odontológica Barra Bonita trata informações de contato e protege sua privacidade.",
  alternates: {
    canonical: `${SITE_URL}/politica-de-privacidade/`,
  },
  openGraph: {
    title: "Política de Privacidade | Clínica Odontológica Barra Bonita",
    url: `${SITE_URL}/politica-de-privacidade/`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <header className="border-b border-line bg-white">
        <div className="site-container flex min-h-20 items-center justify-between gap-5 py-3">
          <ClinicLogo href="/" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-petroleum transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </Link>
        </div>
      </header>

      <main id="conteudo">
        <section className="bg-hero py-16 sm:py-24">
          <div className="site-container max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-turquoise/25 bg-white/75 px-4 py-2 text-sm font-medium text-petroleum">
              <ShieldCheck className="size-4 text-turquoise-dark" aria-hidden="true" />
              Privacidade e transparência
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-petroleum sm:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite/75">
              Este documento explica, de forma simples, como as informações são
              tratadas quando você usa este site ou escolhe falar com a clínica.
            </p>
            <p className="mt-4 text-sm text-graphite/60">
              Última atualização: julho de 2026.
            </p>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="site-container max-w-4xl">
            <div className="prose-policy">
              <section>
                <h2>1. Quem é responsável por este site</h2>
                <p>
                  O site apresenta a {clinic.legalName}, inscrita no CNPJ{" "}
                  {clinic.cnpj}, localizada em {clinic.street},{" "}
                  {clinic.neighborhood}, {clinic.city} - {clinic.region}.
                </p>
              </section>

              <section>
                <h2>2. Quais dados são coletados</h2>
                <p>
                  Esta versão do site não possui formulário, cadastro, área do
                  paciente ou ferramenta própria de analytics. Portanto, o site
                  não coleta diretamente nome, telefone, CPF, informações clínicas
                  ou outros dados pessoais.
                </p>
                <p>
                  Ao escolher falar pelo WhatsApp, você será direcionado para um
                  serviço externo e poderá compartilhar voluntariamente seu nome,
                  telefone e mensagem. Evite enviar informações clínicas
                  detalhadas, documentos ou dados sensíveis por esse primeiro
                  contato.
                </p>
              </section>

              <section>
                <h2>3. Finalidade do contato</h2>
                <p>
                  As informações enviadas voluntariamente pelo WhatsApp são usadas
                  para responder à solicitação, oferecer orientações administrativas
                  e organizar eventual agendamento. Elas não substituem avaliação,
                  diagnóstico ou orientação presencial de um cirurgião-dentista.
                </p>
              </section>

              <section>
                <h2>4. Serviços externos</h2>
                <p>
                  Os links de WhatsApp e Google Maps seguem as políticas de
                  privacidade das respectivas plataformas. O mapa incorporado só é
                  carregado se você selecionar “Visualizar mapa”. Nenhum cookie de
                  analytics é instalado por este site.
                </p>
              </section>

              <section>
                <h2>5. Retenção e proteção</h2>
                <p>
                  Os dados enviados por canais externos são mantidos somente pelo
                  período necessário para responder ao contato, organizar o
                  atendimento e cumprir obrigações legais ou regulatórias
                  aplicáveis. Quando deixam de ser necessários, devem ser
                  eliminados ou anonimizados de forma segura.
                </p>
              </section>

              <section>
                <h2>6. Seus direitos e solicitação de exclusão</h2>
                <p>
                  Você pode solicitar confirmação, correção ou exclusão das
                  informações enviadas. Entre em contato pelo mesmo WhatsApp
                  utilizado na conversa e informe que sua solicitação é relacionada
                  à privacidade.
                </p>
                <div className="not-prose mt-6 grid gap-3 sm:grid-cols-3">
                  {dentists.map((dentist) => (
                    <a
                      key={dentist.id}
                      href={dentist.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-petroleum transition-colors hover:border-turquoise hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      {dentist.shortName}
                    </a>
                  ))}
                </div>
              </section>

              <section>
                <h2>7. Atualizações desta política</h2>
                <p>
                  Esta política poderá ser atualizada quando novos recursos forem
                  adicionados ao site. A data da versão será sempre indicada no
                  início desta página.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
