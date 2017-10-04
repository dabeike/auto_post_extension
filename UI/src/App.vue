<template>
    <div id="app">
        <div>
            <el-card class="call_all_box">
                <el-button v-if="!autoCall" type="success" round size="mini" @click="call_all">一键打 Call</el-button>
                <el-switch :style="autoCall?'':'float:right'"
                           :on-text="autoCall?'启动时自动打 call':'手动打'"
                           v-model="autoCall">
                </el-switch>
            </el-card>
            <PostItem ref="posts" v-for="item in Items" :options="item"/>
        </div>
    </div>
</template>

<script>
    import PostItem from './components/PostItem'

    if (chrome && chrome.extension) {
        var bg = chrome.extension.getBackgroundPage();
        console.log('chrome mode');
        bg.init();
    }
    else {
        console.log("dev mode")
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
                    if (this.autoCall) {
                        setTimeout(this.call_all, 1000);
                    }
                }
            }, 'json')


        },
        data() {

            return {
                Items: {},
                autoCall: localStorage.autoCall == 1 ? true : false
            }
        },
        methods: {
            call_all() {
//                console.log(this.$children)
                console.log(this.$refs)
                let posts = this.$refs.posts;
                for (let post of posts) {
                    console.log(post)
                    post.click_button();
                }
            }
        },
        watch: {
            autoCall(val) {
                localStorage.autoCall = val ? 1 : 0;
                console.log(localStorage.autoCall)
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
    }

    body {
        width: 300px;
        min-height: 500px;
        font-size: 100%;
    }

    html, body {
        max-height: 600px;
        overflow: scroll;
    }

    .el-notification {
        width: 50% !important;
        height: 48px !important;
        padding: 12px !important;
    }

    .el-notification__icon {
        font-size: 20px !important;
        width: 28px !important;
    }

    .el-notification__group.is-with-icon {
        margin-left: 0 !important;
    }

    .el-notification__content {
        margin: 0 !important;
    }

    .el-notification__closeBtn {
        top: 2px !important;
        right: 2px !important;
    }

    .el-card__body {
        padding: 10px !important;
    }

    .el-card__header {
        padding: 8px 20px !important;
    }

    .el-button--mini {
        padding: 4px 15px !important;
    }

    .call_all_box {
        text-align: left;
        margin-bottom: 8px;
        min-height: 45px;
    }
</style>
