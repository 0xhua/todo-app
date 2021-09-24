<template>
    <div class="listView">
        <div class="subListView">
            <div class="page">
                <div class="listheader">
                    <div class="filler"></div>
                    <span class="listText">Date</span>
                    <span class="listText">Title</span>
                    <span class="listText">Description</span>
                    <div class="filler"></div>
                </div>
                <div class="card-body">
                    <div v-for="item in pageOfItems"  :key="item.id">
                        <list-item
                            :item="item"
                            class="item"
                            v-on:itemchanged="$emit('reloadlist')"
                        />
                    </div>
                </div>
            </div>
            <div class="pagination">
                <div class="logout" @click="logout" ><button class="btnLogOut">Logout</button></div>
                <jw-pagination
                    :pageSize="7"
                    :items="items"
                    @changePage="onChangePage"
                    :labels="customLabels"
                ></jw-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import listItem from "./listItem.vue";
const customLabels = {
    first: '',
    last: '',
    previous: '<',
    next: '>'
};
export default {
    props: ["items"],
    data(){
        return {
             pageOfItems: [],
             customLabels
        }
    },
    components: {
        listItem,

    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
                logout(e) {
            console.log("ss");
            e.preventDefault();
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios
                    .post("/api/logout")
                    .then(response => {
                        if (response.data.success) {
                            alert('CREATED BY JOSHUA LICTAN')
                            window.location.href = "/";
                        } else {
                            console.log(response);
                        }
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            });
        }
    }
};
</script>

<style scoped>
.item {
    /* background: #e6e6e6; */
    padding: 5px;
    margin-top: 5px;
}
.listheader {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 20px;
}
.listText {
    margin-left: 20px;
    width: 100%;
    color: #3B3B3B;
}
.filler {
    padding: 17px;
}
.pagination {
    font-family:Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: flex-end;
    margin-top: 90px;
    align-items: center;
    justify-content: space-between;
}
.listView {
    display: flex;
    flex-direction: column;
}
.subListView{
    display: flex;
    flex-direction: column;
    padding: 20px;
}
.page{
    height: 230px;
}
.logout{
    margin-left: 20px;
}
.btnLogOut{
    border: none;
    background-color: #fff;
    cursor: pointer;
}
.btnLogOut:hover{
    font-weight: bold;
}
</style>
