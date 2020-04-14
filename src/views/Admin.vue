<template>
    <div>
        <el-container>
            <el-header>
                <el-menu
                        class="el-menu-demo"
                        mode="horizontal"
                        router>
                    <el-menu-item index="/Admin" style="margin-right: 100px">
                        <h1 class="sign">后台管理系统</h1>
                    </el-menu-item>
                    <el-menu-item index="/AddMovie">
                        录入电影
                    </el-menu-item>
                    <el-menu-item index="/WorksMana">
                        管理作品
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
            }
        },
    }
</script>

<style>
    .sign {
        text-align: center;
        line-height: normal;
        color: #b9d8ff;
    }
</style>