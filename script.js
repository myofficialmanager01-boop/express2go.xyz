const SUPABASE_URL = "https://qrdyeewoyeecyknswdux.supabase.co";
const SUPABASE_KEY = "sb_publishable_aQD7vtzSznySGGfZVWl1xg_Gy0wcn_x";

async function trackShipment() {
  const code = document.getElementById("trackingCode").value.trim();
  const result = document.getElementById("trackingResult");

  if (!code) {
    result.textContent = "Please enter a tracking code.";
    return;
  }

  result.textContent = "Checking shipment...";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/shipments?tracking_code=eq.${encodeURIComponent(code)}&select=*`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Unable to contact tracking system.");
    }

    const shipments = await response.json();

    if (shipments.length === 0) {
      result.textContent = "Tracking number not found.";
      return;
    }

    const shipment = shipments[0];

    result.innerHTML = `
      <strong>Shipment Found</strong><br><br>
      Tracking: ${shipment.tracking_code}<br>
      Status: ${shipment.status}<br>
      Current location: ${shipment.current_location || "Not available"}<br>
      Origin: ${shipment.origin || "Not available"}<br>
      Destination: ${shipment.destination || "Not available"}<br>
      Estimated delivery: ${shipment.estimated_delivery || "Not available"}
    `;

  } catch (error) {
    console.error(error);
    result.textContent = "Unable to check tracking information. Please try again.";
  }
}
