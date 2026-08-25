import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const result = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error };
  }
}

export function welcomeEmailTemplate(name: string, courseTitle: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Bem-vindo ao Master AI</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; padding: 20px; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px; color: #e2e8f0; }
          .btn { background-color: #6366f1; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px; }
          .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Bem-vindo ao Master AI!</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            <p>Obrigado por se cadastrar! Você agora tem acesso ao curso:</p>
            <h2 style="color: #6366f1;">${courseTitle}</h2>
            <p>Aproveite todo o conteúdo exclusivo sobre as 5 melhores IAs de 2026!</p>
            <a href="${process.env.NEXT_PUBLIC_API_URL}/dashboard" class="btn">Acessar o Curso</a>
            <p style="margin-top: 20px;">Se tiver dúvidas, entre em contato conosco.</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Master AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function paymentConfirmationTemplate(name: string, orderId: string, amount: number) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Pagamento Confirmado</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; padding: 20px; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px; color: #e2e8f0; }
          .order-details { background-color: #0f172a; padding: 15px; border-radius: 4px; margin: 15px 0; }
          .order-details p { margin: 8px 0; }
          .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Pagamento Confirmado!</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            <p>Seu pagamento foi processado com sucesso!</p>
            <div class="order-details">
              <p><strong>ID do Pedido:</strong> ${orderId}</p>
              <p><strong>Valor:</strong> R$ ${amount.toFixed(2)}</p>
              <p><strong>Status:</strong> <span style="color: #10b981;">✓ Pago</span></p>
            </div>
            <p>Você já pode acessar todos os cursos. Bom aprendizado! 🎓</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Master AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function contactFormTemplate(senderName: string, senderEmail: string, message: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Novo Contato - Master AI</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; padding: 20px; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
          .content { padding: 20px; color: #e2e8f0; }
          .message-box { background-color: #0f172a; padding: 15px; border-left: 4px solid #6366f1; border-radius: 4px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Novo Contato Recebido</h1>
          </div>
          <div class="content">
            <p><strong>Nome:</strong> ${senderName}</p>
            <p><strong>Email:</strong> ${senderEmail}</p>
            <p><strong>Mensagem:</strong></p>
            <div class="message-box">
              ${message}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
