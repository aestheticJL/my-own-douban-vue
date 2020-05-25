<template>
    <div>
        <el-row>
            <el-col :span="3.1" v-for="(movie, index) in OtherMovie" :key="index">
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
        name: "Others",
        data() {
            return {
                OtherMovie: ''
            }
        },
        mounted() {
            this.initMovie();
        },
        methods: {
            initMovie() {
                this.getRequest("/home/movie/其他").then(resp => {
                    if (resp) {
                        this.OtherMovie = resp;
                    }
                })
            },
            goToMovie(id){
                this.$router.push("/movie/" + id);
            }
        }
    }
</script>

<style scoped>

</style>