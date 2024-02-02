<template>
    <header>
        <h2>Post Management</h2>
    </header>

    <main>
        <template v-if="posts.length > 0">
            <ThePost 
                v-for="post in posts" 
                :key="post.id" 
                :post="post"/>
        </template>
        <div class="post__create-block">
            <button @click="showPostCreater">{{ !isShowPostCreater ? 'I wanna create new post' : 'I changed my mind' }}</button>
            <div v-show="isShowPostCreater" class="post__creater">
                <label>Title:</label>
                <input v-model="title">
                <button class="approve" @click="createPost">Create post</button>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ThePost from './components/ThePost.vue';
import { usePostsStore } from '@/stores/management'

const store = usePostsStore()
const isShowPostCreater = ref(false)
const title = ref('')
const posts = computed(() => store.getPosts)

/**
 * Function to toggle the visibility of the post creator.
 *
 * @return {void}
 */
const showPostCreater = () => {
    isShowPostCreater.value = !isShowPostCreater.value
}

/**
 * Creates a post using the title value and hides the post creator.
 *
 * @return {void}
 */
const createPost = async () => {
    await store.createPost({ title: title.value })
    isShowPostCreater.value = false
}

onMounted(async () => {
    await store.getAllPosts()
})

</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    line-height: 1.5;
}

main {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.post__create-block {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 5px;
    padding: 1rem;

    .post__creater {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>
