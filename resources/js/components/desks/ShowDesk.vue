<template>
    <div class="container">
        <div class="mb-3 mt-4">
            <input type="text" @blur="saveName" v-model="name" class="form-control" :class="{'is-invalid': $v.name.$error}">
            <div class="invalid-feedback">
                Обязательное поле!
            </div>
        </div>
        <div class="spinner-border text-primary" role="status" v-if="load"></div>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        props:[
            'deskId'
        ],
        data(){
            return{
                name:null,
                load:true
            }
        },
        methods:{
            saveName(){
                this.$v.$touch()
                if(this.$v.$anyError){
                    return;
                }
                axios.post('/api/V1/desks/' + this.deskId,{
                    _method:"PUT",
                    name:this.name
                })
                    .then(res =>{

                    })
                    .catch(error =>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.load = false
                    })
            }
        },
        mounted(){
            axios.get('/api/V1/desks/' + this.deskId)
                .then(res =>{
                    this.name = res.data.data.name
                })
                .catch(error =>{
                    console.log(error);
                })
                .finally(()=>{
                    this.load = false
                })
        },
        validations:{
            name:{
                required
            }
        }
    }
</script>
<style scoped>
    .spinner-border{
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>
