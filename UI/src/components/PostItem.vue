<template>
    <div>
        <el-row>
            <el-col :span="12">
                <b>{{options.title}}</b>：
            </el-col>
            <el-col :span="12">
                <el-button :plain="true" type="info" size="mini">{{options.button}}</el-button>
            </el-col>
        </el-row>
        <el-row class="description">
            <div>

                <p>{{options.description.content}}</p>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                options: {
                    "title": "微博投票",
                    "button": "投票 * 3",
                    "description": {
                        "content": "贴吧自动签到",
                        "extra": [
                            {
                                "type": "checkbox",
                                "order": "-",
                                "group": [
                                    {
                                        "title": "分享",
                                        "href": null
                                    },
                                    {
                                        "title": "匿名",
                                        "href": null
                                    }
                                ]
                            },
                            {
                                "type": "checkbox",
                                "order": "|",
                                "group": [
                                    {
                                        "title": "最佳男歌手1",
                                        "href": null
                                    },
                                    {
                                        "title": "最佳男歌手2",
                                        "href": "http://baidu.com"
                                    }
                                ]
                            },
                            {
                                "type": "radio",
                                "order": "-",
                                "group": [
                                    {
                                        "title": "最佳男歌手",
                                        "href": null
                                    },
                                    {
                                        "title": "最佳女歌手",
                                        "href": "http://baidu.com"
                                    }
                                ]
                            }
                        ]
                    }
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

    .description {
        text-align: left;
        margin-top: 5px;
        padding-left: 15px;
        padding-bottom: 5px;
        border-bottom: 1px dotted lightgrey;
    }
</style>
