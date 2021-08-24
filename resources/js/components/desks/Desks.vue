<template>
    <div class="container">
        <h1>Доски</h1>
        <form @submit.prevent="addNewDesk">

            <div class="form-group mt-3">
                <input type="text" v-model="name" class="form-control" placeholder="Введите название доски" :class="{'is-invalid': $v.name.$error}">
                <div class="invalid-feedback">
                    Обязательное поле!
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Добавить</button>
        </form>
        <div style="color: red;margin-top: 10px">{{errors[0]}}</div>
        <div class="row">
            <div class="col-lg-3" v-for="desk in desks">
                <div class="card mt-4">
                    <router-link class="card-body" :to="{name: 'showDesk', params: {deskId:desk.id}}">
                        <h4 class="card-title">{{desk.name}}</h4>
                    </router-link>
                    <button type="button" @click="deleteDesk(desk.id)" class="btn btn-danger">Удалить</button>
                </div>
            </div>

        </div>
        <div class="spinner-border text-primary" role="status" v-if="load"></div>

    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        data(){
            return{
                desks:[],
                load:true,
                name:null,
                errors:[]
            }
        },
        methods:{
            getDesks(){
                axios.get('/api/V1/desks')
                    .then(res =>{
                        this.desks = res.data.data
                    })
                    .catch(error =>{
                        console.log(error);
                    })
                    .finally(()=>{
                        this.load = false
                    })
            },
            deleteDesk(id){
                if(confirm("Вы действительно хотите удалить доску?")){
                    axios.post('/api/V1/desks/' + id,{
                        _method:"DELETE",
                    })
                        .then(res =>{
                            this.desks = []
                            this.getDesks()
                        })
                        .catch(error =>{
                            console.log(error);


                        })
                        .finally(()=>{
                            this.load = false
                        })
                }
            },
            addNewDesk(){
                this.$v.$touch()
                if(this.$v.$anyError){
                    return;
                }

                axios.post('/api/V1/desks',{
                    name:this.name
                })
                    .then(res =>{
                        this.name = ''
                        this.desks = []
                        this.getDesks()

                    })
                    .catch(error =>{
                        if(error.response.data.errors.name){
                            this.errors = []
                            this.errors.push(error.response.data.errors.name[0])
                        }

                        console.log(this.errors);
                    })
                    .finally(()=>{
                        this.load = false
                    })
            }
        },
        mounted(){
          this.getDesks()
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
