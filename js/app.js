// --- Swish / Mollie betalning ---
document.getElementById("swishPay")?.addEventListener("click", async () => {
    // Här använder du Mollie API (exempel)
    const paymentResponse = await axios.post("/.netlify/functions/molliePayment", {
      amount: 200,
      description: "Lägg upp tjänst"
    });
    window.location.href = paymentResponse.data.checkoutUrl; // Redirect till Swish
  });
  
  // --- Formulär för att lägga upp tjänst i Airtable ---
  const serviceForm = document.getElementById("serviceForm");
  serviceForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      company: e.target.company.value,
      service: e.target.service.value,
      description: e.target.description.value,
      image: e.target.image.value
    };
    await axios.post("/.netlify/functions/addService", data);
    alert("Tjänst publicerad!");
    e.target.reset();
  });
  
  // --- Hämta tjänster ---
  async function loadServices() {
    const res = await axios.get("/.netlify/functions/getServices");
    const container = document.getElementById("servicesContainer");
    container.innerHTML = "";
    res.data.records.forEach(s => {
      container.innerHTML += `
        <div class="service">
          <h3>${s.fields.service} - ${s.fields.company}</h3>
          <p>${s.fields.description}</p>
          ${s.fields.image ? `<img src="${s.fields.image}" width="200">` : ''}
          <a href="chat.html">Chatta</a>
        </div>
      `;
    });
  }
  loadServices();
  