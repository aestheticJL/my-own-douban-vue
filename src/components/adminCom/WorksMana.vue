<template>
    <div>
        <el-row>
            <el-col :span="3.1" v-for="(movie, index) in movies" :key="index">
                <el-card shadow="hover" class="movieCard">
                    <img :src="movie.image" class="image" alt="电影海报">
                    <div style="padding: 14px;">
                        <span>{{movie.title}}</span>
                        <div>
                            <time class="time">{{movie.name}}</time>
                        </div>
                    </div>
                    <div style="position:absolute;padding: 14px;bottom: 10px">
                        <el-button type="primary" size="mini">新增评论</el-button>
                        <el-button type="danger" size="mini" style="margin-left: 22px">删除影片</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "WorksMana",
        data() {
            return {
                movies: [],
            }
        },
        mounted() {
            this.initMovie();
        },
        methods: {
            initMovie() {
                this.getRequest("/admin/movieMana/").then(resp => {
                    if (resp) {
                        this.movies = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .movieCard {
        width: 250px;
        height: 470px;
        margin-right: 10px;
    }

    .image {
        width: 210px;
        height: 290px;
        display: block;
    }

</style>