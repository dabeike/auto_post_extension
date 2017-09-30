<template>
    <div>
        <el-row class="title">
            <el-col :span="10">
                <b>{{options.title}}：</b>
            </el-col>
            <el-col :span="10">
                <el-button :plain="true" type="info" size="mini" @click="click_button" :loading="button_loading">
                    {{options.button}}
                </el-button>
            </el-col>
        </el-row>
        <el-row class="description">
            <div>
                <div v-if="options.description.extra && options.description.extra.length>0">

                    <Groups v-for="item in options.description.extra" :option="item"/>
                </div>

                <p>{{options.description.content}}</p>
            </div>
        </el-row>
    </div>
</template>

<script>
    import Groups from './Groups.vue'

    export default {
        name: 'post_item',
        components: {Groups},
        props: ['options'],
        data() {
            return {
                button_loading: false,
                payload_list: []
            }
        },
        methods: {
            click_button() {
                this.button_loading = true;
                $.post(host + '/api/dzw/get_payload', {
                    options: JSON.stringify(this.options)
                }, (res) => {

                    if (res.code === 200) {
                        console.log(res.data);
                        this.key = res.data.key;
                        this.post_all(res.data.payloads);
                    }
                    else {

                    }

                }, 'json');
                this.$message({
                    message: '恭喜你，这是一条成功消息',
                    type: 'success',
                    showClose: true,
                });
            },
            post_all(payloads) {
                this.payload_list = payloads;
                for (let i = 0; i < payloads.length; i++) {
                    let payload = payloads[i];
                    $.ajax({
                        type: payload.method.toUpperCase(),
                        url: '/api/dzw/get_payload',
                        data: payload.data,
                        success: this.successRes(payload),
                        error: this.errorRes(payload),
                    });
                }
            },
            successRes(payload) {
                return (data, textStatus) => {
                    console.log("success", textStatus, data);
                    payload._finish = true;
                    payload.res = {
                        status: 200,
                        data: data
                    }
                    this.check_all_finish();

                }
            },
            errorRes(payload) {
                return (jqXHR, textStatus, errorThrown) => {
                    console.log("error", jqXHR.status, jqXHR.readyState, errorThrown);
                    payload._finish = true;
                    payload.res = {
                        status: jqXHR.status,
                        readyState: jqXHR.readyState,
                        msg: errorThrown
                    }
                    this.check_all_finish();
                }
            },
            check_all_finish() {
                let finish = true;
                for (let i = 0; i < this.payload_list.length; i++) {
                    let payload = this.payload_list[i];
                    if (!payload._finish) {
                        finish = false;
                        break;
                    }
                }
                if (finish) {
                    $.post(host + '/api/dzw/deal_response', {
                        key: this.options.key,
                        payloads: JSON.stringify(this.payload_list)
                    }, (res) => {
                        if (res.code === 200) {
                        }
                        else {

                        }

                    }, 'json');
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    .el-button--info.is-plain {
        background: #fff;
        border-color: #50bfff;
        color: #50bfff;
    }

    .el-button--info.is-plain:hover {
        background: #fff;
        border-color: #47a6df;
        color: #47a6df;
    }

    .title {
        text-align: left;
    }

    .description {
        text-align: left;
        margin-top: 5px;
        margin-bottom: 10px;
        padding-left: 15px;
        padding-bottom: 5px;
        border-bottom: 1px dotted lightgrey;
    }
</style>
