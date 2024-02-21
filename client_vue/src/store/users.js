import { defineStore } from 'pinia'
import axios from 'axios'
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
		]
	}),
	getters: {

	},
	actions: {
		async getAllUsers() {
			try {
				const response = await axios.get('http://localhost:8000/api/users');
				console.log(response);
				this.users = response.data;
			} catch (error) {
				console.error(error);
			}
		}
	}
})
