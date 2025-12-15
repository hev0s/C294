<script setup>
defineProps({
  students: {
    type: Array,
    required: true
  }
});

// Petit helper pour formater la date proprement
const formatDate = (dateString) => {
  if (!dateString) return 'Non renseignée';
  return new Date(dateString).toLocaleDateString('fr-FR');
};
</script>

<template>
  <div v-if="students.length > 0">
    <h3 class="mb-3">Liste des étudiants inscrits ({{ students.length }})</h3>

    <div class="row">
      <div class="col-12 mb-3" v-for="(student, index) in students" :key="index">

        <div class="card h-100 border-primary">
          <div class="card-header d-flex justify-content-between align-items-center bg-light">
            <h5 class="m-0 text-primary">{{ student.firstName }} {{ student.lastName }}</h5>
            <span class="fs-2" title="Caractère">{{ student.emoji }}</span>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <p class="card-text"><strong>Genre :</strong> {{ student.gender }}</p>
                <p class="card-text"><strong>Né(e) le :</strong> {{ formatDate(student.dob) }}</p>
              </div>
              <div class="col-sm-6">
                <strong>Intérêts :</strong>
                <ul class="mb-0">
                  <li v-for="interet in student.interests" :key="interet">{{ interet }}</li>
                  <li v-if="student.interests.length === 0" class="text-muted">Aucun</li>
                </ul>
              </div>
            </div>

            <hr>

            <p class="card-text">
              <strong>Motivation :</strong><br>
              <em class="text-muted">{{ student.motivation || "Pas de motivation spécifiée." }}</em>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>