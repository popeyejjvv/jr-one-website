import { NextResponse } from "next/server";

// =============================================================================
// JR One — Estimator Lead API
// =============================================================================
// Receives lead submissions from the Instant Estimator tool (public/estimator.html)
// and creates a corresponding client record in BuilderPrime.
//
// This route was added 2026-04-06 because the original estimator only sent leads
// to a Google Apps Script (Google Sheet) and bypassed BuilderPrime entirely —
// every lead generated through the estimator was invisible to the CRM and the
// outreach automation.
//
// VERIFIED 2026-04-06: BP create-client schema requires nested userAccount
// object with firstName/lastName.
// =============================================================================

const BP_SUBDOMAIN = "jronegutters";
const BP_BASE_URL = `https://${BP_SUBDOMAIN}.builderprime.com/api`;

function splitName(fullName) {
  if (!fullName) return { firstName: "Estimator", lastName: "Lead" };
  const parts = String(fullName).trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "(no last name)" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function normalizePhone(phone) {
  if (!phone) return "";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

// Map estimator measurement totals to a meaningful project type
function inferProjectType(measurements) {
  if (!measurements) return "Gutters";
  const m = measurements;
  const hasGutter = (m.gutter || 0) > 0;
  const hasSoffit = (m.soffit || 0) > 0;
  const hasFascia = (m.fascia || 0) > 0;
  const hasGuard = (m.guard || 0) > 0;
  // Multi-service bundle = full house wrap = highest value
  if (hasGutter && (hasSoffit || hasFascia) && hasGuard) return "Gutters";
  if (hasGutter && hasGuard) return "Gutter Installation";
  if (hasGutter) return "Gutter Installation";
  if (hasSoffit || hasFascia) return "Soffit and Fascia";
  if (hasGuard) return "Gutter Guards";
  return "Gutters";
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Estimator payload shape (from public/estimator.html sendToJROne / sendToCustomer):
    //   type: 'lead' | 'customer'
    //   phone, address, stories, measurements, downspouts,
    //   estimateLow, estimateHigh, discountCode, expDate, timestamp
    //   customerName, customerEmail (only on type='customer')
    //   pdfBase64 (we ignore in BP — too big)
    const {
      type,
      phone,
      address,
      stories,
      measurements,
      downspouts,
      estimateLow,
      estimateHigh,
      discountCode,
      expDate,
      timestamp,
      customerName,
      customerEmail,
    } = body;

    // Phone is the minimum required to capture a lead
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    let bpResult = { attempted: false, ok: false, error: null, opportunity_id: null };

    if (process.env.BUILDER_PRIME_API_KEY) {
      bpResult.attempted = true;
      try {
        // Use customer name if provided, otherwise placeholder
        const nameToUse = customerName || "Estimator Lead";
        const { firstName, lastName } = splitName(nameToUse);

        // Build a detailed notes string with all the estimator context
        const notes = [
          `Lead from Instant Estimator tool (jronegutters.com/estimator)`,
          `Type: ${type || "lead"}`,
          `Stories: ${stories || "?"}`,
          measurements
            ? `Measurements: gutter=${measurements.gutter || 0}ft, soffit=${measurements.soffit || 0}ft, fascia=${measurements.fascia || 0}ft, guard=${measurements.guard || 0}ft`
            : "",
          downspouts ? `Downspouts: ${downspouts.totalFt || 0}ft total` : "",
          estimateLow && estimateHigh
            ? `Estimate range: $${estimateLow.toLocaleString()} - $${estimateHigh.toLocaleString()}`
            : "",
          discountCode ? `Discount code: ${discountCode} (expires ${expDate || "?"})` : "",
          timestamp ? `Submitted: ${timestamp}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        const bpPayload = {
          userAccount: {
            firstName: firstName,
            lastName: lastName,
            emailAddress: customerEmail || "",
          },
          emailAddress: customerEmail || "",
          phoneNumber: normalizePhone(phone),
          addressLine1: address || "",
          city: "",
          state: "FL",
          zip: "",
          leadSourceDescription: "Form Inquiry",
          projectTypeDescription: inferProjectType(measurements),
          buildingTypeDescription: "Single Family",
        };

        const bpResponse = await fetch(`${BP_BASE_URL}/clients`, {
          method: "POST",
          headers: {
            "x-api-key": process.env.BUILDER_PRIME_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(bpPayload),
        });

        const bpText = await bpResponse.text();
        if (bpResponse.ok) {
          bpResult.ok = true;
          const oppMatch = bpText.match(/Opportunity:\s*(\d+)/);
          if (oppMatch) bpResult.opportunity_id = oppMatch[1];
          console.log(`✓ Estimator lead created in Builder Prime (opportunity ${bpResult.opportunity_id || "?"})`);

          // Best-effort: append a client activity note with the full estimator details
          // This way the sales rep sees the measurements + estimate range + discount code
          // when they open the lead in BP. Non-blocking — failure is OK.
          if (bpResult.opportunity_id) {
            try {
              await fetch(`${BP_BASE_URL}/client-activities/v1`, {
                method: "POST",
                headers: {
                  "x-api-key": process.env.BUILDER_PRIME_API_KEY,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  opportunityId: parseInt(bpResult.opportunity_id),
                  description: notes,
                }),
              });
            } catch (actErr) {
              console.warn("⚠ Could not attach activity note:", actErr.message);
            }
          }
        } else {
          bpResult.error = `${bpResponse.status}: ${bpText.slice(0, 500)}`;
          console.error(`✗ Builder Prime error: ${bpResult.error}`);
        }
      } catch (bpErr) {
        bpResult.error = bpErr.message;
        console.error(`✗ Builder Prime exception: ${bpErr.message}`);
      }
    } else {
      console.warn("⚠ BUILDER_PRIME_API_KEY not set in environment — skipping BP create");
    }

    return NextResponse.json({
      success: true,
      captured_in_bp: bpResult.ok,
      bp_opportunity_id: bpResult.opportunity_id,
    });
  } catch (err) {
    console.error("Estimator lead error:", err);
    return NextResponse.json(
      { error: "Failed to process estimator lead" },
      { status: 500 }
    );
  }
}
