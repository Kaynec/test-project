<template>
  <div><Button>Hello Friend</Button></div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Button from "@/components/Button.vue";
const route = useRoute;
</script>
