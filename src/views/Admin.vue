<template>
    <div>
        <el-container>
            <el-header>
                <el-col :span="4">
                    <h1 class="sign" @click="goToAdmin">后台管理系统</h1>
                </el-col>
                <el-col :span="18">
                    <el-menu
                            style="user-select: none"
                            class="el-menu-demo"
                            mode="horizontal"
                            router>
                        <el-menu-item index="/admin/AddMovie">
                            录入电影
                        </el-menu-item>
                        <el-menu-item index="/admin/WorksMana">
                            管理作品
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="2">
                    <el-dropdown @command="commandHandle">
                        <el-button type="primary" class="el-dropdown-link" style="height: 61px;">
                            <span style="font-size: 15px;position: relative;bottom: 23px">{{user.username}}</span>
                            <img :src="user.userface" alt="" class="face">
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="backToHome">返回首页</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        methods: {
            goToAdmin() {
                location.reload();
                this.$router.push("/admin")
            },
            commandHandle(cmd) {
                if (cmd === 'logout') {
                    this.$confirm('此操作将注销用户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("logout");
                        window.sessionStorage.removeItem("user");
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if (cmd === 'backToHome'){
                    this.$router.replace('/');
                }
            }
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

    .face {
        width: 46px;
        height: 46px;
        border-radius: 23px;
        margin-left: 10px;
        margin-bottom: 5px;
    }
</style>