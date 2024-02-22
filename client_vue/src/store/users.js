import { defineStore } from 'pinia'
import axios from 'axios'
import UserService from "../services/users.service.js"
// import UserService from '../services/user.service'

export const useUsersStore = defineStore("users", {
	state: () => ({
		users: [],
		header: [
			{
				name: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
			},
			{
				title: 'Department',
				dataIndex: 'department',
				key: 'department',
			},
			{
				title: '',
				dataIndex: 'action',
				key: 'action',
			},
		]
	}),
	getters: {

	},
	actions: {
		/**
		 * Get all users
		 */
		async getAllUsers() {
			try {
				const response = await UserService.getAllUsers();
				this.users = response.data;
			} catch (error) {
				console.error(error);
			}
		},

		async deleteUser(payload) {
			let deleteName = payload._value;
			try {
				const response = await UserService.deleteUserByName(deleteName);
				return response;
			} catch (error) {
				console.log(error);
			}

		}

	}
})
