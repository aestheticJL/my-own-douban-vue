<template>
    <div>
        <el-container>
            <el-header>
                <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal">
                    <el-menu-item>
                        <h1 class="sign">后台管理系统</h1>
                    </el-menu-item>
                    <el-menu-item index="1">
                        <router-link to="/AddMovie">
                            录入电影
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/WorksMana">
                            管理作品
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link to="/WriteComment">
                            编写评论
                        </router-link>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                activeIndex: '1'
            }
        }
    }
</script>

<style>
    .sign {
        text-align: center;
        line-height: normal;
        color: #b9d8ff;
        margin-right: 50px;
    }
</style>