<template>
    <div>
        <el-container>
            <el-header style="background: #f8f8f8">
                <div>
                    <el-button style="height: 60px;float: left;background: #3db04d;color: white" @click="back">返回
                    </el-button>
                    <h3 class="mydb">我的豆瓣<span style="color: darkgray">·写评论</span></h3>
                    <el-button style="float: right;height: 60px;background: #3db04d;color: white"
                               @click="commitComment">提交
                    </el-button>
                </div>
            </el-header>
            <el-main>
                <el-card class="longCard" :body-style="{ padding: '0px' }">
                    <el-col :span="6">
                        <img :src="movie.image" class="longImage" alt="电影海报">
                    </el-col>
                    <div style="padding: 14px;">
                        <span>{{movie.title}}</span>
                        <time class="time">({{movie.year}})</time>
                    </div>
                    <span style="font-size: 12px">给个评价吧:</span>
                    <el-rate
                            style="margin-top: 10px"
                            v-model="comment.myScore"
                            show-text>
                    </el-rate>
                </el-card>
                <div class="comTitle">
                    <el-input
                            type="textarea"
                            autosize
                            placeholder="添加标题"
                            v-model="comment.commentTitle">
                    </el-input>
                </div>
                <div id="main" class="markdown">
                    <mavon-editor v-model="comment.content"/>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "writeComment",
        data() {
            return {
                movie: {},
                comment: {
                    mid: '',
                    commentTitle: '',
                    content: '',
                    myScore: 0,
                },
            }
        },
        mounted() {
            this.comment.mid = this.$route.params.id;
            this.initMovie(this.comment.mid);
            this.initComment(this.comment.mid);
        },
        methods: {
            initMovie(id) {
                this.getRequest("/admin/movie/" + id).then(resp => {
                    if (resp) {
                        this.movie = resp;
                    }
                })
            },
            initComment(id) {
                this.getRequest("/home/comment/" + id).then(resp => {
                    if (resp) {
                        this.comment = resp;
                    }
                })
            },
            back() {
                this.$router.replace("/WorksMana");
            },
            commitComment() {
                this.postRequest("/admin/comment/", this.comment).then(resp => {
                    if (resp) {
                        this.$router.replace("/WorksMana");
                    }
                })
            }
        }
    }
</script>

<style>
    .mydb {
        text-align: center;
        color: cornflowerblue;
        float: left;
        width: 1350px;
    }

    .longCard {
        width: 800px;
        height: 150px;
        margin: auto;
    }

    .longImage {
        height: 150px;
    }

    .markdown {
        margin-top: 30px;
    }

    .comTitle {
        width: 800px;
        margin: 30px auto;
    }
</style>