<template>
    <div class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <div class="post__footer">
            <div class="post__buttons">
                <button class="approve" @click="changeVisability">{{ isShowEditor ? 'Hide' : 'Open editor' }}</button>
                <button class="danger" @click="deletePost">Delete</button>
            </div>
            <div class="post__editor" :class="{ 'post__editor_active': isShowEditor }">
                <div class="editor__title">
                    <label>Title:</label>
                    <input v-model="title" :key="post.id">
                </div>
                <button class="active" @click="editPost">Save</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePostsStore } from '@/stores/management'

const props = defineProps(['post'])
const isShowEditor = ref(false)
const title = ref('')
const store = usePostsStore()

/**
 * Asynchronous function to delete a post and then fetch all posts.
 *
 * @return {void}
 */
const deletePost = async() => {
    await store.deletePost(props.post.id,)
}

/**
 * Edit a post and then fetch all posts.
 *
 * @return {void}
 */
const editPost = async() => {
    await store.editPost({
        id: props.post.id,
        title: title.value
    })
}

/**
 * Toggles the visibility of the post editor block.
 *
 * @return {void}
 */
const changeVisability = () => {
    isShowEditor.value = !isShowEditor.value
}
</script>

<style scoped>
.post {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
}
.post__buttons {
    display: flex;
    justify-content: space-between;
}

.post__footer {
    display: flex;
    flex-direction: column;
}

.post__editor {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 0;
    opacity: 0;
    margin-top: 0;
    transition: all 0.3s ease-in-out;
}

.post__editor_active {
    margin-top: 20px;
    height: auto;
    opacity: 1;
}

.editor__title {
    display: flex;
    align-items: baseline;
    gap: 10px;
}
</style>