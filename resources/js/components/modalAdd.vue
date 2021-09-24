<template>
    <div class="modal">
        <div class="container">
            <font-awesome-icon
                icon="plus-circle"
                @click.prevent="show"
                size="5x"

                class="button"
            />
        </div>
        <modal name="modal-add" :height="450" :width="550" :adaptive="true">
            <add-item-form
                v-on:reloadlistmodal="$emit('reloadlist')"
                v-on:closemodal="hide()"
            />
        </modal>
        <!-- <v-dialog /> -->
    </div>
</template>

<script>
import addItemForm from "./addItemForm.vue";
export default {
    components: {
        addItemForm
    },
    name: "MyComponent",
    methods: {
        show() {
            this.$modal.show("modal-add");
        },
        hide() {
            this.$modal.hide("modal-add");
        }
    },
    mount() {
        this.show();
    }
};
</script>

<style scoped>
.container {
    top: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.button{
    background-color: #ffff;
    border-radius: 50%;
     color: #50E3A4;
     cursor: pointer
}
.button:hover{
    background: #3ba577;
}
</style>
