<template>
    <div>
        <el-container>
            <el-header>
                <el-col span="4">
                    <h1 class="sign" @click="goToAdmin">后台管理系统</h1>
                </el-col>
                <el-col span="20">
                    <el-menu
                            style="user-select: none"
                            class="el-menu-demo"
                            mode="horizontal"
                            router>
                        <el-menu-item index="/AddMovie">
                            录入电影
                        </el-menu-item>
                        <el-menu-item index="/WorksMana">
                            管理作品
                        </el-menu-item>
                    </el-menu>
                </el-col>
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
            return {}
        },
        methods: {
            goToAdmin() {
                location.reload();
                this.$router.push("/admin")
            },
        }
    }
</script>

<style>
    .sign {
        user-select: none;
        text-align: center;
        line-height: normal;
        color: cornflowerblue;
        cursor: pointer;
    }
</style>