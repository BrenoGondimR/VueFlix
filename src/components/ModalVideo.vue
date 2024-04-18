<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-container">
      <iframe
          width="660"
          height="415"
          :src="youtubeEmbedUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
      ></iframe>
      <button class="modal-close-btn" @click="$emit('close')">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoLink: {
      type: String,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    youtubeEmbedUrl() {
      // Assuming videoLink is a regular YouTube link, we need to convert it to an embed link
      const videoId = this.videoLink.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if(ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  position: relative;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-close-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: #333;
}

iframe {
  max-width: 100%;
  border: none;
}
</style>
