<template>
    <div class="container">
        <p>
           <router-link :to="{name: 'home'}">Home</router-link>
        </p>
        <p>
            <router-link :to="{name: 'about'}">About</router-link>
        </p>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>

</style>