<template>
  <input type="checkbox" id="contact-modal" class="modal-toggle" />
  <div class="modal max-md:modal-bottom">
    <div class="modal-box bg-white w-full md:max-w-xl">
      <img
        src="/images/logo.png"
        class="w-full h-auto mt-5 mb-10"
        alt="main-logo"
      />
      <div class="info-row">
        <img src="@/assets/icons/certificate.svg" class="w-7 -mt-1" alt="icon" />
        <div>
          <h3 class="font-semibold text-slate-600 md:text-lg uppercase">
            Nombre de la empresa
          </h3>
          <p>Masticando Sabores</p>
        </div>
      </div>
      <div class="info-row">
        <img src="@/assets/icons/map-pin.svg" class="w-7 -mt-1" alt="icon" />
        <div>
          <h3 class="font-semibold text-slate-600 md:text-lg uppercase">
            Dirección
          </h3>
          <p>Calle Paseo #9 e/ 1ra y 3ra, Vedado, La Habana</p>
        </div>
      </div>
      <div class="info-row">
        <img src="@/assets/icons/mail.svg" class="w-7 -mt-1" alt="icon" />
        <div>
          <h3 class="font-semibold text-slate-600 md:text-lg uppercase">
            Correo Electrónico
          </h3>
          <a href="mailto:saboresmasticando@gmail.com" target="_blank">
            saboresmasticando@gmail.com
          </a>
        </div>
      </div>
      <div class="info-row">
        <img src="@/assets/icons/phone.svg" class="w-7 -mt-1" alt="icon" />
        <div>
          <h3 class="font-semibold text-slate-600 md:text-lg uppercase">
            Teléfono
          </h3>
          <a :href="`tel:${PHONE_NUMBER}`"> +{{ PHONE_NUMBER }} </a>
        </div>
      </div>
      <div class="info-row">
        <img src="@/assets/icons/whatsapp.svg" class="w-7 -mt-1" alt="icon" />
        <div>
          <h3 class="font-semibold text-slate-600 md:text-lg uppercase">
            WhatsApp
          </h3>
          <a :href="`https://wa.me/${PHONE_NUMBER}`" target="_blank"> +{{ PHONE_NUMBER }} </a>
        </div>
      </div>
      <label
        for="contact-modal"
        class="btn bg-[#003399] hover:bg-[#003399] text-white hover:opacity-[0.95] flex items-center ml-auto mt-7"
      >
        CERRAR
      </label>
    </div>
  </div>
</template>

<script setup>
const PHONE_NUMBER = import.meta.env.VITE_COMPANY_PHONE_NUMBER
</script>

<style lang="css" scoped>
.info-row {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  & h3 {
    line-height: 20px;
  }
  & a {
    color: #003399;
  }
}
</style>
