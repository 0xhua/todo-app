<template>
    <div class="todoListContainer">
        <div class="mainContainer">
            <div class="heading">
                <h2 id="title">Register</h2>
            </div>
            <form>
                <div class="login-form">
                    <div class="inputbox">
                        <div>
                            <input
                                id="email"
                                type="email"
                                class="form-control"
                                v-model="email"
                                required
                                autofocus
                                autocomplete="off"
                                placeholder="Email"
                                @click="clearError"
                                :class="[flag.email ? 'flag' : '']"
                            />
                        </div>
                                                <div>
                            <input
                                id="password"
                                type="password"
                                class="form-control"
                                v-model="password"
                                required
                                autocomplete="off"
                                placeholder="Password"
                                @click="clearError"
                                :class="[flag.password ? 'flag' : '']"
                            />
                        </div>
                    </div>
                        <div class="errorBox">
                            <span class="error" v-if="error !== null">{{ error }}</span>
                    </div>



                </div>
            </form>
            <div>
                <router-link to="/" class="btnReg">Login Here!</router-link>
            </div>
            <div>                            <font-awesome-icon
                                type="submit"
                                icon="sign-in-alt"
                                @click="handleSubmit"
                                size="3x"
                                F
                                class="button"
                            /></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            error: null,
            flag:{
                email: "",
                password: ""
            }
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            if(this.email == ""){
                this.flag.email = true;
                this.error = "Please fill out the highlighted field/s"
            }
            if (this.password.length > 0) {
                axios.get("/sanctum/csrf-cookie").then(response => {
                    axios
                        .post("api/register", {
                            email: this.email,
                            password: this.password
                        })
                        .then(response => {
                            this.error = null;
                            console.log(response.data);
                            if (response.data.success) {
                                alert('Successfully Registered');
                            } else {
                                this.email = "";
                                this.password = "";
                                this.flag.email = false;
                                this.flag.password = false;
                                this.error = response.data.message;
                            }
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                });
            }else{
                 this.flag.password = true;
                 this.error = "Please fill out the highlighted field/s"
            }
        },
        clearError(){
            this.error = null;
           this.flag.email = false;
            this.flag.password = false;
        },
    },
    beforeRouteEnter(to, from, next) {
        if (window.Laravel.isLoggedin) {
            return next("dashboard");
        }
        next();
    },
};
</script>
<style scoped>
.todoListContainer {
    width: 300px;
    margin: 200px auto;
    background: #f0efe9;
}
.h2 {
    font-family: arial;
    font-size: 30px;
}

.mainContainer {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    height: 300px;
    margin: auto;
    box-shadow: 5px 5px 3px rgb(156,156,156,15%);
    border-radius: 25px;
    align-items: center;
}
.heading {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    background-color: #E66B6B;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    width: 100%;
}

#title {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    color: #fff;
}
.error {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    color: #f44336;
}
.errorBox{
    display: flex;
    padding: 20px;
}
.yearText {
    font-weight: normal;
    font-size: 20px;
}
.monthText {
    font-size: 20px;
}
.add {
    margin-top: -40px;
}
.dateContainer {
    display: flex;
    align-items: center;
}
.t-top {
    vertical-align: bottom;
}
.t-bottom {
    align-self: flex-start;
    vertical-align: top;
}
input {
    border-style: solid;
    border-width: thin;
    background: #f7f7f7;
    border-color: #eeee;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
}
.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    height: 130px;
}
.button {
    background: #50e3a4;
    color: #ffff;
    margin-top: 20px;
    border-radius: 50%;
    padding: 15px;
    cursor: pointer;
}
.button:hover {
    background: #3ba577;
}
.flag{
    border-color: #f44336;
}
.btnReg{
    border: none;
    cursor: pointer;
    text-decoration: none;
}
</style>
