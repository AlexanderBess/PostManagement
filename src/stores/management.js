import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
	state: () => ({
		posts: []
	}),
	getters: {
		getPosts: (state) => state.posts
	},
	actions: {

		/**
		 * Retrieves all posts from the API.
		 *
		 * @return {void}
		 */
		async getAllPosts() {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
			this.posts = await response.json();
		},

		/**
		 * Creates a new post using the provided data.
		 *
		 * @param {Object} data - the data for the new post
		 * @return {void} 
		 */
		async createPost(data) {
			await fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: JSON.stringify({
					...data,
					userId: 1,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then(() => this.getAllPosts());
		},

		/**
		 * Edit a post using the provided data.
		 *
		 * @param {Object} data - the data for editing the post
		 * @return {void}
		 */
		async editPost(data) {
			await fetch(`https://jsonplaceholder.typicode.com/posts/${ data.id }`, {
				method: 'PATCH',
				body: JSON.stringify({
					title: data.title
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then(() => this.getAllPosts());
		},

		/**
		 * Delete a post.
		 *
		 * @param {type} id - The ID of the post to be deleted
		 * @return {void} 
		 */
		async deletePost(id) {
			await fetch(`https://jsonplaceholder.typicode.com/posts/${ id }`, { method: 'DELETE', }).then(() => this.getAllPosts());
		}
	},
})