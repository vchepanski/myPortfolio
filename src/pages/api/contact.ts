import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const redirect = (sent: '1' | '0') =>
  new Response(null, {
    status: 302,
    headers: {
      Location: `/contact?sent=${sent}`,
    },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const SUCCESS_REDIRECT = redirect('1');
const ERROR_REDIRECT = redirect('0');

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL ?? 'portfolio@resend.dev';
  const toEmail = import.meta.env.CONTACT_TO_EMAIL;

  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  }

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL.');
    return ERROR_REDIRECT;
  }

  const contentType = request.headers.get('content-type') ?? '';
  const isMultipart = contentType.includes('multipart/form-data');
  const isFormUrlEncoded = contentType.includes('application/x-www-form-urlencoded');

  if (!isMultipart && !isFormUrlEncoded) {
    console.warn('Requisicao de contato com content-type invalido:', contentType);
    return ERROR_REDIRECT;
  }

  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    console.warn('Contato recebido sem todos os campos obrigatorios.');
    return ERROR_REDIRECT;
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `Nova mensagem do site (${name})`,
      text: [`Nome: ${name}`, `Email: ${email}`, '', message].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111827">
          <h2 style="margin:0 0 12px 0;font-size:18px;">Nova mensagem do portfolio</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return SUCCESS_REDIRECT;
  } catch (error) {
    console.error('Falha ao enviar email via Resend:', error);
    return ERROR_REDIRECT;
  }
};
