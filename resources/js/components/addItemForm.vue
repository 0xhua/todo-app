<template>
    <div class="addItem">
        <div class="title">
            <h2>Add Task</h2>
        </div>
        <div class="boxInput">
            <div class="calendar">
                <v-date-picker
                    title-position="left"
                    :min-date="new Date()"
                    mode="date"
                    @dayclick="newDate"
                    value
                    is-required
                    v-on:addItem="this.$forceUpdate()"
                    clearable
                    :class="[flag.date ? 'flag' : '']"
                />
            </div>
            <div class="textInput">
                <input
                    id="title"
                    type="text"
                    v-model="item.title"
                    is-required
                    placeholder="Title"
                    maxlength="100"
                    :class="[flag.input ? 'flag' : '']"
                />
                <textarea
                    type="text"
                    v-model="item.desc"
                    id="desc"
                    is-required
                    placeholder="Description"
                    maxlength="100"
                    :class="[flag.textarea ? 'flag' : '']"
                />
            </div>
        </div>
        <div class="footer">
            <div class="errorMessage">
                <span>{{ this.flag.message }}</span>
            </div>
            <div class="buttons">
                <button
                    @click="show()"
                    class="button"
                    :class="[
                        item.title && item.desc && item.date !== null
                            ? 'next'
                            : '',
                        'inactive'
                    ]"
                >
                    NEXT
                </button>
                <button
                    @click="clear()"
                    class="button"
                    :class="[item.title || item.desc ? 'clear' : '', 'inactive']"
                >
                    CLEAR
                </button>
                <v-dialog class="title" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            item: {
                title: "",
                desc: "",
                date: null
            },
            flag: {
                input: "",
                textarea: "",
                date: "",
                message: ""
            }
        };
    },
    methods: {
        addItem() {
            axios
                .post("api/item/store", {
                    item: this.item
                })
                .then(response => {
                    if (response.status == 201) {
                        this.item.title = "";
                        this.item.desc = "";
                        this.item.date = null;
                        this.$emit("closemodal");
                        this.$emit("reloadlistmodal");
                        alert("Todo added successfully");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        newDate(event) {
            this.item.date = event.id;
        },
        clear() {
            this.item.title = "";
            this.item.desc = "";
        },
        show() {
            if (
                this.item.title == "" ||
                this.item.desc == "" ||
                this.item.date === null
            ) {
                if (this.item.title == "") {
                    this.flag.input = true;
                } else {
                    this.flag.input = false;
                }
                if (this.item.desc == "") {
                    this.flag.textarea = true;
                } else {
                    this.flag.textarea = false;
                }
                if (this.item.date === null) {
                    this.flag.date = true;
                } else {
                    this.flag.date = false;
                }
                this.flag.message = "Please fill out the highlighted field/s";
                return;
            } else {
                this.flag.input = false;
                this.flag.textarea = false;
                this.flag.date = false;
                this.flag.message = "";
            }

            this.$modal.show("dialog", {
                title: "Add Task Confirmation",
                text:
                    "<h2>Date:</h2><span >" +
                    this.item.date +
                    "</span>" +
                    "<br>" +
                    "<h2>Title:</h2><span >" +
                    this.item.title +
                    "</span>" +
                    "<br>" +
                    "<h2>Description:</h2><span >" +
                    this.item.desc +
                    "</span>",
                buttons: [
                    {
                        title: "Back",
                        handler: () => {
                            this.$modal.hide("dialog");
                        }
                    },
                    {
                        title: "Create",
                        handler: () => {
                            this.addItem();
                        }
                    }
                ]
            });
        }
    }
};
</script>
<style scoped>
.addItem {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
}
.textInput {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 250px;
}
.calendar {
    display: flex;
    flex-direction: column;
    padding: 5px;
    align-items: center;
}
.buttons {
    margin: 10px 30px 20px 20px;
    display: flex;
    flex-direction: row-reverse;
    height: auto;
}
.boxInput {
    display: flex;
    flex-direction: row;
}
.title {
    margin: auto;
    font-family: Arial, Helvetica, sans-serif;
}
#desc {
    height: 80%;
}

input {
    border-style: solid;
    border-width: thin;
    background: #f7f7f7;
    border-color: #eeee;
    outline: none;
    padding: 10px;
    border-radius: 10px;
}
textarea {
    font-family: Arial, Helvetica, sans-serif;
    background: #f7f7f7;
    margin-top: 15px;
    border-radius: 10px;
    border-color: #eeee;
    resize: none;
    padding: 7px 0 0 0;
    text-indent: 7px;
}
span {
    margin-left: 10px;
    font: 15px Arial;
}

button {
    margin-left: 5px;
}

.plus {
    font-size: 20px;
}

.active {
    color: #00ce25;
}

.inactive {
    background-color: #999999;
}
.button {
    border: none;
    border-radius: 10px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
.next {
    background-color: #008cba;
}
.clear {
    background-color: #f44336;
}
.flag {
    border-color: #f44336;
}
.test {
    border-color: #f44336;
}
.footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.errorMessage {
    font-family: Arial, Helvetica, sans-serif;
    margin-left: 10px;
    color: #f44336;
}
</style>
