import { forwardToWebhook } from '@/lib/api/forwardWebhook';

export async function POST(request: Request) {
  return forwardToWebhook(request, {
    webhookUrl: process.env.N8N_WEBHOOK_SUBMIT,
    webhookName: 'N8N_WEBHOOK_SUBMIT'
  });
}
