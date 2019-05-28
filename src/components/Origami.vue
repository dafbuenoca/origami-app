<template>
    <div id="Origami">
        <div class="container"> 
            <h1>Figuras</h1>
            <div class="card">
                <div class="card-header"> 
                    <h3> Añadir figura 2 </h3>
                </div>
                <div class="card-body">
                    <form v-on:submit.prevent="addFigure">
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <input v-model="newFigure.name" placeholder="Nombre" type="text" class="form-control">
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
                                <label for="inputSheet" class="ol-form-label">Hojas</label>
                            </div>
                            <div class="form-group col-md-3"> 
                                <input v-model="newFigure.sheet" placeholder="Hojas" type="number" class="form-control" id="inputSheet">
                            </div>
                            <div class="form-group col-md-6">
                                <b-form-file
                                    @change="onSelectedFile"
                                    placeholder="Seleccione una foto"
                                    drop-placeholder="Arrastre una foto"
                                ></b-form-file>
                            </div>
                        </div>
                        <input type="submit" class="btn btn-success" value="Agregar figura">
                    </form>
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
    import FireBase from "firebase";
    
    let config = {
        apiKey: "AIzaSyB9JhOYU8gpuY7Xi9SHRCEHj6UX5YMrK1w",
        authDomain: "origami-a1f12.firebaseapp.com",
        databaseURL: "https://origami-a1f12.firebaseio.com",
        projectId: "origami-a1f12",
        storageBucket: "origami-a1f12.appspot.com",
        messagingSenderId: "586210150001",
        appId: "1:586210150001:web:2209f39348051882"
    };

    let app = FireBase.initializeApp(config);
    let db = app.database();
    let storage = app.storage();

    let figuresRef = db.ref('figures');
    let storageRef = storage.ref()
    

    export default {
        firebase: {
            figures: figuresRef,
        },
        data() {
            return {
                newFigure: {
                    name:'',
                    author:'',
                    difficult:'',
                    sheet: 0,
                    imageUrl:""
                }, 
                selectedFile:null
            }
        },
        methods: {
            addFigure: function() {
                let that = this
                let mountainsRef = storageRef.child(`/images/${this.selectedFile.name}`);
                mountainsRef.put(this.selectedFile).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        
                        console.log(downloadURL);
                        that.newFigure.imageUrl = downloadURL;
                    });
                });
                figuresRef.push(this.newFigure);
            },
            onSelectedFile: function(event){
                this.selectedFile = event.target.files[0];
            }
        }
    }
</script>
<style>
</style>
