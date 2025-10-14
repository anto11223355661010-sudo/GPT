import { NextResponse } from 'next/server';
import { z } from 'zod';

const payloadSchema = z.object({}).passthrough();

interface ForwardOptions {
  webhookUrl?: string;
  webhookName: string;
}

export async function forwardToWebhook(request: Request, { webhookUrl, webhookName }: ForwardOptions) {
  if (!webhookUrl) {
    return NextResponse.json(
      { error: `Configuration manquante pour ${webhookName}` },
      { status: 500 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 });
  }

  const parsedPayload = payloadSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return NextResponse.json(
      {
        error: 'Payload invalide',
        details: parsedPayload.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const upstreamResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parsedPayload.data)
    });

    const upstreamBody = await upstreamResponse.text();
    const contentType = upstreamResponse.headers.get('content-type') ?? 'text/plain';

    if (!upstreamBody) {
      return new NextResponse(null, {
        status: upstreamResponse.status,
        headers: {
          'Content-Type': contentType
        }
      });
    }

    if (contentType.includes('application/json')) {
      try {
        const data = JSON.parse(upstreamBody);
        return NextResponse.json(data, { status: upstreamResponse.status });
      } catch (error) {
        // Fallback to plain text response below.
      }
    }

    return new NextResponse(upstreamBody, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': contentType
      }
    });
  } catch (error) {
    console.error('Erreur lors du transfert vers le webhook', error);
    return NextResponse.json(
      { error: `Impossible de contacter ${webhookName}` },
      { status: 502 }
    );
  }
}
