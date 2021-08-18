<template>
    <div class="container">
        <h1>Доски</h1>
        <div class="row">
            <div class="col-lg-3" v-for="desk in desks">
                <div class="card mt-4">
                    <a class="card-body" href="#">
                        <h5 class="card-title">{{desk.name}}</h5>
                    </a>
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
        mounted(){
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
