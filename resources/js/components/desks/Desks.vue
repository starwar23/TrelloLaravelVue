<template>
    <div class="container">
        <h1>Доски</h1>
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
    export default {
        data(){
            return{
                desks:[],
                load:true
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


            }
        },
        mounted(){
          this.getDesks()
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
