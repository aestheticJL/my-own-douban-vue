<template>
    <div>
        <el-row>
            <el-col :span="3.1" v-for="(movie, index) in chineseMovie" :key="index">
                <div class="HomeMovieCard" @click="goToMovie(movie.id)">
                    <img :src="movie.image" class="HomeMovieImage" alt="电影海报"><br>
                    <span style="font-size: 13px;color: #37a">{{movie.title}} <span style="color:#e09015"> {{movie.score}}</span></span>
                </div>
            </el-col>
        </el-row>
        <span class="more">更多>></span>
    </div>
</template>

<script>
    export default {
        name: "Chinese",
        data() {
            return {
                chineseMovie: ''
            }
        },
        mounted() {
            this.initMovie();
        },
        methods: {
            initMovie() {
                this.getRequest("/home/movie/中国").then(resp => {
                    if (resp) {
                        this.chineseMovie = resp;
                    }
                })
            },
            goToMovie(id) {
                this.$router.push("/movie/" + id);
            }
        }
    }
</script>

<style>
    .more {
        float: right;
        font-size: 13px;
        color: #37a;
    }
    .HomeMovieCard {
        width: 115px;
        height: 240px;
        margin-right: 30px;
        cursor: pointer;
    }

    .HomeMovieImage {
        width: 115px;
        height: 164px;
    }
</style>