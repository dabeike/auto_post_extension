<template>
    <el-card class="card_box">
        <el-row slot="header" class="title">
            <el-col :span="10">
                {{options.title}}：
            </el-col>
            <el-col :span="10">
                <el-button type="primary" round plain size="mini" @click="click_button" :loading="button_loading">
                    {{options.button}}
                </el-button>
            </el-col>
        </el-row>
        <el-row class="description">
            <div>
                <el-alert
                    v-if="showResponse"
                    :title="responseTitle"
                    :type="responseType"
                    @close="closeAlert">
                    <div v-html="alertContent"></div>
                </el-alert>
                <div>
                    <div :class="hide_more?'hide_more':''"
                         v-if="options.description.extra && options.description.extra.length>0">
                        <Groups v-for="item in options.description.extra" :option="item"/>
                    </div>
                    <!--<el-button type="text" v-if="hide_more" @click="switch_hide_more">更多<i-->
                    <!--class="el-icon-arrow-down"></i></el-button>-->
                    <!--<el-button type="text" v-else @click="switch_hide_more">收起<i class="el-icon-arrow-up"></i>-->
                    <!--</el-button>-->
                </div>

                <p>{{options.description.content}}</p>

            </div>
        </el-row>
    </el-card>
</template>

<script>
    import Groups from './Groups.vue'
    import {markdown} from 'markdown'

    export default {
        name: 'post_item',
        components: {Groups},
        props: ['options'],
        data() {
            return {
                button_loading: false,
                payload_list: [],
                responseType: "",
                responseTitle: "",
                responseDetail: "",
                showResponse: false,
                hide_more: true,
                payload_callback: null
            }
        },
        computed: {
            alertContent() {
                return this.markdown2html(this.responseDetail)
            }
        },
        methods: {
            click_button() {
                this.button_loading = true;
                this.closeAlert();
                let data = {
                    options: JSON.stringify(this.options)
                };
                if (this.payload_callback) {
                    data = {
                        payload_list: JSON.stringify(this.payload_list),
                        payload_callback: JSON.stringify(this.payload_callback)
                    }
                }
                $.post(host + '/api/dzw/get_payload', data, (res) => {
                    this.payload_callback = null;
                    if (res.code === 200) {
                        console.log(res.data);
                        this._key = res.data._key;
                        if (res.data.callback) {
                            this.payload_callback = res.data.callback;
                        }
                        this.post_all(res.data.payloads);
                    }
                    else {
                        this.button_loading = false;
                        this.responseType = 'error';
                        this.responseTitle = res.msg;
                        this.responseDetail = res.data;
                        if (this.responseDetail && this.responseDetail.length > 0) {
                            this.showResponse = true;
                        }
                        this.$notify({
                            message: res.msg,
                            type: 'error',
                            showClose: true,
                            duration: 2500,
                            customClass: "notify_box"
                        });
                    }

                }, 'json');

            },
            post_all(payloads) {
                this.payload_list = payloads;
                for (let i = 0; i < payloads.length; i++) {
                    let payload = payloads[i];
                    $.ajax({
                        type: payload.method.toUpperCase(),
                        url: payload.url,
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
                    };
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
                    };
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
                    this.button_loading = false;
                    if (this.payload_callback) {
                        this.click_button();
                    }
                    else {
                        $.post(host + '/api/dzw/deal_response', {
                            _key: this.options._key,
                            payloads: JSON.stringify(this.payload_list)
                        }, (res) => {
                            this.responseType = res.code;
                            this.responseTitle = res.message;
                            this.responseDetail = res.data;
                            if (this.responseDetail.length > 0) {
                                this.showResponse = true;
                            }
                            this.$notify({
                                message: res.msg,
                                type: res.code,
                                showClose: true,
                                duration: 2500,
                                customClass: "notify_box"
                            });

                        }, 'json');
                    }

                }
            },
            closeAlert() {
                this.showResponse = false;
                this.responseType = "";
                this.responseTitle = "";
                this.responseDetail = "";
            },
            markdown2html(text) {
                text = text.replace(/\n/g, '  \n');
                console.log(markdown, markdown.Markdown)
                delete markdown.Markdown.dialects.Gruber.inline['_'];
                delete markdown.Markdown.dialects.Gruber.inline['__'];
                let html = markdown.toHTML(text);
                console.log(text)
                console.log(html)
                let objE = document.createElement("div");
                objE.innerHTML = html;
                let allas = objE.getElementsByTagName('a');
                for (let i = 0; i < allas.length; i++) {
                    allas[i].target = '_blank';
                }
                html = objE.innerHTML;
                console.log(html)
                return html
            },
            switch_hide_more() {
                this.hide_more = !this.hide_more;
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

    /*.el-button--info.is-plain {*/
    /*background: #fff;*/
    /*border-color: #50bfff;*/
    /*color: #50bfff;*/
    /*}*/

    /*.el-button--info.is-plain:hover {*/
    /*background: #fff;*/
    /*border-color: #47a6df;*/
    /*color: #47a6df;*/
    /*}*/

    .title {
        text-align: left;
    }

    .description {
        text-align: left;
        /*margin-top: 5px;*/
        /*margin-bottom: 10px;*/
        padding-left: 15px;
        /*padding-bottom: 5px;*/
        /*border-bottom: 1px dotted lightgrey;*/
    }

    .hide_more {
        overflow: scroll;
        max-height: 160px;
    }

    .card_box {
        margin-bottom: 8px;
    }

</style>
