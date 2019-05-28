<template>
    <div id="Origami">
        <div class="container"> 
            <h1>Figuras</h1>
            <div class="card">
                <div class="card-header"> 
                    <h3> Añadir figura </h3>
                </div>
                <div class="card-body">
                    <FigureForm></FigureForm>
                </div>
            </div> 
            <hr>
            <div class="row"> 
                <div class="col-4" v-for="figure in figures">
                    <div class="card" >
                        <img :src="figure.imageUrl" class="card-img-top" alt="...">
                        <div class="card-body">
                           <h3 class="card-title">{{figure.name}}</h3>
                            <p>Autor: {{figure.author}}</p>
                            <p>Hojas: {{figure.sheet}}</p>
                            <p>Dificultad: {{figure.difficult}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FigureForm from "./FigureForm"
const fb = require('../firebaseConfig.js')

export default {
    firebase: {
        figures: fb.figuresRef,
    },
    components: {
        FigureForm
    }
};
</script>
<style></style>
