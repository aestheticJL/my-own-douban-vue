<template>
    <div>
        <el-container>
            <el-header class="nav">
                <h1 class="myMovie" @click="goToMovie">我的豆瓣电影</h1>
                <el-input class="inputId" placeholder="请输入作品Id" v-model="newId">
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
                                <el-image :src="newWorks.image" class="worksImg"/>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light information">
                            <span class="p1" v-if="directorsStr">导演: </span>{{directorsStr}}<br>
                            <span class="p1" v-if="writerName">编剧: </span>{{writerName}}<br>
                            <span class="p1" v-if="newWorks.languages">语言: </span>{{newWorks.languages}}<br>
                            <span class="p1" v-if="newWorks.pubdates">上映日期: </span>{{newWorks.pubdates}}<br>
                            <span class="p1" v-if="newWorks.durations">片长: </span>{{newWorks.durations}}<br>
                            <span class="p1" v-if="genresStr">类型: </span>{{genresStr}}<br>
                            <span class="p1" v-if="castsStr">演员: </span>{{castsStr}}<br>
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
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "addMovie",
        data() {
            return {
                newId: '',
                isShow: false,
                getInf: [],
                newWorks: [
                    {
                        title: '',
                        year: '',
                        image: '',
                        score: '',
                        directors: '',
                        languages: '',
                        writer: [],
                        pubdates: '',
                        tags: [],
                        durations: '',
                        genres: [],
                        casts: [],
                        countries: '',
                    }
                ],
                directorsStr: '',
                writerName: '',
                genresStr: '',
                castsStr: '',
            }
        },
        methods: {
            goToMovie() {
                this.$router.replace('/home');
            },
            getInformation() {
                this.newWorks = [];
                this.writerName = '';
                this.genresStr = '';
                this.castsStr = '';
                this.getRequest("/testGetApi/" + this.newId).then(resp => {
                    if (resp) {
                        this.getInf = resp;
                        let thisWorks = this.newWorks;
                        let getWorks = this.getInf;
                        thisWorks.title = getWorks.original_title;
                        thisWorks.year = getWorks.year;
                        thisWorks.image = getWorks.images.small;
                        thisWorks.score = getWorks.rating.average;
                        thisWorks.languages = getWorks.languages[0];

                        thisWorks.writers = getWorks.writers;
                        if (getWorks.writers) {
                            getWorks.writers.forEach(w => {
                                this.writerName += w.name + "/";
                            });
                            this.writerName = this.writerName.substring(0, this.writerName.length - 1);
                        }
                        thisWorks.pubdates = getWorks.pubdates[0];
                        thisWorks.tags = getWorks.tags;
                        thisWorks.durations = getWorks.durations[0];
                        thisWorks.genres = getWorks.genres;
                        if (getWorks.genres) {
                            getWorks.genres.forEach(g => {
                                this.genresStr += g + "/";
                            });
                            this.genresStr = this.genresStr.substring(0, this.genresStr.length - 1);
                        }
                        thisWorks.casts = getWorks.casts;
                        if (getWorks.casts) {
                            getWorks.casts.forEach(c => {
                                this.castsStr += c.name + "/";
                            });
                            this.castsStr = this.castsStr.substring(0, this.castsStr.length - 1);
                        }
                        thisWorks.countries = getWorks.countries[0];

                        thisWorks.directors = getWorks.directors;
                        if (getWorks.directors) {
                            getWorks.directors.forEach(c => {
                                this.directorsStr += c.name + "/";
                            });
                            this.directorsStr = this.directorsStr.substring(0, this.directorsStr.length - 1);
                        }

                        this.isShow = true;
                    }
                })
            }
        }

    }
</script>

<style>
    .nav {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        width: 60%;
    }

    .myMovie {
        color: cornflowerblue;
        width: 200px;
    }

    .inputId {
        margin-top: 22px;
        width: 600px;
    }

    .InfBox {
        margin: 0 auto;
        display: flex;
        justify-content: center;
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
    .information{
        font-size: 13px;
    }
    .information span{
        font-size: 16px;
        color: darkgray;
    }
    .score{
        margin-left: 20px;
    }
</style>