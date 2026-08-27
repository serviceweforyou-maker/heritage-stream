const express = require('express');
const fs = require('fs');
const path = require('path');

// Load environment variables manually from .env if present
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envData = fs.readFileSync(envPath, 'utf8');
    envData.split(/\r?\n/).forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        if (key && value) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (err) {
  console.warn("Failed loading environment variables from .env:", err);
}

const app = express();
const PORT = 8080;

app.use(express.json({ limit: '10mb' })); // support large base64 image payloads

// Enable CORS for cross-origin hosting (e.g. Hostinger frontend to Render backend)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Visitor Tracking Middleware
app.use((req, res, next) => {
  const pathName = req.path.toLowerCase();
  const isPage = req.method === 'GET' && (pathName === '/' || pathName === '/index.html' || pathName === '/login.html' || pathName === '/admin.html');
  if (isPage) {
    try {
      const db = readDB();
      if (!db.stats) db.stats = { totalRevenue: 0, totalSubscribers: 0 };
      
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      db.stats.totalVisits = (db.stats.totalVisits || 0) + 1;
      
      if (!db.stats.uniqueVisitors) db.stats.uniqueVisitors = [];
      if (!db.stats.uniqueVisitors.includes(ip)) {
        db.stats.uniqueVisitors.push(ip);
        if (db.stats.uniqueVisitors.length > 1000) {
          db.stats.uniqueVisitors.shift(); // Cap IP history array size to avoid bloat
        }
        db.stats.uniqueVisitorsCount = (db.stats.uniqueVisitorsCount || 0) + 1;
      }
      writeDB(db);
    } catch (err) {
      console.error("Visitor tracking log failed:", err.message);
    }
  }
  next();
});

// Intercept requests for admin page to enforce login redirect
app.get('/admin.html', (req, res) => {
  const cookies = req.headers.cookie || '';
  if (cookies.includes('hs_admin_session=authenticated')) {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
  } else {
    res.redirect('/login.html');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

// Dynamic XML Sitemap Generator for Search Engines & AI Models
app.get('/sitemap.xml', (req, res) => {
  try {
    const db = readDB();
    const origin = `${req.protocol}://${req.get('host')}`;
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Add static main pages
    xml += `  <url>\n    <loc>${origin}/index.html</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    xml += `  <url>\n    <loc>${origin}/login.html</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.3</priority>\n  </url>\n`;
    
    // Add dynamically generated content URLs
    db.content.forEach(item => {
      xml += `  <url>\n    <loc>${origin}/index.html?play=${item.id}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    
    xml += `</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send("Error generating sitemap");
  }
});

// Robots.txt configuration allowing Google & AI indexing
app.get('/robots.txt', (req, res) => {
  const origin = `${req.protocol}://${req.get('host')}`;
  let text = `User-agent: *\n`;
  text += `Allow: /\n`;
  text += `Disallow: /admin.html\n`;
  text += `Disallow: /config.json\n`;
  text += `Disallow: /api/\n`;
  text += `\n`;
  text += `Sitemap: ${origin}/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(text);
});

// ==========================================
// EMAIL NOTIFICATION SYSTEM (SMTP GMAIL)
// ==========================================
const nodemailer = require('nodemailer');

// Helper to get Gmail credentials from environment or config.json
function getGmailCredentials() {
  let user = process.env.GMAIL_USER;
  let pass = process.env.GMAIL_PASS;
  if (!user || !pass) {
    try {
      const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
      user = user || config.GMAIL_USER;
      pass = pass || config.GMAIL_PASS;
    } catch (err) {
      // Config not found or invalid
    }
  }
  return { user, pass };
}

function sendEmail(to, subject, html) {
  const { user, pass } = getGmailCredentials();
  if (!user || !pass) {
    console.error("❌ Gmail credentials are not configured. Cannot send email.");
    return Promise.reject(new Error("Email credentials missing"));
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const mailOptions = {
    from: `"MANJUNATH ENTERPRISE" <${user}>`,
    to: to,
    subject: subject,
    html: html
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log(`✅ Email sent to ${to}: ${subject} (${info.messageId})`);
      return info;
    })
    .catch(err => {
      console.error(`❌ Failed to send email to ${to}:`, err.message);
      throw err;
    });
}

function sendWelcomeEmail(email, name) {
  const html = `
    <div style="background-color: #0c0d12; color: #ffffff; font-family: 'Georgia', serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; border-radius: 16px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 20px;">
        <h2 style="color: #d4af37; font-size: 24px; margin: 0;">⚜️ HERITAGE STREAM</h2>
        <p style="color: rgba(255,255,255,0.6); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Preserving Culture, Inspiring Minds</p>
      </div>
      
      <h3 style="font-size: 20px; font-weight: bold; margin-top: 30px; color: #ffffff;">Welcome to the Premium Circle!</h3>
      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">Dear <strong>${name}</strong>,</p>
      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">Your subscription has been successfully activated. Thank you for supporting the preservation and education of our cultural history through <strong>MANJUNATH ENTERPRISE</strong>.</p>
      
      <div style="background-color: rgba(212, 175, 55, 0.05); border: 1px dashed rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
        <p style="color: #d4af37; font-size: 12px; text-transform: uppercase; font-weight: bold; margin: 0 0 10px 0;">Premium Pass Details</p>
        <span style="font-size: 22px; font-weight: 900; color: #ffffff;">₹399 / Year</span>
        <p style="font-size: 11px; color: rgba(255,255,255,0.5); margin: 5px 0 0 0;">Valid for 365 Days • Unrestricted Access</p>
      </div>

      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">You now have full access to:
        <ul style="padding-left: 20px; color: rgba(255,255,255,0.8); font-size: 13px; line-height: 1.8;">
          <li>🎬 100+ high-fidelity Indian heritage docu-series</li>
          <li>📚 Immersive audiobooks and historical chronicles</li>
          <li>🎙️ Native Kannada narration and speed cadences</li>
          <li>🧩 Interactive history games (Trivia, Chronology, Memory Match)</li>
          <li>🌿 Divya Darshana widgets (Panchang, Ayurveda remedies, breathing coach)</li>
        </ul>
      </p>
      
      <div style="text-align: center; margin-top: 35px; margin-bottom: 20px;">
        <a href="https://heritage-stream.onrender.com" style="background: linear-gradient(to right, #d4af37, #f39c12); color: #000000; text-decoration: none; padding: 14px 30px; font-weight: bold; border-radius: 8px; font-size: 14px; text-transform: uppercase; display: inline-block;">Start Exploring Now</a>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; margin-top: 40px; font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; line-height: 1.5;">
        This email was sent by MANJUNATH ENTERPRISE.<br>
        Proprietor: MANJUNATHA PRASANNA | Contact: service.weforyou@gmail.com<br>
        Address: Bangalore, Karnataka, India
      </div>
    </div>
  `;
  return sendEmail(email, "✨ Welcome to HeritageStream Premium Pass!", html);
}

function sendRenewalReminderEmail(email, name, expiryDate) {
  const formattedDate = new Date(expiryDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const html = `
    <div style="background-color: #0c0d12; color: #ffffff; font-family: 'Georgia', serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; border-radius: 16px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 20px;">
        <h2 style="color: #d4af37; font-size: 24px; margin: 0;">⚜️ HERITAGE STREAM</h2>
        <p style="color: rgba(255,255,255,0.6); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Keep Your Access Active</p>
      </div>
      
      <h3 style="font-size: 20px; font-weight: bold; margin-top: 30px; color: #ffffff;">Your Premium Pass Expires Soon!</h3>
      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">Dear <strong>${name}</strong>,</p>
      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">Your annual HeritageStream Premium Pass is scheduled to expire on <strong>${formattedDate}</strong>. To ensure you do not lose access to your watch history, watchlist, saved game scores, and premium features, please renew your subscription today.</p>
      
      <div style="background-color: rgba(212, 175, 55, 0.05); border: 1px dashed rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
        <p style="color: #d4af37; font-size: 11px; text-transform: uppercase; font-weight: bold; margin: 0 0 5px 0;">Annual Renewal Amount</p>
        <span style="font-size: 26px; font-weight: 900; color: #ffffff;">₹399 / Year</span>
      </div>
      
      <div style="text-align: center; margin-top: 35px; margin-bottom: 20px;">
        <a href="https://heritage-stream.onrender.com" style="background: linear-gradient(to right, #d4af37, #f39c12); color: #000000; text-decoration: none; padding: 14px 30px; font-weight: bold; border-radius: 8px; font-size: 14px; text-transform: uppercase; display: inline-block;">Renew My Pass Now</a>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; margin-top: 40px; font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; line-height: 1.5;">
        This email was sent by MANJUNATH ENTERPRISE.<br>
        Proprietor: MANJUNATHA PRASANNA | Contact: service.weforyou@gmail.com
      </div>
    </div>
  `;
  return sendEmail(email, "⏳ Action Required: Your HeritageStream Premium Pass Expires Soon!", html);
}

function sendAbandonedCheckoutReminderEmail(email, name) {
  const html = `
    <div style="background-color: #0c0d12; color: #ffffff; font-family: 'Georgia', serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #d4af37; border-radius: 16px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 20px;">
        <h2 style="color: #d4af37; font-size: 24px; margin: 0;">⚜️ HERITAGE STREAM</h2>
        <p style="color: rgba(255,255,255,0.6); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Complete Your Setup</p>
      </div>
      
      <h3 style="font-size: 20px; font-weight: bold; margin-top: 30px; color: #ffffff;">Did you get disconnected?</h3>
      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">Dear <strong>${name}</strong>,</p>
      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">We noticed you started setting up your HeritageStream Premium Pass but didn't complete the secure checkout. Don't worry—your cart has been saved.</p>
      <p style="line-height: 1.6; color: rgba(255,255,255,0.85); font-size: 14px;">For just <strong>₹399/year</strong>, you'll unlock immediate access to our entire premium history library, Sanskrit scriptures, interactive games, and box-breathing coaching.</p>
      
      <div style="text-align: center; margin-top: 35px; margin-bottom: 20px;">
        <a href="https://heritage-stream.onrender.com" style="background: linear-gradient(to right, #d4af37, #f39c12); color: #000000; text-decoration: none; padding: 14px 30px; font-weight: bold; border-radius: 8px; font-size: 14px; text-transform: uppercase; display: inline-block;">Complete Checkout Securely</a>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; margin-top: 40px; font-size: 10px; color: rgba(255,255,255,0.4); text-align: center; line-height: 1.5;">
        This email was sent by MANJUNATH ENTERPRISE.<br>
        Proprietor: MANJUNATHA PRASANNA | Contact: service.weforyou@gmail.com
      </div>
    </div>
  `;
  return sendEmail(email, "👀 Did you forget something? Complete your HeritageStream Pass!", html);
}

// Background Email Schedulers
function startEmailSchedulers() {
  console.log("📬 Email notification schedulers initialized.");

  // 1. Abandoned Checkout Scanner: Run every 10 minutes
  setInterval(async () => {
    try {
      const db = readDB();
      const now = Date.now();
      let changed = false;

      db.orders.forEach(order => {
        // If order was created more than 15 minutes ago, but less than 24 hours ago, and is still in ACTIVE (unpaid) status
        if (order.status === "ACTIVE" && (now - order.timestamp) > 15 * 60 * 1000 && (now - order.timestamp) < 24 * 60 * 60 * 1000) {
          order.status = "REMINDED"; // Mark reminded so we don't send multiple emails
          changed = true;
          
          if (order.email) {
            console.log(`✉️ Sending abandoned checkout reminder to ${order.name} (${order.email})...`);
            sendAbandonedCheckoutReminderEmail(order.email, order.name).catch(() => {});
          }
        }
      });

      if (changed) {
        writeDB(db);
      }
    } catch (err) {
      console.error("Error in abandoned checkout scheduler:", err.message);
    }
  }, 10 * 60 * 1000); // 10 minutes

  // 2. Subscription Expiry Scanner: Run once every 24 hours
  setInterval(async () => {
    try {
      const db = readDB();
      const now = Date.now();
      let changed = false;

      db.subscribers.forEach(sub => {
        const subDate = new Date(sub.timestamp).getTime();
        const expiryDate = subDate + 365 * 24 * 60 * 60 * 1000; // 1 year
        const timeLeft = expiryDate - now;

        // If subscription expires in 7 days (between 6 and 7 days left) and reminder not sent yet
        if (timeLeft > 0 && timeLeft <= 7 * 24 * 60 * 60 * 1000 && timeLeft > 6 * 24 * 60 * 60 * 1000 && !sub.renewReminderSent) {
          sub.renewReminderSent = true;
          changed = true;

          if (sub.email) {
            console.log(`✉️ Sending renewal reminder to ${sub.name} (${sub.email}) expiring on ${new Date(expiryDate).toLocaleDateString()}...`);
            sendRenewalReminderEmail(sub.email, sub.name, expiryDate).catch(() => {});
          }
        }
      });

      if (changed) {
        writeDB(db);
      }
    } catch (err) {
      console.error("Error in subscription expiry scheduler:", err.message);
    }
  }, 24 * 60 * 60 * 1000); // 24 hours
}

const DB_PATH = path.join(__dirname, 'db.json');

// Helper to read database
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const parsed = JSON.parse(data);
    if (!parsed.orders) parsed.orders = [];
    return parsed;
  } catch (err) {
    console.error("Error reading db.json, returning empty structure", err);
    return { categories: [], content: [], subscribers: [], orders: [], stats: { totalRevenue: 0, totalSubscribers: 0 } };
  }
}

// Helper to write database
function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Error writing db.json", err);
    return false;
  }
}

// Middleware to verify admin authentication cookie
function verifyAdminSession(req, res, next) {
  const cookies = req.headers.cookie || '';
  if (cookies.includes('hs_admin_session=authenticated')) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access. Please log in as admin." });
  }
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 0. Log Client-Side Errors
app.post('/api/log-error', (req, res) => {
  console.log("\x1b[31m[CLIENT-SIDE EXCEPTION]\x1b[0m", req.body.error);
  res.sendStatus(200);
});

// 1. Get Live Catalogue Content
app.get('/api/content', (req, res) => {
  const db = readDB();
  
  // Format content to split into docuSeries and audioStories for client backwards-compatibility
  const docuSeries = db.content.filter(item => !item.audioUrl);
  const audioStories = db.content.filter(item => item.audioUrl);
  
  res.json({
    docuSeries,
    audioStories,
    categories: db.categories
  });
});

// 2. Add New Content (Admin)
app.post('/api/content', verifyAdminSession, (req, res) => {
  const db = readDB();
  const { title, tagline, description, duration, rating, year, isPremium, isGodSeries, category, mediaUrl, isAudio, imageBase64 } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: "Title and Category are required." });
  }

  // Handle Base64 Image Upload
  let finalImageUrl = "images/default.jpg";
  if (imageBase64 && imageBase64.includes(';base64,')) {
    try {
      const parts = imageBase64.split(';base64,');
      const mimeType = parts[0].split(':')[1];
      const ext = mimeType.split('/')[1] || 'jpg';
      const base64Data = parts[1];
      const buffer = Buffer.from(base64Data, 'base64');
      
      const fileName = `cover_${Date.now()}.${ext}`;
      const relativePath = path.join('images', fileName);
      const absolutePath = path.join(__dirname, 'public', relativePath);
      
      // Ensure images folder exists
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, buffer);
      
      finalImageUrl = relativePath.replace(/\\/g, '/'); // ensure forward slashes
    } catch (err) {
      console.error("Failed saving uploaded image file", err);
      return res.status(500).json({ error: "Failed to save the image thumbnail." });
    }
  }

  // Create Item structure
  const newItem = {
    id: `item_${Date.now()}`,
    title,
    description,
    category,
    isPremium: isPremium === true,
    isGodSeries: isGodSeries === true,
    imageUrl: finalImageUrl
  };

  if (isAudio) {
    newItem.narrator = tagline || "Voice of Heritage";
    newItem.duration = duration || "10:00";
    newItem.audioUrl = mediaUrl || "https://actions.google.com/sounds/v1/ambient/morning_birds.ogg";
  } else {
    newItem.tagline = tagline || "Divine Legacy";
    newItem.duration = duration || "30 Mins";
    newItem.rating = rating || "9.5 ★";
    newItem.year = year || "2026";
    newItem.videoUrl = mediaUrl || ""; // Embedded YouTube video
    newItem.content = [
      {
        title: "Introduction",
        text: description,
        visual: "🎬"
      }
    ];
  }

  db.content.push(newItem);
  writeDB(db);
  res.json({ success: true, item: newItem });
});

// 3. Add New Category (Admin)
app.post('/api/categories', verifyAdminSession, (req, res) => {
  const db = readDB();
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required." });
  }

  if (db.categories.includes(name)) {
    return res.status(400).json({ error: "Category already exists." });
  }

  db.categories.push(name);
  writeDB(db);
  res.json({ success: true, categories: db.categories });
});

// 4. Log Subscription Purchase
app.post('/api/subscribe', (req, res) => {
  const db = readDB();
  const { name, paymentMethod } = req.body;

  const newSub = {
    id: `sub_${Date.now()}`,
    name: name || "Anonymous Member",
    paymentMethod: paymentMethod || "Mock UPI Gateway",
    amount: 399,
    timestamp: new Date().toISOString()
  };

  db.subscribers.push(newSub);
  db.stats.totalRevenue += 399;
  db.stats.totalSubscribers += 1;

  writeDB(db);
  res.json({ success: true, subId: newSub.id });
});

// Helper to get Cashfree credentials from environment or config.json
function getCashfreeCredentials() {
  let appId = process.env.CASHFREE_APP_ID;
  let secretKey = process.env.CASHFREE_SECRET_KEY;
  if (!appId || !secretKey) {
    try {
      const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
      appId = appId || config.CASHFREE_APP_ID;
      secretKey = secretKey || config.CASHFREE_SECRET_KEY;
    } catch (err) {
      // Config not found or invalid
    }
  }
  return { appId, secretKey };
}

// 4a. Create Live Cashfree Order
app.post('/api/create-cashfree-order', async (req, res) => {
  const { name, email, phone, frontendOrigin } = req.body;
  const orderId = `order_${Date.now()}`;
  
  const { appId: cashfreeAppId, secretKey: cashfreeSecretKey } = getCashfreeCredentials();
  if (!cashfreeAppId || !cashfreeSecretKey) {
    return res.status(500).json({ error: "Cashfree API credentials are not configured on the server." });
  }
  
  // Production URL
  const cashfreeUrl = "https://api.cashfree.com/pg/orders";
  const customerId = `cust_${Date.now()}`;
  
  // Determine backend URL to route response checks back to this server
  const backendHost = `${req.protocol}://${req.get('host')}`;
  const origin = req.headers.origin || backendHost;
  const targetFrontend = frontendOrigin || origin;

  // The return URL points to the backend /api/verify-payment route
  const returnUrl = `${backendHost}/api/verify-payment?order_id=${orderId}&frontend_origin=${encodeURIComponent(targetFrontend)}`;

  // Cashfree Production credentials strictly require HTTPS return URLs
  if (!returnUrl.startsWith('https://')) {
    if (backendHost.includes('localhost')) {
      return res.status(400).json({
        error: "Cashfree Production API requires an HTTPS redirect return URL. Localhost testing is only supported if you tunnel your backend via HTTPS (e.g. ngrok) or switch Cashfree keys to Sandbox mode."
      });
    } else {
      return res.status(400).json({
        error: "Cashfree Production API requires an HTTPS redirect return URL. Please configure HTTPS/SSL on your backend server."
      });
    }
  }

  const payload = {
    order_amount: 399.00,
    order_currency: "INR",
    order_id: orderId,
    customer_details: {
      customer_id: customerId,
      customer_name: name || "Anonymous Explorer",
      customer_email: email || "service.weforyou@gmail.com",
      customer_phone: phone || "9999999999"
    },
    order_meta: {
      return_url: returnUrl
    }
  };

  try {
    const response = await fetch(cashfreeUrl, {
      method: 'POST',
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': cashfreeAppId,
        'x-client-secret': cashfreeSecretKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create order on Cashfree");
    }

    const db = readDB();
    db.orders.push({
      orderId: data.order_id,
      name: name || "Anonymous Explorer",
      email: email || "",
      phone: phone || "",
      timestamp: Date.now(),
      status: "ACTIVE"
    });
    writeDB(db);

    res.json({
      order_id: data.order_id,
      payment_session_id: data.payment_session_id
    });
  } catch (err) {
    console.error("Cashfree Order Creation Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 4b. Verify Cashfree Payment and Activate Subscription
app.get('/api/verify-payment', async (req, res) => {
  const { order_id, frontend_origin } = req.query;
  if (!order_id) {
    return res.redirect('/index.html?payment=failed&reason=no_order_id');
  }

  const targetFrontend = frontend_origin || `${req.protocol}://${req.get('host')}`;

  const { appId: cashfreeAppId, secretKey: cashfreeSecretKey } = getCashfreeCredentials();
  if (!cashfreeAppId || !cashfreeSecretKey) {
    return res.redirect(`${targetFrontend}/index.html?payment=failed&reason=credentials_not_configured`);
  }
  
  const cashfreeUrl = `https://api.cashfree.com/pg/orders/${order_id}`;

  try {
    const response = await fetch(cashfreeUrl, {
      method: 'GET',
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': cashfreeAppId,
        'x-client-secret': cashfreeSecretKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to verify order details");
    }

    if (data.order_status === "PAID") {
      const db = readDB();
      const customer = data.customer_details || {};
      
      // Update order status in db.orders tracker
      const loggedOrder = db.orders.find(o => o.orderId === order_id);
      if (loggedOrder) {
        loggedOrder.status = "PAID";
      }

      // Check if order already processed in db to avoid duplicate credits
      const alreadySubscribed = db.subscribers.some(sub => sub.orderId === order_id);
      
      if (!alreadySubscribed) {
        const newSub = {
          id: `sub_${Date.now()}`,
          name: customer.customer_name || "Premium Member",
          email: customer.customer_email || "",
          phone: customer.customer_phone || "",
          orderId: order_id,
          paymentMethod: "Cashfree Live PG",
          amount: 399,
          timestamp: new Date().toISOString()
        };

        db.subscribers.push(newSub);
        db.stats.totalRevenue += 399;
        db.stats.totalSubscribers += 1;
        writeDB(db);

        // Send welcome email asynchronously to avoid blocking the redirect
        if (newSub.email) {
          console.log(`✉️ Sending welcome email to ${newSub.name} (${newSub.email})...`);
          sendWelcomeEmail(newSub.email, newSub.name).catch(() => {});
        }
      } else {
        writeDB(db);
      }

      // Redirect back to frontend domain with success query param
      res.redirect(`${targetFrontend}/index.html?payment=success&order_id=${order_id}`);
    } else {
      res.redirect(`${targetFrontend}/index.html?payment=failed&order_id=${order_id}&status=${data.order_status}`);
    }
  } catch (err) {
    console.error("Cashfree Order Verification Error:", err.message);
    res.redirect(`${targetFrontend}/index.html?payment=failed&order_id=${order_id}&error=${encodeURIComponent(err.message)}`);
  }
});

// 5. Delete Content (Admin)
app.delete('/api/content/:id', verifyAdminSession, (req, res) => {
  const db = readDB();
  const itemId = req.params.id;

  const initialCount = db.content.length;
  db.content = db.content.filter(item => item.id !== itemId);

  if (db.content.length === initialCount) {
    return res.status(404).json({ error: "Item not found." });
  }

  writeDB(db);
  res.json({ success: true });
});

// 6. Get Admin Portal Stats
app.get('/api/admin/stats', verifyAdminSession, (req, res) => {
  const db = readDB();
  
  res.json({
    totalSubscribers: db.stats.totalSubscribers || db.subscribers.length,
    totalRevenue: db.stats.totalRevenue || (db.subscribers.length * 399),
    totalContent: db.content.length,
    totalVisits: db.stats.totalVisits || 0,
    uniqueVisitorsCount: db.stats.uniqueVisitorsCount || 0,
    recentSubscribers: db.subscribers.slice(-5).reverse(), // get last 5 in reverse order
    contentList: db.content.map(c => ({ id: c.id, title: c.title, category: c.category, isPremium: c.isPremium, type: c.audioUrl ? 'Audio' : 'Video' }))
  });
});

// ==========================================
// AUTONOMOUS AI GENERATION ENGINE
// ==========================================

const AIEngine = {
  topics: [
    {
      id: "lepakshi",
      title: "Lepakshi: The Mystery of the Hanging Pillar",
      tagline: "The Floating Stone of Andhra Pradesh",
      description: "Explore the Veerabhadra Temple in Lepakshi, featuring a massive granite pillar that does not touch the temple floor. Discover the engineering theories behind this gravity-defying medieval marvel.",
      category: "Unknown Knowledge",
      personas: ["History Buffs", "Travel & Architecture"],
      imageUrl: "images/ajanta.jpg",
      videoUrl: "https://www.youtube.com/embed/5_9a6Ld8hB8",
      content: [
        {
          title: "The Floating Pillar",
          text: "Out of 70 stone pillars in the temple hall, one hangs suspended in the air. Visitors can pass a thin sheet of paper or cloth completely under the pillar's base, proving it doesn't rest on the floor.",
          visual: "🏛️"
        },
        {
          title: "Architectural Genius",
          text: "Built in the 16th century by brothers Viranna and Virupanna under the Vijayanagara Empire, the hanging pillar functions as a structural balance point, distributing weight across other columns.",
          visual: "📐"
        }
      ]
    },
    {
      id: "lonar",
      title: "Lonar Lake: The Meteor Impact Crater",
      tagline: "India's Ancient Space Crater",
      description: "Formed over 50,000 years ago by a hyper-velocity meteor impact, Lonar Lake is a unique saline and alkaline water body surrounded by temple ruins and dense foliage.",
      category: "Unknown Knowledge",
      personas: ["Travel & Architecture", "History Buffs"],
      imageUrl: "images/hampi.jpg",
      videoUrl: "https://www.youtube.com/embed/5_9a6Ld8hB8",
      content: [
        {
          title: "Out of this Space",
          text: "The crater is the only known impact crater in basalt rock on Earth. The water is highly alkaline, housing unique microorganisms found nowhere else.",
          visual: "☄️"
        },
        {
          title: "Ancient Temples",
          text: "The perimeter of the lake features ruins of 800-year-old temples, including the Daitya Sudan temple dedicated to Lord Vishnu, built with basalt carvings.",
          visual: "🛕"
        }
      ]
    },
    {
      id: "root_bridges",
      title: "Living Root Bridges of Meghalaya",
      tagline: "Ficus elastica Bio-Engineering",
      description: "Deep in the wet forests of Cherrapunji, local tribes grow bridges from the roots of living rubber trees. Discover this sustainable ancient technique of bio-engineering.",
      category: "Unknown Knowledge",
      personas: ["Travel & Architecture"],
      imageUrl: "images/chola.jpg",
      videoUrl: "https://www.youtube.com/embed/5_9a6Ld8hB8",
      content: [
        {
          title: "Growing a Bridge",
          text: "Instead of cutting trees, the Khasi people guide the strong roots of Ficus elastica trees across rushing rivers using hollowed betel nut trunks. The bridges take 15 years to grow but last for centuries.",
          visual: "🌉"
        },
        {
          title: "Living Infrastructure",
          text: "Unlike steel or concrete, these living root bridges grow stronger over time as the roots thicken and become more resilient to monsoon flooding.",
          visual: "🌳"
        }
      ]
    },
    {
      id: "lepakshi_bull",
      title: "The Giant Nandi of Lepakshi",
      tagline: "India's Largest Monolithic Bull",
      description: "Located just a mile from the Lepakshi temple, this colossal Nandi is carved from a single granite stone block. It stands as a peak of Vijayanagara stone craftsmanship.",
      category: "Video Series",
      personas: ["Travel & Architecture", "Spiritual Seekers"],
      imageUrl: "images/hampi.jpg",
      videoUrl: "https://www.youtube.com/embed/5_9a6Ld8hB8",
      content: [
        {
          title: "Monolithic Wonder",
          text: "Measuring 15 feet high and 27 feet long, it is the largest monolithic statue of Nandi (Shiva's mount) in India. Its proportions are perfectly balanced.",
          visual: "🐂"
        }
      ]
    }
  ],

  async generateAndPublish() {
    const db = readDB();
    if (!db.aiStatus) {
      db.aiStatus = {
        lastRun: null,
        history: []
      };
    }

    let generatedItem = null;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        console.log("AIEngine: Querying Gemini API for content generation...");
        
        let url = "";
        let requestBody = {};
        
        if (apiKey.startsWith('AQ.')) {
          // Vertex AI API Endpoint
          const project = process.env.GEMINI_PROJECT || "228542607825";
          url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${project}/locations/us-central1/publishers/google/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
          requestBody = {
            contents: [{
              role: "user",
              parts: [{
                text: "Generate a new lesser-known Indian historical heritage chronicle item. Return ONLY a valid JSON object matching this structure: {\"title\": \"Title\", \"tagline\": \"Catchy line\", \"description\": \"Short overview\", \"category\": \"Unknown Knowledge\", \"personas\": [\"History Buffs\"], \"imageUrl\": \"images/dharma.jpg\", \"videoUrl\": \"https://www.youtube.com/embed/5_9a6Ld8hB8\", \"content\": [{\"title\": \"Slide Title\", \"text\": \"Detail text\", \"visual\": \"Emoji\"}]}. Category must be one of: 'Video Series', 'Animation Series', 'Ebook & Audio Series', 'Unknown Knowledge'. Do not write markdown blocks or backticks, return raw JSON text."
              }]
            }]
          };
        } else {
          // Google AI Studio Developer Endpoint (using v1beta to ensure flash is available)
          url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
          requestBody = {
            contents: [{
              parts: [{
                text: "Generate a new lesser-known Indian historical heritage chronicle item. Return ONLY a valid JSON object matching this structure: {\"title\": \"Title\", \"tagline\": \"Catchy line\", \"description\": \"Short overview\", \"category\": \"Unknown Knowledge\", \"personas\": [\"History Buffs\"], \"imageUrl\": \"images/dharma.jpg\", \"videoUrl\": \"https://www.youtube.com/embed/5_9a6Ld8hB8\", \"content\": [{\"title\": \"Slide Title\", \"text\": \"Detail text\", \"visual\": \"Emoji\"}]}. Category must be one of: 'Video Series', 'Animation Series', 'Ebook & Audio Series', 'Unknown Knowledge'. Do not write markdown blocks or backticks, return raw JSON text."
              }]
            }]
          };
        }

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const resJson = await response.json();
          let rawText = "";
          if (resJson.candidates && resJson.candidates[0].content && resJson.candidates[0].content.parts) {
            rawText = resJson.candidates[0].content.parts[0].text;
          }
          rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          generatedItem = JSON.parse(rawText);
          generatedItem.id = `ai_${Date.now()}`;
          generatedItem.isPremium = Math.random() > 0.5;
          generatedItem.year = "2026";
          generatedItem.rating = "9.9 ★";
          generatedItem.duration = "15 Mins";
        } else {
          const errText = await response.text();
          console.warn(`Gemini API returned status ${response.status}:`, errText);
        }
      } catch (err) {
        console.warn("Gemini query failed, falling back to local procedural generator", err);
      }
    }

    if (!generatedItem) {
      console.log("AIEngine: Running local procedural generator fallback...");
      const existingIds = db.content.map(c => c.id);
      const availableTopics = this.topics.filter(t => !existingIds.includes(t.id) && !existingIds.includes(`ai_${t.id}`));
      
      const sourceTopic = availableTopics.length 
        ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
        : this.topics[Math.floor(Math.random() * this.topics.length)];

      generatedItem = {
        ...sourceTopic,
        id: `ai_${sourceTopic.id}_${Date.now()}`,
        isPremium: Math.random() > 0.5,
        year: "2026",
        rating: "9.8 ★",
        duration: "20 Mins"
      };
    }

    db.content.push(generatedItem);
    db.aiStatus.lastRun = new Date().toISOString();
    db.aiStatus.history.push({
      id: generatedItem.id,
      title: generatedItem.title,
      category: generatedItem.category,
      timestamp: db.aiStatus.lastRun
    });

    writeDB(db);
    console.log(`AIEngine: Published new chronicle "${generatedItem.title}" successfully!`);
    return generatedItem;
  },

  checkAndAutoRun() {
    const db = readDB();
    if (!db.aiStatus || !db.aiStatus.lastRun) {
      this.generateAndPublish().catch(err => console.error("Initial AI generation failed", err));
      return;
    }

    const lastTime = new Date(db.aiStatus.lastRun).getTime();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    const diff = Date.now() - lastTime;

    if (diff >= threeDaysMs) {
      console.log("AIEngine: 3 days have elapsed since last publish. Running autogen pipeline...");
      this.generateAndPublish().catch(err => console.error("Autogen pipeline failed", err));
    } else {
      const nextTime = new Date(lastTime + threeDaysMs);
      console.log(`AIEngine: Next autogen scheduled at ${nextTime.toLocaleString()}`);
    }
  }
};

// 7. Get AI Pipeline Status
app.get('/api/ai/status', verifyAdminSession, (req, res) => {
  const db = readDB();
  const aiStatus = db.aiStatus || { lastRun: null, history: [] };
  
  let nextRun = "Pending first run";
  if (aiStatus.lastRun) {
    const lastRunMs = new Date(aiStatus.lastRun).getTime();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    nextRun = new Date(lastRunMs + threeDaysMs).toLocaleString();
  }
  
  res.json({
    lastRun: aiStatus.lastRun ? new Date(aiStatus.lastRun).toLocaleString() : "None yet",
    lastTitle: aiStatus.history.length ? aiStatus.history[aiStatus.history.length - 1].title : "None yet",
    nextRun
  });
});

// 8. Trigger Manual AI Generation (Admin)
app.post('/api/ai/generate', verifyAdminSession, async (req, res) => {
  try {
    const newItem = await AIEngine.generateAndPublish();
    res.json({ success: true, item: newItem });
  } catch (err) {
    console.error("AI Generation route failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// 9. Admin Login Session Gateway
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'prasanna.vyoma@gmail.com' && password === '#Dar9035442904') {
    res.setHeader('Set-Cookie', 'hs_admin_session=authenticated; Path=/; Max-Age=86400; HttpOnly');
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid admin credentials." });
  }
});

// 10. Admin Logout Terminate Gateway
app.post('/api/admin/logout', (req, res) => {
  res.setHeader('Set-Cookie', 'hs_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly');
  res.json({ success: true });
});

// Run AI check on startup (1s delay) and every hour
setTimeout(() => {
  AIEngine.checkAndAutoRun();
}, 1000);

setInterval(() => {
  AIEngine.checkAndAutoRun();
}, 1000 * 60 * 60);

// Start background email notifications (Welcome, Renewal, Abandoned Checkout)
startEmailSchedulers();

app.listen(PORT, () => {
  console.log(`HeritageStream fullstack app listening on http://localhost:${PORT}`);
});
