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
            <el-main class="HomeBox">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="最近更新" name="New"><New/></el-tab-pane>
                    <el-tab-pane label="豆瓣高分" name="HighScore"><HighScore/></el-tab-pane>
                    <el-tab-pane label="近期推荐" name="MyHighScore"><MyHighScore/></el-tab-pane>
                    <el-tab-pane label="华语" name="Chinese"><Chinese/></el-tab-pane>
                    <el-tab-pane label="日本" name="Japanese"><Japanese/></el-tab-pane>
                    <el-tab-pane label="韩国" name="Korean"><Korean/></el-tab-pane>
                    <el-tab-pane label="其他" name="Others"><Others/></el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Chinese from "../components/homeCom/Chinese";
    import HighScore from "../components/homeCom/HighScore";
    import Japanese from "../components/homeCom/Japanese";
    import Korean from "../components/homeCom/Korean";
    import MyHighScore from "../components/homeCom/MyHighScore";
    import New from "../components/homeCom/New";
    import Others from "../components/homeCom/Others";
    export default {
        name: 'Home',
        data() {
            return {
                searchInput: '',
                activeName:'New'
            }
        },
        components:{
            Chinese,
            HighScore,
            Japanese,
            Korean,
            MyHighScore,
            New,
            Others,
        },
        methods: {
            getInformation() {

            },
            goToHome(){
                if (this.$route.path === "/"){
                    location.reload();
                }
                this.$router.push("/")
            },
        }
    }
</script>
<style>
    .homeNav {
        margin: auto;
        display: flex;
        justify-content: center;
        width: 40%;
    }

    .HomeInput {
        margin: auto;
    }

    .HomeBox {
        user-select: none;
        margin: auto;
        width: 765px;
    }
</style>
