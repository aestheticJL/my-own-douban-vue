<template>
    <div>
        <el-container>
            <el-header style="background: #f8f8f8">
                <div>
                    <el-button style="height: 60px;float: left;background: #3db04d;color: white" @click="back">返回
                    </el-button>
                    <h3 class="mydb">我的豆瓣<span style="color: darkgray">·写评论</span></h3>
                    <el-button style="float: right;height: 60px;background: #3db04d;color: white">提交</el-button>
                </div>
            </el-header>
            <el-main>
                <el-card class="longCard" :body-style="{ padding: '0px' }">
                    <el-col :span="6">
                        <img :src="movie.image" class="longImage" alt="电影海报">
                    </el-col>
                    <div style="padding: 14px;">
                        <span>{{movie.title}}</span>
                        <div>
                            <time class="time">({{movie.year}})</time>
                        </div>
                    </div>
                </el-card>
                <div id="main" class="markdown">
                    <mavon-editor v-model="comment"/>
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
                movie: '',
                comment: '',
            }
        },
        mounted() {
            this.initMovie(this.$route.params.id);
        },
        methods: {
            initMovie(id) {
                this.getRequest("/admin/movie/" + id).then(resp => {
                    if (resp) {
                        this.movie = resp;
                    }
                })
            },
            back() {
                this.$router.go(-1);
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
</style>