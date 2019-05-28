<template>
    <div id="FigureForm">
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
                    <label for="inputSheet" class="ol-form-label">Hojas</label>
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
            <input type="submit" class="btn btn-success" value="Agregar figura">
        </form>
    </div>
</template>
<script>
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            newFigure: {
                name:'',
                author:'',
                difficult:'',
                sheet: 0,
                imageUrl:""
            }, 
            selectedFile:null,
            uploadImage: 0
        }
    },
    methods: {
        addFigure: function() {
            let that = this;
            console.log(that.newFigure);
            let mountainsRef = fb.storage.ref(`/images/${this.selectedFile.name}`);
            const task = mountainsRef.put(this.selectedFile)
            task.on('state_changed',  snapshot =>{
                let percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                this.uploadImage = percentage
            }, error =>{console.log(error.message)},
            ()=>{
                this.uploadImage = 100;
                task.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log(downloadURL);
                    that.newFigure.imageUrl = downloadURL;
                    fb.figuresRef.push(that.newFigure);
                    this.newFigure.name = "";
                    this.newFigure.author = "";
                    this.newFigure.sheet = 0;
                    this.newFigure.difficult = "";
                    this.newFigure.imageUrl = "";
                    this.$toastr.success('Figura añadida');
                });
            })
            
        },
        onSelectedFile: function(event){
            this.selectedFile = event.target.files[0];
        }
    }
}
</script>
<style>

</style>

