<script setup>
import { reactive, computed } from 'vue';

const emit = defineEmits(['add-student']);

// Liste des intérêts possibles
const interestOptions = ['Sport', 'Environnement', 'Science', 'Technologie', 'Actualité'];

// État initial du formulaire
const form = reactive({
  firstName: '',
  lastName: '',
  dob: '',
  gender: 'Homme',
  mood: 50, // Valeur par défaut pour le slider
  motivation: '',
  interests: [] // Tableau pour stocker les checkbox multiples
});

// Votre fonction helper pour l'Emoji
function getEmojiByMood(mood) {
  let emojis = ["😢", "😁", "😊", "😒", "😃", "😐", "😖", "😤", "😟", "😆"];
  let index = Math.floor(mood / 10) - 1;
  if (index === -1) index = 0;
  // Sécurité au cas où on dépasse le tableau
  if (index >= emojis.length) index = emojis.length - 1;
  return emojis[index];
}

// Propriété calculée pour afficher l'emoji en temps réel pendant la saisie
const currentEmoji = computed(() => getEmojiByMood(form.mood));

const submitForm = () => {
  // Validation simple
  if (!form.firstName || !form.lastName) return;

  // Création de l'objet étudiant
  const newStudent = {
    ...form, // Copie des champs
    emoji: getEmojiByMood(form.mood) // On fige l'emoji lors de l'envoi
  };

  // Envoi au parent
  emit('add-student', newStudent);

  // Reset du formulaire (optionnel, pour ajouter le suivant proprement)
  form.firstName = '';
  form.lastName = '';
  form.dob = '';
  form.motivation = '';
  form.interests = [];
  form.mood = 50;
};
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-header bg-primary text-white">
      Ajouter un étudiant
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">

        <div class="mb-3">
          <label class="form-label">Prénom</label>
          <input type="text" v-model="form.firstName" class="form-control" required placeholder="Ex: Jean">
        </div>
        <div class="mb-3">
          <label class="form-label">Nom</label>
          <input type="text" v-model="form.lastName" class="form-control" required placeholder="Ex: Dupont">
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <label class="form-label">Date de naissance</label>
            <input type="date" v-model="form.dob" class="form-control">
          </div>
          <div class="col-6 mb-3">
            <label class="form-label">Genre</label>
            <select v-model="form.gender" class="form-select">
              <option>Homme</option>
              <option>Femme</option>
              <option>Autre</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Centres d'intérêt (Max 3)</label>
          <div v-for="option in interestOptions" :key="option" class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                :value="option"
                v-model="form.interests"
                :disabled="form.interests.length >= 3 && !form.interests.includes(option)"
            >
            <label class="form-check-label">{{ option }}</label>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label d-flex justify-content-between">
            <span>Caractère (Humeur)</span>
            <span class="fs-4">{{ currentEmoji }}</span>
          </label>
          <input type="range" v-model.number="form.mood" class="form-range" min="10" max="100" step="10">
          <div class="form-text">Ajustez le slider pour changer l'emoji.</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Motivation</label>
          <textarea v-model="form.motivation" class="form-control" rows="2"></textarea>
        </div>

        <button type="submit" class="btn btn-success w-100">Ajouter l'étudiant</button>
      </form>
    </div>
  </div>
</template>