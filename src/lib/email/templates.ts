/**
 * Default HTML email templates for Saaj Tradition.
 * Templates support variable substitution using {{variableName}} syntax.
 * 
 * Available variables per template type:
 *   ORDER_CONFIRMATION:      {{customerName}}, {{orderNumber}}, {{orderDate}}, {{orderStatus}}, {{items}}, {{subtotal}}, {{shipping}}, {{discount}}, {{total}}, {{deliveryAddress}}, {{storeUrl}}
 *   ORDER_ADMIN_NOTIFICATION: {{customerName}}, {{customerEmail}}, {{customerPhone}}, {{orderNumber}}, {{orderDate}}, {{items}}, {{subtotal}}, {{shipping}}, {{discount}}, {{total}}, {{deliveryAddress}}, {{adminOrderUrl}}
 *   ORDER_STATUS_UPDATE:     {{customerName}}, {{orderNumber}}, {{orderStatus}}, {{storeUrl}}
 *   NEWSLETTER:              {{subscriberName}}, {{subject}}, {{body}}, {{storeUrl}}
 *   PRODUCT_UPDATE:          {{productName}}, {{productDescription}}, {{productPrice}}, {{productImageUrl}}, {{productUrl}}, {{storeUrl}}
 *   COLLECTION_UPDATE:       {{collectionName}}, {{collectionDescription}}, {{collectionImageUrl}}, {{collectionUrl}}, {{storeUrl}}
 */

const BRAND_GRADIENT = "background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);";
const ACCENT_COLOR = "#e94560";
const GOLD_COLOR = "#c9a84c";

const emailBase = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Saaj Tradition</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Lato', Arial, sans-serif; background: #f5f0eb; color: #2c2c2c; }
    a { color: inherit; }
    img { max-width: 100%; height: auto; display: block; }
    @media (max-width: 600px) {
      .email-wrapper { padding: 0 !important; }
      .email-body { padding: 24px 16px !important; }
      .info-grid { display: block !important; }
      .info-grid td { display: block !important; width: 100% !important; padding-bottom: 16px !important; }
      .item-image { display: none !important; }
    }
  </style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;min-height:100vh;">
  <tr><td align="center" class="email-wrapper" style="padding:32px 16px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
      <!-- HEADER -->
      <tr>
        <td style="${BRAND_GRADIENT} padding:32px 40px; border-radius:16px 16px 0 0; text-align:center;">
          <div style="display:inline-block;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.4);border-radius:4px;padding:4px 16px;margin-bottom:12px;">
            <span style="font-family:'Lato',sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;color:${GOLD_COLOR};text-transform:uppercase;">Saaj Tradition</span>
          </div>
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:1px;line-height:1.2;">
            Elegance in Every Thread
          </div>
          <div style="margin-top:8px;height:2px;background:linear-gradient(90deg,transparent,${GOLD_COLOR},transparent);max-width:200px;margin-left:auto;margin-right:auto;"></div>
        </td>
      </tr>
      <!-- CONTENT -->
      <tr>
        <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);" class="email-body">
          ${content}
        </td>
      </tr>
      <!-- FOOTER -->
      <tr>
        <td style="padding:24px 0; text-align:center;">
          <p style="font-family:'Lato',sans-serif;font-size:11px;color:#999;line-height:1.6;">
            © ${new Date().getFullYear()} Saaj Tradition. Bahawalpur, Pakistan.<br/>
            <a href="{{storeUrl}}" style="color:${ACCENT_COLOR};text-decoration:none;">Visit our store</a>
          </p>
          <div style="margin-top:12px;height:1px;background:linear-gradient(90deg,transparent,#d4c5b5,transparent);"></div>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>
`;

const sectionHeading = (text: string) => `
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:600;color:#1a1a2e;margin-bottom:8px;">${text}</h2>
  <div style="width:48px;height:2px;background:${GOLD_COLOR};margin-bottom:20px;"></div>
`;

// ─── ORDER CONFIRMATION (Customer) ───────────────────────────────────────────
export const ORDER_CONFIRMATION_TEMPLATE = {
  subject: "Order Confirmed — #{{orderNumber}} | Saaj Tradition",
  html: emailBase(`
    ${sectionHeading("Your Order is Confirmed!")}
    <p style="color:#555;line-height:1.7;margin-bottom:20px;">
      Dear <strong style="color:#1a1a2e;">{{customerName}}</strong>,<br/><br/>
      Thank you for shopping with <strong>Saaj Tradition</strong>. We've received your order and it's being processed with care.
    </p>

    <!-- Order Meta -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a2e,#0f3460);border-radius:12px;padding:20px;margin-bottom:28px;">
      <tr>
        <td style="padding:16px;">
          <table width="100%" cellpadding="0" cellspacing="0" class="info-grid">
            <tr>
              <td style="padding:8px 16px;border-right:1px solid rgba(255,255,255,0.1);text-align:center;">
                <p style="font-size:10px;font-weight:700;letter-spacing:2px;color:${GOLD_COLOR};text-transform:uppercase;margin-bottom:6px;">Order Number</p>
                <p style="font-size:20px;font-weight:700;color:#fff;font-family:'Playfair Display',Georgia,serif;">#{{orderNumber}}</p>
              </td>
              <td style="padding:8px 16px;border-right:1px solid rgba(255,255,255,0.1);text-align:center;">
                <p style="font-size:10px;font-weight:700;letter-spacing:2px;color:${GOLD_COLOR};text-transform:uppercase;margin-bottom:6px;">Date</p>
                <p style="font-size:14px;font-weight:500;color:#fff;">{{orderDate}}</p>
              </td>
              <td style="padding:8px 16px;text-align:center;">
                <p style="font-size:10px;font-weight:700;letter-spacing:2px;color:${GOLD_COLOR};text-transform:uppercase;margin-bottom:6px;">Status</p>
                <p>{{orderStatusBadge}}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Order Items -->
    ${sectionHeading("Order Summary")}
    {{items}}

    <!-- Price Breakdown -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-top:2px solid #f0ece8;">
      <tr><td style="padding:8px 0;color:#666;font-size:14px;">Subtotal</td><td align="right" style="padding:8px 0;font-size:14px;color:#1a1a2e;">Rs. {{subtotal}}</td></tr>
      <tr><td style="padding:8px 0;color:#666;font-size:14px;">Shipping</td><td align="right" style="padding:8px 0;font-size:14px;color:#1a1a2e;">{{shipping}}</td></tr>
      {{discountRow}}
      <tr style="border-top:2px solid #1a1a2e;">
        <td style="padding:12px 0;font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:700;color:#1a1a2e;">Total</td>
        <td align="right" style="padding:12px 0;font-size:22px;font-weight:700;color:#1a1a2e;">Rs. {{total}}</td>
      </tr>
    </table>

    <!-- Delivery Address -->
    {{deliverySection}}

    <!-- CTA -->
    <div style="text-align:center;margin-top:32px;">
      <a href="{{trackingUrl}}" style="display:inline-block;background:#c9a84c;color:#1a1a2e;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;margin-bottom:12px;">
        🔍 Track My Order
      </a>
      <br/>
      <a href="{{storeUrl}}" style="display:inline-block;background:linear-gradient(135deg,#1a1a2e,#0f3460);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;">
        Continue Shopping
      </a>
    </div>

    <div style="margin-top:28px;padding:16px;background:#faf8f5;border-left:3px solid ${GOLD_COLOR};border-radius:4px;">
      <p style="font-size:13px;color:#666;line-height:1.6;">
        Questions about your order? Reply to this email or contact us at <a href="mailto:{{storeEmail}}" style="color:${ACCENT_COLOR};">{{storeEmail}}</a>
      </p>
    </div>
  `),
};

// ─── ORDER ADMIN NOTIFICATION ─────────────────────────────────────────────────
export const ORDER_ADMIN_NOTIFICATION_TEMPLATE = {
  subject: "🛍️ New Order #{{orderNumber}} — Rs. {{total}}",
  html: emailBase(`
    ${sectionHeading("New Order Received")}
    <div style="background:#fff8e1;border:1px solid ${GOLD_COLOR};border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="font-size:13px;color:#555;line-height:1.7;">
        A new order has been placed on <strong>Saaj Tradition</strong>. Review the details below.
      </p>
    </div>

    <!-- Order Meta -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a2e,#0f3460);border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:20px;">
        <table width="100%" cellpadding="0" cellspacing="0" class="info-grid">
          <tr>
            <td style="padding:8px 16px;border-right:1px solid rgba(255,255,255,0.1);text-align:center;">
              <p style="font-size:10px;font-weight:700;letter-spacing:2px;color:${GOLD_COLOR};text-transform:uppercase;margin-bottom:6px;">Order #</p>
              <p style="font-size:22px;font-weight:700;color:#fff;font-family:'Playfair Display',Georgia,serif;">#{{orderNumber}}</p>
            </td>
            <td style="padding:8px 16px;border-right:1px solid rgba(255,255,255,0.1);text-align:center;">
              <p style="font-size:10px;font-weight:700;letter-spacing:2px;color:${GOLD_COLOR};text-transform:uppercase;margin-bottom:6px;">Total</p>
              <p style="font-size:20px;font-weight:700;color:#fff;">Rs. {{total}}</p>
            </td>
            <td style="padding:8px 16px;text-align:center;">
              <p style="font-size:10px;font-weight:700;letter-spacing:2px;color:${GOLD_COLOR};text-transform:uppercase;margin-bottom:6px;">Date</p>
              <p style="font-size:14px;font-weight:500;color:#fff;">{{orderDate}}</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Customer Info -->
    ${sectionHeading("Customer Details")}
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border-radius:8px;margin-bottom:24px;">
      <tr><td style="padding:16px;">
        <p style="margin-bottom:6px;font-size:14px;color:#555;"><strong style="color:#1a1a2e;">Name:</strong> {{customerName}}</p>
        <p style="margin-bottom:6px;font-size:14px;color:#555;"><strong style="color:#1a1a2e;">Email:</strong> {{customerEmail}}</p>
        <p style="font-size:14px;color:#555;"><strong style="color:#1a1a2e;">Phone:</strong> {{customerPhone}}</p>
      </td></tr>
    </table>

    <!-- Items -->
    ${sectionHeading("Order Items")}
    {{items}}

    <!-- Totals -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-top:2px solid #f0ece8;">
      <tr><td style="padding:8px 0;color:#666;font-size:14px;">Subtotal</td><td align="right" style="padding:8px 0;font-size:14px;">Rs. {{subtotal}}</td></tr>
      <tr><td style="padding:8px 0;color:#666;font-size:14px;">Shipping</td><td align="right" style="padding:8px 0;font-size:14px;">{{shipping}}</td></tr>
      {{discountRow}}
      <tr style="border-top:2px solid #1a1a2e;">
        <td style="padding:12px 0;font-size:18px;font-weight:700;color:#1a1a2e;font-family:'Playfair Display',Georgia,serif;">Total</td>
        <td align="right" style="padding:12px 0;font-size:22px;font-weight:700;color:#1a1a2e;">Rs. {{total}}</td>
      </tr>
    </table>

    <!-- Delivery -->
    {{deliverySection}}

    <!-- CTA -->
    <div style="text-align:center;margin-top:32px;">
      <a href="{{adminOrderUrl}}" style="display:inline-block;background:linear-gradient(135deg,#1a1a2e,#0f3460);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;">
        View Order in Admin
      </a>
    </div>
  `),
};

// ─── ORDER STATUS UPDATE ──────────────────────────────────────────────────────
export const ORDER_STATUS_UPDATE_TEMPLATE = {
  subject: "Order #{{orderNumber}} Update — {{orderStatus}} | Saaj Tradition",
  html: emailBase(`
    ${sectionHeading("Order Status Update")}
    <p style="color:#555;line-height:1.7;margin-bottom:24px;">
      Dear <strong style="color:#1a1a2e;">{{customerName}}</strong>,<br/><br/>
      We have an update for your order. Please find the latest status below.
    </p>

    <!-- Status Card -->
    <div style="background:linear-gradient(135deg,#1a1a2e,#0f3460);border-radius:12px;padding:28px;text-align:center;margin-bottom:28px;">
      <p style="font-size:10px;font-weight:700;letter-spacing:3px;color:${GOLD_COLOR};text-transform:uppercase;margin-bottom:8px;">Order #{{orderNumber}}</p>
      <p style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:12px;">Current Status</p>
      <div>{{orderStatusBadge}}</div>
      <p style="margin-top:16px;font-size:13px;color:rgba(255,255,255,0.7);">{{statusMessage}}</p>
    </div>

    {{customMessage}}

    <div style="text-align:center;margin-top:28px;">
      <a href="{{trackingUrl}}" style="display:inline-block;background:#c9a84c;color:#1a1a2e;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;margin-bottom:12px;">
        🔍 Track My Order
      </a>
      <br/>
      <a href="{{storeUrl}}" style="display:inline-block;background:linear-gradient(135deg,#1a1a2e,#0f3460);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;">
        Visit Store
      </a>
    </div>
  `),
};

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
export const NEWSLETTER_TEMPLATE = {
  subject: "{{subject}} | Saaj Tradition",
  html: emailBase(`
    ${sectionHeading("{{emailHeading}}")}
    <p style="color:#555;line-height:1.7;margin-bottom:20px;">
      Dear <strong style="color:#1a1a2e;">{{subscriberName}}</strong>,
    </p>

    <div style="color:#444;line-height:1.8;font-size:15px;">
      {{body}}
    </div>

    {{imageSection}}

    <div style="text-align:center;margin-top:32px;">
      <a href="{{ctaUrl}}" style="display:inline-block;background:linear-gradient(135deg,#1a1a2e,#0f3460);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;">
        {{ctaText}}
      </a>
    </div>

    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0ece8;text-align:center;">
      <p style="font-size:11px;color:#aaa;">
        You're receiving this because you subscribed to Saaj Tradition updates.<br/>
        <a href="{{unsubscribeUrl}}" style="color:#999;text-decoration:underline;">Unsubscribe</a>
      </p>
    </div>
  `),
};

// ─── PRODUCT UPDATE ───────────────────────────────────────────────────────────
export const PRODUCT_UPDATE_TEMPLATE = {
  subject: "✨ New Arrival: {{productName}} | Saaj Tradition",
  html: emailBase(`
    ${sectionHeading("New Arrival")}
    <p style="color:#555;line-height:1.7;margin-bottom:24px;">
      We're thrilled to introduce our latest addition to the Saaj Tradition collection.
    </p>

    <!-- Product Card -->
    <div style="border:1px solid #f0ece8;border-radius:12px;overflow:hidden;margin-bottom:28px;">
      {{productImageSection}}
      <div style="padding:24px;">
        <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:600;color:#1a1a2e;margin-bottom:8px;">{{productName}}</h3>
        <p style="font-size:14px;color:#666;line-height:1.7;margin-bottom:16px;">{{productDescription}}</p>
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:22px;font-weight:700;color:#1a1a2e;font-family:'Playfair Display',Georgia,serif;">Rs. {{productPrice}}</span>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:8px;">
      <a href="{{productUrl}}" style="display:inline-block;background:linear-gradient(135deg,#1a1a2e,#0f3460);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;">
        Shop Now
      </a>
    </div>

    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0ece8;text-align:center;">
      <p style="font-size:11px;color:#aaa;">
        You're receiving this because you subscribed to Saaj Tradition updates.<br/>
        <a href="{{unsubscribeUrl}}" style="color:#999;text-decoration:underline;">Unsubscribe</a>
      </p>
    </div>
  `),
};

// ─── COLLECTION UPDATE ────────────────────────────────────────────────────────
export const COLLECTION_UPDATE_TEMPLATE = {
  subject: "✨ New Collection: {{collectionName}} | Saaj Tradition",
  html: emailBase(`
    ${sectionHeading("New Collection")}
    <p style="color:#555;line-height:1.7;margin-bottom:24px;">
      We're excited to present our newest collection — crafted with tradition and passion.
    </p>

    <!-- Collection Card -->
    <div style="border-radius:12px;overflow:hidden;margin-bottom:28px;background:linear-gradient(135deg,#1a1a2e,#0f3460);">
      {{collectionImageSection}}
      <div style="padding:24px;">
        <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:600;color:#fff;margin-bottom:8px;">{{collectionName}}</h3>
        <p style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.7;">{{collectionDescription}}</p>
      </div>
    </div>

    <div style="text-align:center;margin-top:8px;">
      <a href="{{collectionUrl}}" style="display:inline-block;background:${GOLD_COLOR};color:#1a1a2e;text-decoration:none;padding:14px 36px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;">
        Explore Collection
      </a>
    </div>

    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0ece8;text-align:center;">
      <p style="font-size:11px;color:#aaa;">
        You're receiving this because you subscribed to Saaj Tradition updates.<br/>
        <a href="{{unsubscribeUrl}}" style="color:#999;text-decoration:underline;">Unsubscribe</a>
      </p>
    </div>
  `),
};
