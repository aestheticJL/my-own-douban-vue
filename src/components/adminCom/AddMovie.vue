<template>
    <div>
        <el-container>
            <el-header class="nav">
                <h1 class="myMovie" @click="goToMovie">搜索豆瓣电影</h1>
                <el-input class="inputId" placeholder="请输入作品Id" v-model="newId" @keydown.enter.native="getInformation">
                    <el-button slot="append" icon="el-icon-search" @click="getInformation"/>
                </el-input>
            </el-header>
            <el-main v-if="isShow" class="InfBox">
                <div>
                    <h1 class="worksTitle">
                        <span>{{newWorks.title}}</span>
                        <span class="year">({{newWorks.year}})</span>
                    </h1>
                </div>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <div>
                                <img :src="newWorks.image" class="worksImg" alt="电影海报">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light information">
                            <span class="p1" v-if="directorsStr">导演: </span>{{directorsStr}}<br>
                            <span class="p1" v-if="writerStr">编剧: </span>{{writerStr}}<br>
                            <span class="p1" v-if="newWorks.language">语言: </span>{{newWorks.language}}<br>
                            <span class="p1" v-if="newWorks.pubDate">上映日期: </span>{{newWorks.pubDate}}<br>
                            <span class="p1" v-if="newWorks.duration">片长: </span>{{newWorks.duration}}<br>
                            <span class="p1" v-if="actorStr">演员: </span>{{actorStr}}<br>
                            <span class="p1" v-if="newWorks.countries">制片国家/地区: </span>{{newWorks.countries}}<br>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple score">
                            <h3>豆瓣评分</h3>
                            <el-rate
                                    :max="10"
                                    v-model="newWorks.score"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}">
                            </el-rate>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <div class="buttonGroup" v-if="isShow">
                <el-button type="primary" size="big" @click="addMovieInf">录入该影片</el-button>
            </div>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "AddMovie",
        data() {
            return {
                newId: '',
                isShow: false,
                getInf: {},
                newWorks: {
                    id: '',
                    title: '',
                    year: '',
                    image: '',
                    score: 0,
                    language: '',
                    pubDate: '',
                    duration: '',
                    countries: '',
                    directors: [],
                    writers: [],
                    actors: [],
                },
                directorsStr: '',
                writerStr: '',
                actorStr: '',
            }
        },
        methods: {
            goToMovie() {
                this.$router.replace('/home');
            },
            getInformation() {
                this.isShow = false;
                this.newWorks = {};
                this.directorsStr = '';
                this.writerStr = '';
                this.actorStr = '';
                this.getRequest("/testGetApi/" + this.newId).then(resp => {
                    if (resp) {
                        this.getInf = resp;
                        this.newWorks.directors = [];
                        this.newWorks.writers = [];
                        this.newWorks.actors = [];
                        let thisWorks = this.newWorks;
                        let getWorks = this.getInf;
                        thisWorks.id = this.newId;
                        thisWorks.title = getWorks.original_title;
                        thisWorks.year = getWorks.year;
                        thisWorks.image = getWorks.images.small;
                        thisWorks.score = getWorks.rating.average;
                        thisWorks.language = getWorks.languages[0];
                        thisWorks.pubDate = getWorks.pubdates[0];
                        thisWorks.duration = getWorks.durations[0];
                        thisWorks.countries = getWorks.countries[0];

                        if (getWorks.writers) {
                            getWorks.writers.forEach((w, index) => {
                                thisWorks.writers.push({
                                    id: '',
                                    image: '',
                                    name: '',
                                });
                                thisWorks.writers[index].id = w.id;
                                thisWorks.writers[index].image = w.avatars.small;
                                thisWorks.writers[index].name = w.name;
                                this.writerStr += w.name + "/";
                            });
                            this.writerStr = this.writerStr.substring(0, this.writerStr.length - 1);
                        }

                        if (getWorks.casts) {
                            getWorks.casts.forEach((c, index) => {
                                thisWorks.actors.push({
                                    id: '',
                                    image: '',
                                    name: '',
                                });
                                thisWorks.actors[index].id = c.id;
                                thisWorks.actors[index].image = c.avatars.small;
                                thisWorks.actors[index].name = c.name;
                                this.actorStr += c.name + "/";
                            });
                            this.actorStr = this.actorStr.substring(0, this.actorStr.length - 1);
                        }

                        if (getWorks.directors) {
                            getWorks.directors.forEach((d, index) => {
                                thisWorks.directors.push({
                                    id: '',
                                    image: '',
                                    name: '',
                                });
                                thisWorks.directors[index].id = d.id;
                                thisWorks.directors[index].image = d.avatars.small;
                                thisWorks.directors[index].name = d.name;
                                this.directorsStr += d.name + "/";
                            });
                            this.directorsStr = this.directorsStr.substring(0, this.directorsStr.length - 1);
                        }

                        this.isShow = true;
                    }
                })
            },
            addMovieInf() {
                console.log(this.newWorks);
                this.postRequest("/admin/movie/", this.newWorks).then(resp => {
                    console.log(resp);
                    if (resp) {
                        this.isShow = false;
                        this.newWorks = [];
                        this.directorsStr = '';
                        this.writerStr = '';
                        this.actorStr = '';
                    }
                })
            },
        }

    }
</script>

<style>
    .nav {
        margin: auto;
        display: flex;
        justify-content: center;
        width: 60%;
    }

    .myMovie {
        margin: 20px auto;
        color: cornflowerblue;
        width: 200px;
        cursor:pointer;
    }

    .inputId {
        margin: 20px auto;
        width: 600px;
    }

    .InfBox {
        background: #e0e3e5;
        margin: 20px auto;
        width: 70%;
    }

    .worksTitle {
        word-wrap: break-word;
        display: block;
        font-size: 26px;
        font-weight: bold;
        color: #494949;
        margin: 0;
        padding: 0 0 15px 0;
        line-height: 1.1;
    }

    .year {
        color: darkgray;
    }

    .worksImg {
        display: flex;
        justify-content: center;
        width: 135px;
    }

    .information {
        font-size: 13px;
    }

    .information span {
        font-size: 16px;
        color: darkgray;
    }

    .score {
        margin-left: 20px;
    }

    .buttonGroup {
        margin: 20px auto;
    }
</style>