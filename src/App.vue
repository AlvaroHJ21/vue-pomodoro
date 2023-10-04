<script setup lang="ts">
import tomato from './assets/tomato.png';
import { usePomodoro } from './usePomodoro';
const { title, startTimer, reset, formatedTimer, arrayChecks } = usePomodoro();
</script>

<template>
  <main class="grid h-screen bg-amarillo place-content-center">
    <div class="flex flex-col items-center gap-8">
      <!-- Title -->
      <h1 class="text-6xl font-bold text-verde">{{ title }}</h1>
      <!-- Timer -->
      <div class="relative w-80 h-80">
        <img :src="tomato" alt="" class="absolute inset-0 z-0 h-full m-auto" />
        <h2 class="absolute left-0 right-0 m-auto text-6xl font-bold text-white bottom-24 w-fit">
          {{ formatedTimer }}
        </h2>
      </div>
      <!-- Marks and buttons -->
      <div class="flex items-center justify-between w-full">
        <button @click="startTimer" class="px-4 py-2 font-semibold text-white rounded-md bg-verde">
          Start
        </button>
        <ul class="flex gap-2 text-2xl">
          <li v-for="check in arrayChecks" class="text-verde">
            <i class="fa fa-check"></i>
          </li>
        </ul>
        <button @click="reset" class="px-4 py-2 font-semibold text-white rounded-md bg-verde">
          Reset
        </button>
      </div>
    </div>
  </main>
</template>
