<template>
  <p aria-live="assertive" class="text-danger" :id="id">
    <slot />
  </p>
</template>

<script>
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true,
      },
    },
  };
</script>
