<template>
    <div class="item">
        <input
            type="checkbox"
            @change="updateCheck()"
            v-model="item.completed"
            class="checkbox-round"
        />
        <span
            class="textstyle"
            :class="[item.completed ? 'completed' : '', 'itemText']"
            >{{ item.date }}</span
        >
        <span
            class="textstyle"
            :class="[item.completed ? 'completed' : '', 'itemText']"
            >{{ item.title }}</span
        >
        <span :class="[item.completed ? 'completed' : '', 'itemText']">{{
            item.desc
        }}</span>
        <button @click="removeItem()" class="trashcan">
            <font-awesome-icon icon="trash-alt" />
        </button>
    </div>
</template>

<script>
export default {
    props: ["item"],
    methods: {
        updateCheck() {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios
                    .put("api/item/" + this.item.id, {
                        item: this.item
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$emit("itemchanged");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        },
        removeItem() {
            axios.get("/sanctum/csrf-cookie").then(response => {
                axios
                    .delete("api/item/" + this.item.id)
                    .then(response => {
                        if (response.status == 200) {
                            this.$emit("itemchanged");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    }
};
</script>

<style scoped>
.completed {
    color: #999999;
}

.itemText {
    width: 100%;
    margin-left: 20px;
}

.item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.trashcan {
    background: white;
    border: none;
    color: #ff0000;
    outline: none;
}
span {
    font: 15px Arial;
    color: #3b3b3b;
}
.textstyle {
    font-weight: bold;
}
.checkbox-round {
    width: 4.5em;
    height: 1.3em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid rgb(112, 112, 112, 50%);
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.checkbox-round:checked {
    background-color: #4ee3a3;
}
</style>
