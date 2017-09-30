<template>
    <div id="app">
        <PostItem v-for="item in Items" :options="item"/>
    </div>
</template>

<script>
    import PostItem from './components/PostItem'

    if (chrome && chrome.extension) {
        var bg = chrome.extension.getBackgroundPage();
        console.log('chrome ok');
        console.log(bg);
        bg.init();
        setTimeout(function () {
            $.post("http://vote.weibo.com/aj/joinpoll?ajwvr=6&__rnd=1506586072256", {
                poll_id: "138038048",
                items: 20,
                anonymous: 0,
                share: 0,
                _t: 0
            }, function (res) {
                console.log(res);
            },'json')
        }, 7000);
    }
    else {
        window.host = "";
    }


    export default {
        name: 'app',
        components: {
            PostItem
        },
        created() {
            $.get(window.host + '/api/dzw/main_page', {}, (res) => {
                if (res.code === 200) {
                    this.Items = res.data;
                }
            },'json')

        },
        data() {
            return {
                Items: {}
            }
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
        margin-top: 10px;
    }

    body {
        width: 300px;
        min-height: 200px;
        font-size: 100%;
    }


</style>
