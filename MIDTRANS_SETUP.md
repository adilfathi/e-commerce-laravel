# Midtrans Integration Setup

## Configuration

Add these environment variables to your `.env` file:

```env
MIDTRANS_SERVER_KEY=your-server-key-here
MIDTRANS_CLIENT_KEY=your-client-key-here
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS_3DS=true
```

## Getting Your Keys

1. **Sandbox/Development:**
   - Server Key: `SB-Mid-server-xxxxx`
   - Client Key: `SB-Mid-client-xxxxx`
   - Get them from: https://dashboard.sandbox.midtrans.com/settings/config_info

2. **Production:**
   - Server Key: `Mid-server-xxxxx`
   - Client Key: `Mid-client-xxxxx`
   - Get them from: https://dashboard.midtrans.com/settings/config_info

## Database Migration

Run the migration to add transaction_id to orders table:

```bash
php artisan migrate
```

## Routes

The following routes are available:

- `POST /midtrans/snap-token/{orderId}` - Create Snap token for payment
- `POST /midtrans/notification` - Handle Midtrans webhook/notification (no CSRF protection needed)
- `GET /midtrans/success` - Payment success redirect
- `GET /midtrans/failure` - Payment failure redirect

## Webhook Configuration

In your Midtrans dashboard, set the notification URL to:
```
https://yourdomain.com/midtrans/notification
```

## Usage in Frontend

To integrate Midtrans Snap in your payment view:

```javascript
// Get snap token from your backend
fetch('/midtrans/snap-token/{{ $order->id }}', {
    method: 'POST',
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    // Load Midtrans Snap.js
    window.snap.pay(data.snap_token, {
        onSuccess: function(result) {
            window.location.href = '/midtrans/success';
        },
        onPending: function(result) {
            // Handle pending payment
        },
        onError: function(result) {
            window.location.href = '/midtrans/failure';
        }
    });
});
```

Don't forget to include Midtrans Snap.js in your payment view:

```html
<script src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key="{{ config('midtrans.client_key') }}"></script>
```

For production, use:
```html
<script src="https://app.midtrans.com/snap/snap.js" 
        data-client-key="{{ config('midtrans.client_key') }}"></script>
```

