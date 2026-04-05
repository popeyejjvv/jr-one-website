// ═══════════════════════════════════════════════════════════════
// JR ONE ALUMINUM — AERIAL ESTIMATOR EMAIL HANDLER
// Google Apps Script — Deploy as Web App
// v2 — Fixed: no emojis, table-based layout, bulletproof colors
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var pdfBlob = null;
    if (data.pdfBase64) {
      pdfBlob = Utilities.newBlob(
        Utilities.base64Decode(data.pdfBase64),
        'application/pdf',
        'JR-One-Aerial-Estimate-' + data.discountCode + '.pdf'
      );
    }
    
    if (data.type === 'lead') {
      var subject = 'New Aerial Estimate Lead: ' + data.phone + ' - ' + data.address;
      var body = buildLeadEmail(data);
      var emailOptions = { htmlBody: body, name: 'JR One Aerial Estimator' };
      if (pdfBlob) emailOptions.attachments = [pdfBlob];
      GmailApp.sendEmail('info@jronegutters.com', subject, '', emailOptions);
      GmailApp.sendEmail('info@jronegutters.com', subject, '', emailOptions);
      
    } else if (data.type === 'customer') {
      var custSubject = 'Your JR One Aluminum Estimate - ' + data.discountCode;
      var custBody = buildCustomerEmail(data);
      var custOptions = { htmlBody: custBody, name: 'JR One Aluminum', replyTo: 'info@jronegutters.com' };
      if (pdfBlob) custOptions.attachments = [pdfBlob];
      GmailApp.sendEmail(data.customerEmail, custSubject, '', custOptions);
      
      var notifySubject = 'Aerial Lead Updated - Full Contact: ' + data.customerName + ' | ' + data.phone;
      var notifyBody = buildContactUpdateEmail(data);
      var notifyOptions = { htmlBody: notifyBody, name: 'JR One Aerial Estimator' };
      if (pdfBlob) notifyOptions.attachments = [pdfBlob];
      GmailApp.sendEmail('info@jronegutters.com', notifySubject, '', notifyOptions);
      GmailApp.sendEmail('info@jronegutters.com', notifySubject, '', notifyOptions);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'active', 
    service: 'JR One Aerial Estimator',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}


// ═══════════════════════════════════════
// EMAIL TEMPLATES — Table-based, no emojis
// ═══════════════════════════════════════

function buildLeadEmail(data) {
  var m = data.measurements || {};
  var ds = data.downspouts || {};
  
  return '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;"><tr><td>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td bgcolor="#1B2A4A" style="background-color:#1B2A4A;padding:20px;">' +
        '<span style="color:#C8952E;font-size:20px;font-weight:bold;">New Aerial Estimate Lead</span><br/>' +
        '<span style="color:#aaaaaa;font-size:13px;">Submitted via Aerial Estimator Tool</span>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="background-color:#f8f9fa;padding:20px;border-left:4px solid #C8952E;">' +
        '<span style="font-size:16px;font-weight:bold;color:#1B2A4A;">Contact Information</span><br/><br/>' +
        '<span style="color:#666666;font-weight:bold;">Phone:</span> <span style="color:#333333;">' + data.phone + '</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Address:</span> <span style="color:#333333;">' + data.address + '</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Home Type:</span> <span style="color:#333333;">' + data.stories + '-Story</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Discount Code:</span> <span style="color:#2D8B4E;font-weight:bold;">' + data.discountCode + '</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Expires:</span> <span style="color:#333333;">' + data.expDate + '</span>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding:20px;">' +
        '<span style="font-size:16px;font-weight:bold;color:#1B2A4A;">Measurements</span><br/><br/>' +
        (m.gutter > 0 ? '<span style="color:#333333;">Gutters: <strong>' + Math.round(m.gutter) + ' LF</strong></span><br/>' : '') +
        (m.gutter > 0 ? '<span style="color:#666666;">&nbsp;&nbsp;&nbsp;Downspouts: ' + ds.count + ' units x ' + ds.ftEach + 'ft = ' + ds.totalFt + ' ft</span><br/>' : '') +
        (m.soffit > 0 ? '<span style="color:#333333;">Soffit: <strong>' + Math.round(m.soffit) + ' LF</strong></span><br/>' : '') +
        (m.fascia > 0 ? '<span style="color:#333333;">Fascia: <strong>' + Math.round(m.fascia) + ' LF</strong></span><br/>' : '') +
        (m.guard > 0 ? '<span style="color:#333333;">Leaf Guard: <strong>' + Math.round(m.guard) + ' LF</strong></span><br/>' : '') +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td bgcolor="#1B2A4A" style="background-color:#1B2A4A;padding:20px;text-align:center;">' +
        '<span style="color:#aaaaaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Estimated Range Shown to Customer</span><br/>' +
        '<span style="color:#C8952E;font-size:24px;font-weight:bold;">$' + data.estimateLow.toLocaleString() + ' - $' + data.estimateHigh.toLocaleString() + '</span><br/>' +
        '<span style="color:#aaaaaa;font-size:11px;">PDF estimate attached with aerial screenshot</span>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding:12px;text-align:center;">' +
        '<span style="font-size:11px;color:#999999;">Submitted: ' + new Date(data.timestamp).toLocaleString() + '</span>' +
      '</td>' +
    '</tr></table>' +
    
  '</td></tr></table>';
}


function buildCustomerEmail(data) {
  return '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;"><tr><td>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td bgcolor="#1B2A4A" style="background-color:#1B2A4A;padding:24px;text-align:center;">' +
        '<span style="color:#C8952E;font-size:22px;font-weight:bold;">JR One Aluminum</span><br/>' +
        '<span style="color:#aaaaaa;font-size:13px;">Your Aerial Property Estimate</span>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding:24px;background-color:#ffffff;">' +
        '<span style="font-size:15px;color:#333333;">Hi ' + data.customerName + ',</span><br/><br/>' +
        '<span style="font-size:14px;color:#555555;line-height:22px;">Thank you for using our Aerial Estimator. Your personalized estimate is attached as a PDF, including your aerial measurements and pricing breakdown.</span>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding:0 24px 20px 24px;">' +
        '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
          '<td bgcolor="#f0faf4" style="background-color:#f0faf4;border:2px solid #2D8B4E;padding:20px;text-align:center;">' +
            '<span style="color:#2D8B4E;font-weight:bold;font-size:14px;">Your 5% Discount Code</span><br/><br/>' +
            '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
              '<td style="background-color:#ffffff;border:1px dashed #2D8B4E;padding:8px;text-align:center;">' +
                '<span style="color:#1B2A4A;font-size:24px;font-weight:bold;letter-spacing:3px;">' + data.discountCode + '</span>' +
              '</td>' +
            '</tr></table><br/>' +
            '<span style="color:#666666;font-size:12px;">Valid through <strong style="color:#333333;">' + data.expDate + '</strong> - Mention this code when you call</span>' +
          '</td>' +
        '</tr></table>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding:0 24px 24px 24px;">' +
        '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
          '<td bgcolor="#C8952E" style="background-color:#C8952E;padding:20px;text-align:center;">' +
            '<span style="color:#1B2A4A;font-weight:bold;font-size:15px;">Ready for Your Exact Price?</span><br/>' +
            '<span style="color:#1B2A4A;font-size:13px;">We will confirm everything on-site - no surprises, no pressure.</span><br/><br/>' +
            '<table cellpadding="0" cellspacing="0" border="0" align="center"><tr>' +
              '<td bgcolor="#1B2A4A" style="background-color:#1B2A4A;padding:12px 28px;">' +
                '<a href="tel:8444443114" style="color:#C8952E;text-decoration:none;font-weight:bold;font-size:16px;">(844) 444-3114</a>' +
              '</td>' +
            '</tr></table><br/>' +
            '<a href="https://jronegutters.com/contact" style="color:#1B2A4A;font-weight:bold;font-size:12px;">Or request a consultation online</a>' +
          '</td>' +
        '</tr></table>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td bgcolor="#1B2A4A" style="background-color:#1B2A4A;padding:16px;text-align:center;">' +
        '<span style="color:#C8952E;font-size:13px;font-weight:bold;">JR One Aluminum LLC</span><br/>' +
        '<span style="color:#aaaaaa;font-size:11px;">Tampa Bays #1 in Aluminum - 30+ Years of Excellence</span><br/>' +
        '<span style="color:#666666;font-size:10px;">jronegutters.com | (844) 444-3114</span>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding:10px;text-align:center;">' +
        '<span style="font-size:10px;color:#999999;line-height:16px;">This estimate is approximate and based on aerial imagery. Final pricing determined by on-site consultation. Discount code is non-transferable and valid for one project.</span>' +
      '</td>' +
    '</tr></table>' +
    
  '</td></tr></table>';
}


function buildContactUpdateEmail(data) {
  return '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;"><tr><td>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td bgcolor="#2D8B4E" style="background-color:#2D8B4E;padding:16px;">' +
        '<span style="color:#ffffff;font-size:16px;font-weight:bold;">Lead Contact Updated - Full Info Captured</span>' +
      '</td>' +
    '</tr></table>' +
    
    '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
      '<td style="padding:20px;background-color:#f8f9fa;">' +
        '<span style="font-size:14px;color:#333333;">This customer entered their full contact info to receive their estimate via email.</span><br/><br/>' +
        '<span style="color:#666666;font-weight:bold;">Name:</span> <span style="color:#1B2A4A;font-weight:bold;">' + data.customerName + '</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Email:</span> <a href="mailto:' + data.customerEmail + '" style="color:#1B2A4A;">' + data.customerEmail + '</a><br/>' +
        '<span style="color:#666666;font-weight:bold;">Phone:</span> <span style="color:#333333;">' + data.phone + '</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Address:</span> <span style="color:#333333;">' + data.address + '</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Code:</span> <span style="color:#2D8B4E;font-weight:bold;">' + data.discountCode + '</span><br/>' +
        '<span style="color:#666666;font-weight:bold;">Estimate:</span> <span style="color:#333333;">$' + data.estimateLow.toLocaleString() + ' - $' + data.estimateHigh.toLocaleString() + '</span><br/><br/>' +
        '<span style="font-size:12px;color:#999999;">This is a high-intent lead - they measured their own home and requested the estimate by email.</span>' +
      '</td>' +
    '</tr></table>' +
    
  '</td></tr></table>';
}
