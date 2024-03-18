<template>
  <div id="about">
    <a-card id="aboutCard" hoverable :style="{ width: '360px' }" style="margin: 0 auto">
      <template #cover>
        <div
          :style="{
          height: '204px',
          overflow: 'hidden',
        }"
        >
          <img
            :style="{ width: '100%', transform: 'translateY(-20px)' }"
            alt="dessert"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      </template>
      <a-card-meta title="KarlexYan">
        <template #description>
          Talk is cheap, <br />
          Show me the code.
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>
<style>
#aboutCard{
  justify-content: center;
  align-items: center;
  max-width: 900px;
}
</style>
