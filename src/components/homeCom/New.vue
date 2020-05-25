<template>
    <div>
        <el-row>
            <el-col :span="3.1" v-for="(movie, index) in NewMovie" :key="index">
                <div class="HomeMovieCard" @click="goToMovie(movie.id)">
                    <img :src="movie.image" class="HomeMovieImage" alt="电影海报"><br>
                    <span style="font-size: 13px;color: #37a">{{movie.title}} <span style="color:#e09015"> {{movie.score}}</span></span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "New",
        data() {
            return {
                NewMovie: ''
            }
        },
        mounted() {
            this.initMovie();
        },
        methods: {
            initMovie() {
                this.getRequest("/home/movie/new").then(resp => {
                    if (resp) {
                        this.NewMovie = resp;
                    }
                })
            },
            goToMovie(id) {
                this.$router.push("/movie/" + id);
            }
        }
    }
</script>

<style scoped>

</style>