<script setup>
import { ref } from 'vue';
import StudentForm from './src/forms.vue';
import StudentList from './src/List.vue';

// La source de vérité : la liste des étudiants
const students = ref([]);

// Fonction pour ajouter un étudiant reçu depuis le formulaire
const addStudent = (newStudent) => {
  students.value.push(newStudent);
};
</script>

<template>
  <div class="container py-5">
    <h1 class="text-center mb-5">Gestion des Étudiants</h1>

    <div class="row">
      <div class="col-md-5 mb-4">
        <StudentForm @add-student="addStudent" />
      </div>

      <div class="col-md-7">
        <StudentList :students="students" />
      </div>
    </div>
  </div>
</template>