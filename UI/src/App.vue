<template>
    <div id="app">
        <PostItem/>
    </div>
</template>

<script>
    import PostItem from './components/PostItem'

    export default {
        name: 'app',
        components: {
            PostItem
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
