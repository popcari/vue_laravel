import { defineStore } from 'pinia';
import UserService from '../services/users.service.js';

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
				width: 100,

			},
			{
				title: 'Department',
				dataIndex: 'department',
				key: 'department',
				width: 150,

			},
			{
				title: '',
				dataIndex: 'action',
				key: 'action',
				fixed: 'right',
				width: 100,
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
