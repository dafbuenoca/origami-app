<template>
    <div id="FigureForm">
        <div class="container slim-form">
            <h1>Añadir figura</h1>
            <div class="card">
                <div class="card-body">
                    <form v-on:submit.prevent="addFigure">
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <input v-model="newFigure.name" placeholder="Nombre" type="text" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <input v-model="newFigure.author" placeholder="Autor" type="text" class="form-control">
                            </div>
                            <div class="form-group col-md-6">
                                <select v-model="newFigure.difficult" class="form-control">
                                    <option disabled value="">Seleccione Dificultad</option>
                                    <option>Experto</option>
                                    <option>Intermedio</option>
                                    <option>Inicial</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="inputSheet" class="ol-form-label justify-content-end">Hojas</label>
                            </div>
                            <div class="form-group col-md-3"> 
                                <input v-model="newFigure.sheet" placeholder="Hojas" type="number" class="form-control" id="inputSheet" min="1" >
                            </div>
                            <div class="form-group col-md-6">
                                <b-form-file
                                    @change="onSelectedFile"
                                    placeholder="Seleccione una foto"
                                    drop-placeholder="Arrastre una foto"
                                    required
                                    accept=".jpg, .png, .gif"
                                ></b-form-file>
                            </div>
                        </div>
                        <input type="submit" class="btn  btn-primary btn-lg btn-block" value="Agregar figura">
                    </form>
                </div>
            </div> 
        </div>
        <div class="container slim-form">
            <h1>Mis figuras</h1>
            <hr>
            <div class="row"> 
                <div class="col-3" v-for="figure in figuresByUser">
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
const {storage, figuresRef} = require('../firebaseConfig.js')
import { mapState } from 'vuex'

export default {
    data() {
        return {
            newFigure: {
                name:'',
                author:'',
                difficult:'',
                sheet: 0,
                imageUrl:"",
                uploadBy: "",
                uploadName: "",
                uploadPhoto: ""
            }, 
            selectedFile:null,
            uploadImage: 0,
        }
    },
    methods: {
        addFigure: function() {
            let that = this;
            let mountainsRef = storage.ref(`/images/${this.selectedFile.name}`);
            const task = mountainsRef.put(this.selectedFile);
            task.on('state_changed',  snapshot =>{
                let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                this.uploadImage = percentage
            }, error =>{console.log(error.message)},
            ()=>{
                this.uploadImage = 100;
                task.snapshot.ref.getDownloadURL().then(downloadURL => {
                    that.newFigure.uploadBy = this.$store.getters.user.uid;
                    that.newFigure.uploadName = this.$store.getters.user.displayName;
                    that.newFigure.uploadPhoto = this.$store.getters.user.photoURL;
                    that.newFigure.imageUrl = downloadURL;
                    figuresRef.push(that.newFigure);
                    this.newFigure.name = "";
                    this.newFigure.author = "";
                    this.newFigure.sheet = 0;
                    this.newFigure.difficult = "";
                    this.newFigure.imageUrl = "";
                    this.uploadBy = "";
                    this.uploadName = "";
                    this.uploadPhoto = "";
                    this.$toastr.success('Figura añadida');
                });
            })
        },
        onSelectedFile: function(event){
            this.selectedFile = event.target.files[0];
        }
    },
    computed: {
        figuresByUser() {
            let data = [];
            figuresRef.on('value', snap =>  {
                snap.forEach(childSnapshot => {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    data.push(item);
                });
            });
            return data.filter(figure => figure.uploadBy === this.$store.getters.user.uid)
        }
    }
}
</script>
<style>
    
</style>

