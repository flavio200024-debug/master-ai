import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail, contactFormTemplate } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, subject, message }: ContactFormData = req.body;

  // Validação
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    // Enviar email para o admin
    const adminResult = await sendEmail({
      to: process.env.SMTP_USER!,
      subject: `[Master AI Contato] ${subject}`,
      html: contactFormTemplate(name, email, message),
    });

    if (!adminResult.success) {
      throw new Error('Erro ao enviar email para admin');
    }

    // Enviar email de confirmação para o usuário
    const userConfirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Mensagem Recebida</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #0f172a; }
            .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; padding: 20px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .content { padding: 20px; color: #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Mensagem Recebida!</h1>
            </div>
            <div class="content">
              <p>Olá ${name},</p>
              <p>Obrigado por entrar em contato com Master AI!</p>
              <p>Recebemos sua mensagem e em breve retornaremos com uma resposta.</p>
              <p style="margin-top: 20px; color: #94a3b8;">Este é um email automático. Não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: email,
      subject: 'Sua mensagem foi recebida - Master AI',
      html: userConfirmationHtml,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso! Retornaremos em breve.' 
    });
  } catch (error) {
    console.error('Erro ao processar formulário de contato:', error);
    return res.status(500).json({ 
      error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' 
    });
  }
}
