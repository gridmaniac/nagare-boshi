<template>
  <section class="relative">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </section>
</template>

<style scoped>
span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow:
    0 0 0 4px rgba(255, 255, 255, 0.1),
    0 0 0 8px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(255, 255, 255, 0.1);
  animation: animate 6s linear infinite;
}

span::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 1px;
  background: linear-gradient(90deg, #fff, transparent);
}

@keyframes animate {
  0% {
    transform: rotate(315deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 0.7;
  }
  100% {
    transform: rotate(315deg) translateX(-1000px);
    opacity: 0;
  }
}

span:nth-child(1) {
  top: -10px;
  right: 0;
  left: initial;
  animation-delay: 0s;
  animation-duration: 1s;
}

span:nth-child(2) {
  top: -10px;
  right: 80px;
  left: initial;
  animation-delay: 0.2s;
  animation-duration: 3s;
}

span:nth-child(3) {
  top: 80px;
  right: -10px;
  left: initial;
  animation-delay: 0.4s;
  animation-duration: 2s;
}

span:nth-child(4) {
  top: -10px;
  right: 180px;
  left: initial;
  animation-delay: 0.6s;
  animation-duration: 1.5s;
}

span:nth-child(5) {
  top: -10px;
  right: 400px;
  left: initial;
  animation-delay: 0.8s;
  animation-duration: 2.5s;
}

span:nth-child(6) {
  top: -10px;
  right: 600px;
  left: initial;
  animation-delay: 1s;
  animation-duration: 3s;
}

span:nth-child(7) {
  top: 300px;
  right: -10px;
  left: initial;
  animation-delay: 1.2s;
  animation-duration: 1.75s;
}

span:nth-child(8) {
  top: -10px;
  right: 700px;
  left: initial;
  animation-delay: 1.4s;
  animation-duration: 1.25s;
}

span:nth-child(9) {
  top: -10px;
  right: 1000px;
  left: initial;
  animation-delay: 0.75s;
  animation-duration: 2.25s;
}

span:nth-child(9) {
  top: -10px;
  right: 450px;
  left: initial;
  animation-delay: 2.75s;
  animation-duration: 2.75s;
}
</style>
