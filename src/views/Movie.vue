<template>
    <div>
        <el-container>
            <el-header style="background: #f0f3f5;height: auto">
                <div class="homeNav">
                    <h1 class="myMovie" @click="goToHome">豆瓣电影</h1>
                    <el-input class="HomeInput" placeholder="搜索电影、电视剧、综艺、影人" v-model="searchInput"
                              @keydown.enter.native="getInformation">
                        <el-button slot="append" icon="el-icon-search" @click="getInformation"/>
                    </el-input>
                </div>
            </el-header>
            <el-main class="MovieBox">
                <div>
                    <div>
                        <h1 class="worksTitle">
                            <span>{{movie.title}}</span>
                            <span class="year">({{movie.year}})</span>
                        </h1>
                    </div>
                    <el-row>
                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <div>
                                    <img :src="movie.image" class="worksImg" alt="电影海报">
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light information">
                                <span class="p1" v-if="directorsStr">导演: </span>{{directorsStr}}<br>
                                <span class="p1" v-if="writerStr">编剧: </span>{{writerStr}}<br>
                                <span class="p1" v-if="movie.language">语言: </span>{{movie.language}}<br>
                                <span class="p1" v-if="movie.pubDate">上映日期: </span>{{movie.pubDate}}<br>
                                <span class="p1" v-if="movie.duration">片长: </span>{{movie.duration}}<br>
                                <span class="p1" v-if="actorStr">演员: </span>{{actorStr}}<br>
                                <span class="p1" v-if="movie.countries">制片国家/地区: </span>{{movie.countries}}<br>
                            </div>
                        </el-col>
                        <el-divider direction="vertical"/>
                        <el-col :span="11">
                            <div class="grid-content bg-purple score">
                                <h3>豆瓣评分</h3>
                                <el-rate
                                        :max="10"
                                        v-model="movie.score"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="{value}/10">
                                </el-rate>
                            </div>
                            <div class="grid-content bg-purple score">
                                <h3>我的评分</h3>
                                <el-rate
                                        v-model="comment.myScore"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="{value}/5">
                                </el-rate>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <h2 style="color: #007722;font:16px Arial, Helvetica, sans-serif;">{{movie.title}}的剧情简介· · · · ·
                        ·</h2>
                    正在考虑是否加入
                    <h2 style="color: #007722;font:16px Arial, Helvetica, sans-serif;">{{movie.title}}的演职表· · · · ·
                        ·</h2>
                    <el-row>
                        <el-col :span="3.1" v-for="(CAC, index) in CastAndCrew" :key="index">
                            <div class="CACCard">
                                <img :src="CAC.image" class="CACImage" alt="电影海报"><br>
                                <span style="font-size: 13px;color: #37a">{{CAC.name}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <h2 style="color: #007722;font:16px Arial, Helvetica, sans-serif;">{{movie.title}}的评论· · · · · ·</h2>
                    {{comment.commentTitle}}
                    <div v-text="comment.content"></div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Movie",
        data() {
            return {
                searchInput: '',
                movie: {},
                CastAndCrew: [],
                actorStr: '',
                directorsStr: '',
                writerStr: '',
                comment: {},
            }
        },
        mounted() {
            this.initMovie(this.$route.params.id);
            this.initComment(this.$route.params.id);
        },
        methods: {
            initMovie(id) {
                this.getRequest("/home/movie/id/" + id).then(resp => {
                    if (resp) {
                        this.movie = resp;
                        if (this.movie.directors) {
                            let flag = 0;
                            this.movie.directors.forEach(d => {
                                this.directorsStr += d.name + "/";
                                if (flag !== 2) {
                                    this.CastAndCrew.push({
                                        name: d.name,
                                        image: d.image,
                                    });
                                    flag++;
                                }
                            })
                        }
                        if (this.movie.writers) {
                            let flag = 0;
                            this.movie.writers.forEach(w => {
                                this.writerStr += w.name + "/";
                                if (flag !== 2) {
                                    this.CastAndCrew.push({
                                        name: w.name,
                                        image: w.image,
                                    });
                                    flag++;
                                }
                            })
                        }
                        if (this.movie.actors) {
                            let flag = 0;
                            this.movie.actors.forEach(a => {
                                this.actorStr += a.name + "/";
                                if (flag !== 2) {
                                    this.CastAndCrew.push({
                                        name: a.name,
                                        image: a.image,
                                    });
                                    flag++;
                                }
                            })
                        }
                        this.CastAndCrew = this.unique(this.CastAndCrew);
                    }
                });
            },
            goToHome() {
                this.$router.replace("/Home")
            },
            unique(arr) { // 根据唯一标识no来对数组进行过滤
                const res = new Map();  //定义常量 res,值为一个Map对象实例
                //返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
                console.log(arr);
                return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1))
            },
            initComment(id) {
                this.getRequest("/home/comment/" + id).then(resp => {
                    if (resp) {
                        this.comment = resp;
                    }
                })
            },
            getInformation() {

            }
        },
    }
</script>

<style>
    .MovieBox {
        margin: 20px auto;
        width: 50%;
    }

    .CACCard {
        width: 115px;
        height: 160px;
        margin-right: 5px;
        /*cursor: pointer;*/
    }

    .CACImage {
        width: 95px;
        height: 133px;
    }
</style>