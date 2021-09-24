<template>
    <div class="todoListContainer">
        <div class="mainContainer">
            <div class="heading">
                <h2 id="title">Todo List</h2>
                <div class="dateContainer">
                    <div>
                        <h2 class="dateText">{{ date.getDate() }}</h2>
                    </div>
                    <div>
                        <div class="t-bottom">
                            <h2 class="dateText monthText">
                                {{
                                    date.toLocaleString("en-us", {
                                        month: "short"
                                    })
                                }}
                            </h2>
                        </div>
                        <div class="t-top">
                            <h2 class="dateText yearText">
                                {{ date.getFullYear() }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <list-view :items="items" v-on:reloadlist="getList()" />
        </div>
        <div class="add">
            <modal-add v-on:reloadlist="getList()" class="add" />
        </div>
    </div>
</template>

<script>
import addItemForm from "../components/addItemForm.vue";
import listView from "../components/listView.vue";
import modalAdd from "../components/modalAdd.vue";
export default {
    components: {
        addItemForm,
        listView,
        modalAdd
    },
    data: function() {
        return {
            isLoggedIn: false,
            items: [],
            date: new Date()
        };
    },
    methods: {
        getList() {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios
                    .get("api/items")
                    .then(response => {
                        this.items = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    },
    created() {
        if (window.Laravel.isLoggedin) {
            this.getList();
            this.isLoggedIn = true;
        }
    },
    beforeRouteEnter(to, from, next) {
        if (!window.Laravel.isLoggedin) {
            window.location.href = "/";
        }
        next();
    }
};
</script>

<style scoped>
.todoListContainer {
    width: 500px;
    margin: 200px auto;
    background: #f0efe9;
}
.h2 {
    font-family: arial;
    font-size: 30px;
}

.mainContainer {
    background: #ffffff;
    height: 500px;
    width: 100%;
    margin: auto;
    box-shadow: 5px 5px 3px rgb(156,156,156,15%);
    border-radius: 25px;
}
.heading {
    margin-top: 10px;
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
    height: 70px;
    justify-content: space-between;
    align-items: center;
    background-color: #E66B6B;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
}

#title {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    margin-right: 10px;
    color: #fff;
}
.dateText {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 80px;
    color: #fff;
}
.yearText {
    font-weight: normal;
    font-size: 20px;
    color: #fff;
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
</style>
